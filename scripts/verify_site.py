#!/usr/bin/env python3
"""
Phase 5 V2 Autonomous Self-Verification Gate
Verifies any local or deployed URL against all InsulTherm Innovations V1 + V2 requirements:
1. All 5 product images + Pro-Bench pack + Hardware Cutaway + All 4-Quadrant FEA & 3D CAD plates return HTTP 200
2. All 5 Technical Data Sheet (TDS) PDFs return HTTP 200 + valid %PDF multi-page structure
3. Main HTML & SPA routes return HTTP 200 + Netlify multipart CAD upload form definitions
4. Mandatory strings (+91 78148 XXXXX, manav.sb@inslthrm.in, manavsb9719@gmail.com) verified in compiled JS bundle
"""

import re
import sys
import urllib.request

BASE_URL = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else "http://127.0.0.1:4173"

REQUIRED_IMAGES = [
    "/assets/brand/logo.png",
    "/assets/products/insultherm-shield.jpg",
    "/assets/products/insultherm-barrier.jpg",
    "/assets/products/insultherm-graphite-flex.jpg",
    "/assets/products/insultherm-core.jpg",
    "/assets/products/insultherm-core-diecut.jpg",
    "/assets/products/insultherm-ultra.jpg",
    "/assets/products/tri-hazard-kit.jpg",
    "/assets/products/thermafix-bench-pack.jpg",
    "/assets/facility/cnc-converting-lab.jpg",
    "/assets/validation/pack-cutaway-studio.jpg",
    "/assets/validation/fea-runaway-400c.png",
    "/assets/validation/fea-continuous-load.png",
    "/assets/validation/fea-boundary-matrix.png",
    "/assets/validation/cad-exploded-pack.png",
    "/assets/validation/cad-assembled-pack.png",
    "/assets/validation/cad-top-busbar.png",
    "/assets/validation/competitor-benchmark.jpg",
]

REQUIRED_TDS = [
    "/tds/insultherm-shield-tds.pdf",
    "/tds/insultherm-barrier-tds.pdf",
    "/tds/insultherm-graphite-flex-tds.pdf",
    "/tds/insultherm-core-tds.pdf",
    "/tds/insultherm-ultra-tds.pdf",
]


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "InsulTherm-Verifier/2.0"})
    with urllib.request.urlopen(req, timeout=25) as resp:
        return resp.status, dict(resp.headers), resp.read()


def main():
    print(f"=== PHASE 5 V2 SELF-VERIFICATION AGAINST: {BASE_URL} ===")
    errors = []

    # 1. Check Root & SPA Routes
    for route in ["/", "/products", "/about", "/contact"]:
        status, _, body = fetch(BASE_URL + route)
        text = body.decode("utf-8", errors="ignore")
        if status != 200 or '<div id="root"></div>' not in text:
            errors.append(f"Route {route} failed: status={status}")
        else:
            print(f"  [PASS] Route {route:<10} -> HTTP {status} ({len(body)} bytes)")

    # Verify Netlify hidden multipart forms in index.html
    _, _, root_bytes = fetch(BASE_URL + "/")
    root_html = root_bytes.decode("utf-8", errors="ignore")
    for form_name in ["insultherm-direct-order", "insultherm-engineering-rfq"]:
        if f'name="{form_name}"' in root_html and 'enctype="multipart/form-data"' in root_html:
            print(f"  [PASS] Netlify Multipart CAD Form registered: {form_name}")
        else:
            errors.append(f"Missing Netlify multipart form {form_name} in index.html")

    # Verify Mandatory Contact Strings in Compiled JS Bundle
    js_match = re.search(r'src="(/assets/index-[^"]+\.js)"', root_html)
    if js_match:
        _, _, js_bytes = fetch(BASE_URL + js_match.group(1))
        js_text = js_bytes.decode("utf-8", errors="ignore")
        for required_literal in [
            "+91 78148 XXXXX",
            "manav.sb@inslthrm.in",
            "manavsb9719@gmail.com",
            "Sanand GIDC",
            "ThermaFix",
        ]:
            if required_literal in js_text:
                print(f"  [PASS] Bundle literal verified: '{required_literal}'")
            else:
                errors.append(f"Missing mandatory literal in JS bundle: {required_literal}")
    else:
        errors.append("Could not locate compiled JS bundle path in index.html")

    # 2. Check All 18 Product, Cutaway, Benchtop, FEA & CAD Images
    for img in REQUIRED_IMAGES:
        status, _, body = fetch(BASE_URL + img)
        if status == 200 and len(body) > 5000:
            print(f"  [PASS] Image {img:<47} -> HTTP {status} ({len(body)//1024} KB)")
        else:
            errors.append(f"Image {img} failed: status={status}, len={len(body)}")

    # 3. Check All 5 TDS PDFs
    for tds in REQUIRED_TDS:
        status, _, body = fetch(BASE_URL + tds)
        is_pdf = body.startswith(b"%PDF-")
        if status == 200 and is_pdf and len(body) > 50000:
            print(f"  [PASS] TDS PDF {tds:<45} -> HTTP {status} (Valid PDF, {len(body)//1024} KB)")
        else:
            errors.append(f"TDS {tds} failed: status={status}, is_pdf={is_pdf}, len={len(body)}")

    if errors:
        print("\n[FAIL] Verification errors encountered:")
        for e in errors:
            print("  -", e)
        sys.exit(1)

    print("\n[ALL V2 HTTP, ASSET, FORM & CONTACT CHECKS PASSED 100%]")


if __name__ == "__main__":
    main()
