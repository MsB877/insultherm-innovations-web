#!/usr/bin/env python3
"""
Autonomous GitHub Repository & Netlify Subdomain Deployment Orchestrator
Enforces Phase 4 Subdomain Naming Protocol:
  Primary:  insultherminnovations.netlify.app
  Fallbacks: insultherminv -> insultherm-inv -> insultherminn -> insultherminno
"""

import hashlib
import json
import os
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
import zipfile

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
        with urllib.request.urlopen(req, timeout=60) as resp:
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

    # Check if repo already exists
    r_status, repo_info = api_request(f"https://api.github.com/repos/{owner}/{repo_name}", headers=headers)
    if r_status == 404:
        payload = json.dumps({
            "name": repo_name,
            "description": "InsulTherm Innovations — Enterprise B2B Advanced Interface Materials & Digital Converting Portal",
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
        subprocess.run(["git", "push", "--force", auth_remote, "HEAD:refs/heads/main"], cwd=BASE_DIR, check=True, capture_output=True, text=True)
    finally:
        # Ensure only clean non-credential remote URL is stored
        subprocess.run(["git", "remote", "remove", "origin"], cwd=BASE_DIR, capture_output=True)
        subprocess.run(["git", "remote", "add", "origin", clean_remote], cwd=BASE_DIR, capture_output=True)

    return html_url


def deploy_netlify(nf_token):
    auth_headers = {
        "Authorization": f"Bearer {nf_token}",
        "User-Agent": "InsulTherm-Deploy-Agent",
    }

    # Check existing sites in user's Netlify account first
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

    # Create site trying exact priority subdomain list
    if not site_obj:
        json_headers = {**auth_headers, "Content-Type": "application/json"}
        for cand in SUBDOMAIN_CANDIDATES:
            payload = json.dumps({"name": cand}).encode("utf-8")
            c_status, res = api_request("https://api.netlify.com/api/v1/sites", method="POST", headers=json_headers, data=payload)
            if c_status in (200, 201):
                site_obj = res
                print(f"Created Netlify site with subdomain: {cand}")
                break
            else:
                print(f"Subdomain '{cand}' unavailable ({c_status}), trying next fallback...")

    if not site_obj:
        raise RuntimeError("All 5 priority Netlify subdomains were unavailable.")

    site_id = site_obj["id"]

    # Build ZIP of dist/ and deploy atomically
    zip_path = "/tmp/insultherm_netlify_deploy.zip"
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for root, _, files in os.walk(DIST_DIR):
            for fname in files:
                full_p = os.path.join(root, fname)
                rel_p = os.path.relpath(full_p, DIST_DIR)
                zf.write(full_p, rel_p)

    with open(zip_path, "rb") as f:
        zip_bytes = f.read()

    zip_headers = {
        **auth_headers,
        "Content-Type": "application/zip",
    }
    d_status, deploy_res = api_request(
        f"https://api.netlify.com/api/v1/sites/{site_id}/deploys",
        method="POST",
        headers=zip_headers,
        data=zip_bytes,
    )
    if d_status not in (200, 201):
        raise RuntimeError(f"Netlify ZIP deploy failed ({d_status}): {deploy_res}")

    ssl_url = site_obj.get("ssl_url") or f"https://{site_obj['name']}.netlify.app"
    return ssl_url, deploy_res.get("id")


if __name__ == "__main__":
    gh = os.environ.get("GITHUB_TOKEN", "").strip()
    nf = os.environ.get("NETLIFY_TOKEN", "").strip()
    if gh:
        repo_url = deploy_github(gh)
        print("GITHUB_REPO_URL:", repo_url)
    if nf:
        live_url, dep_id = deploy_netlify(nf)
        print("NETLIFY_LIVE_URL:", live_url, "DEPLOY_ID:", dep_id)
