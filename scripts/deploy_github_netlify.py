#!/usr/bin/env python3
"""
Credit-Safe GitHub & Netlify Deployment Orchestrator (V4 — Official File-Digest Draft Mode)
- Default Mode (0 Netlify Deploy Credits — matches `netlify deploy` draft workflow in 12345.pdf):
  1. Keeps the published production deploy LOCKED so zero 15-credit production deploys occur accidentally.
  2. Creates a Draft Deploy (`"draft": True`) via Netlify's File-Digest API, uploading ONLY changed SHA1 files.
  3. Returns the live, shareable Draft Preview URL (`https://<deploy_id>--insultherminnovations.netlify.app`) at 0 deploy credits!
- Pass `--production` ONLY when explicitly ready to spend 15 Netlify credits to update the main production URL.
"""

import hashlib
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST_DIR = os.path.join(BASE_DIR, "dist")

SUBDOMAIN_CANDIDATES = [
    "insultherminnovations",
    "insultherminv",
    "insultherm-inv",
    "insultherminn",
    "insultherminno",
]


def api_request(url, method="GET", headers=None, data=None):
    req = urllib.request.Request(url, data=data, headers=headers or {}, method=method)
    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            raw = resp.read()
            return resp.status, json.loads(raw.decode("utf-8")) if raw else {}
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="ignore")
        return e.code, {"error": err_body}


def deploy_github(gh_token, repo_name="insultherm-innovations-web"):
    headers = {
        "Authorization": f"Bearer {gh_token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
        "User-Agent": "InsulTherm-Deploy-Agent",
    }
    status, user_info = api_request("https://api.github.com/user", headers=headers)
    if status != 200:
        raise RuntimeError(f"GitHub authentication failed ({status}): {user_info}")
    owner = user_info["login"]

    r_status, repo_info = api_request(f"https://api.github.com/repos/{owner}/{repo_name}", headers=headers)
    if r_status == 404:
        payload = json.dumps({
            "name": repo_name,
            "description": "InsulTherm Innovations — Advanced Thermal, Fire-Barrier & Dielectric Materials Portal",
            "private": False,
            "auto_init": False,
        }).encode("utf-8")
        c_status, repo_info = api_request("https://api.github.com/user/repos", method="POST", headers=headers, data=payload)
        if c_status not in (200, 201):
            raise RuntimeError(f"Failed to create GitHub repo ({c_status}): {repo_info}")

    html_url = repo_info["html_url"]
    clean_remote = f"https://github.com/{owner}/{repo_name}.git"
    auth_remote = f"https://x-access-token:{urllib.parse.quote(gh_token, safe='')}@github.com/{owner}/{repo_name}.git"

    try:
        subprocess.run(["git", "push", "--force", auth_remote, "HEAD:refs/heads/preview"], cwd=BASE_DIR, check=True, capture_output=True, text=True)
        subprocess.run(["git", "push", "--force", auth_remote, "HEAD:refs/heads/main"], cwd=BASE_DIR, check=True, capture_output=True, text=True)
    finally:
        subprocess.run(["git", "remote", "remove", "origin"], cwd=BASE_DIR, capture_output=True)
        subprocess.run(["git", "remote", "add", "origin", clean_remote], cwd=BASE_DIR, capture_output=True)

    return html_url


def deploy_netlify(nf_token, production=False):
    auth_headers = {
        "Authorization": f"Bearer {nf_token}",
        "User-Agent": "InsulTherm-Deploy-Agent",
    }

    s_status, existing_sites = api_request("https://api.netlify.com/api/v1/sites?per_page=100", headers=auth_headers)
    if s_status != 200:
        raise RuntimeError(f"Netlify authentication failed ({s_status}): {existing_sites}")

    site_obj = None
    for cand in SUBDOMAIN_CANDIDATES:
        for existing in (existing_sites if isinstance(existing_sites, list) else []):
            if existing.get("name") == cand:
                site_obj = existing
                print(f"Found existing owned Netlify site: {cand}")
                break
        if site_obj:
            break

    if not site_obj:
        raise RuntimeError("Owned Netlify site not found.")

    site_id = site_obj["id"]
    published_deploy_id = (site_obj.get("published_deploy") or {}).get("id")

    # Ensure public visitor access (no SSO password wall)
    json_headers = {**auth_headers, "Content-Type": "application/json"}
    api_request(
        f"https://api.netlify.com/api/v1/sites/{site_id}",
        method="PATCH",
        headers=json_headers,
        data=json.dumps({"sso_login": False}).encode("utf-8"),
    )

    # Lock published production deploy when running in 0-credit draft preview mode
    if not production and published_deploy_id:
        l_status, _ = api_request(
            f"https://api.netlify.com/api/v1/deploys/{published_deploy_id}/lock",
            method="POST",
            headers=auth_headers,
        )
        print(f"Locked published production deploy ({published_deploy_id}) -> HTTP {l_status} (0-Credit Safe Mode)")
    elif production and published_deploy_id:
        api_request(f"https://api.netlify.com/api/v1/deploys/{published_deploy_id}/unlock", method="POST", headers=auth_headers)

    # Compute SHA1 file-digest map of dist/ (exactly how `netlify deploy` CLI works!)
    file_hashes = {}
    sha_to_paths = {}
    for root, _, files in os.walk(DIST_DIR):
        for fname in files:
            full_p = os.path.join(root, fname)
            rel_p = "/" + os.path.relpath(full_p, DIST_DIR).replace(os.sep, "/")
            with open(full_p, "rb") as f:
                sha1 = hashlib.sha1(f.read()).hexdigest()
            file_hashes[rel_p] = sha1
            sha_to_paths.setdefault(sha1, []).append((rel_p, full_p))

    manifest_payload = {
        "files": file_hashes,
        "draft": (not production),
        "title": "v4-production" if production else "v4-zero-credit-draft-preview",
    }
    if not production:
        manifest_payload["branch"] = "preview"

    d_status, deploy_res = api_request(
        f"https://api.netlify.com/api/v1/sites/{site_id}/deploys",
        method="POST",
        headers=json_headers,
        data=json.dumps(manifest_payload).encode("utf-8"),
    )
    if d_status not in (200, 201):
        raise RuntimeError(f"Netlify manifest deploy creation failed ({d_status}): {deploy_res}")

    deploy_id = deploy_res["id"]
    required_shas = set(deploy_res.get("required") or [])
    print(f"Deploy {deploy_id} created (draft={deploy_res.get('draft')}). Uploading {len(required_shas)} changed files (skipping {len(file_hashes) - len(required_shas)} cached files)...")

    octet_headers = {**auth_headers, "Content-Type": "application/octet-stream"}
    for sha1 in required_shas:
        for rel_p, full_p in sha_to_paths.get(sha1, [])[:1]:
            encoded_path = "/".join(urllib.parse.quote(seg, safe="") for seg in rel_p.lstrip("/").split("/"))
            with open(full_p, "rb") as f:
                file_bytes = f.read()
            u_status, u_res = api_request(
                f"https://api.netlify.com/api/v1/deploys/{deploy_id}/files/{encoded_path}",
                method="PUT",
                headers=octet_headers,
                data=file_bytes,
            )
            if u_status not in (200, 201):
                raise RuntimeError(f"Failed uploading {rel_p} ({u_status}): {u_res}")

    # Poll until state == 'ready'
    final_deploy = deploy_res
    for _ in range(20):
        p_status, p_res = api_request(f"https://api.netlify.com/api/v1/deploys/{deploy_id}", headers=auth_headers)
        if p_status == 200:
            final_deploy = p_res
            if p_res.get("state") == "ready":
                break
        time.sleep(1.5)

    links = final_deploy.get("links") or {}
    return {
        "mode": "PRODUCTION (15 credits)" if production else "DRAFT PREVIEW (0 deploy credits)",
        "deploy_id": deploy_id,
        "state": final_deploy.get("state"),
        "draft": final_deploy.get("draft"),
        "context": final_deploy.get("context"),
        "permalink_url": links.get("permalink") or f"https://{deploy_id}--{site_obj['name']}.netlify.app",
        "alias_url": links.get("alias") or final_deploy.get("deploy_ssl_url"),
        "locked_prod_url": site_obj.get("ssl_url") or f"https://{site_obj['name']}.netlify.app",
    }


if __name__ == "__main__":
    is_prod = "--production" in sys.argv
    gh = os.environ.get("GITHUB_TOKEN", "").strip()
    nf = os.environ.get("NETLIFY_TOKEN", "").strip()
    if gh:
        repo_url = deploy_github(gh)
        print("GITHUB_REPO_URL:", repo_url)
    if nf:
        info = deploy_netlify(nf, production=is_prod)
        print("NETLIFY_DEPLOY_RESULT:", json.dumps(info, indent=2))
