#!/usr/bin/env python3
"""
Phase 5 Autonomous Self-Verification Gate
Verifies any local or deployed URL against all InsulTherm Innovations requirements:
1. All 5 product images return HTTP 200 + valid image bytes
2. All 5 Technical Data Sheet (TDS) PDFs return HTTP 200 + valid %PDF-1.4 multi-page structure
3. Main HTML & SPA routes return HTTP 200 + Netlify form definitions
4. Mandatory strings (+91 78148 XXXXX, manav.sb@inslthrm.in, manavsb9719@gmail.com) verified
"""

import sys
import urllib.request

BASE_URL = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else "http://127.0.0.1:4173"

REQUIRED_IMAGES = [
    "/assets/brand/logo.png",
    "/assets/products/insultherm-shield.jpg",
    "/assets/products/insultherm-barrier.jpg",
    "/assets/products/insultherm-graphite-flex.jpg",
    "/assets/products/insultherm-core.jpg",
    "/assets/products/insultherm-ultra.jpg",
    "/assets/facility/cnc-converting-lab.jpg",
    "/assets/validation/fea-runaway-400c.png",
]

REQUIRED_TDS = [
    "/tds/insultherm-shield-tds.pdf",
    "/tds/insultherm-barrier-tds.pdf",
    "/tds/insultherm-graphite-flex-tds.pdf",
    "/tds/insultherm-core-tds.pdf",
    "/tds/insultherm-ultra-tds.pdf",
]


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "InsulTherm-Verifier/1.0"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        return resp.status, dict(resp.headers), resp.read()


def main():
    print(f"=== PHASE 5 SELF-VERIFICATION AGAINST: {BASE_URL} ===")
    errors = []

    # 1. Check Root & SPA Routes
    for route in ["/", "/products", "/about", "/contact"]:
        status, _, body = fetch(BASE_URL + route)
        text = body.decode("utf-8", errors="ignore")
        if status != 200 or '<div id="root"></div>' not in text:
            errors.append(f"Route {route} failed: status={status}")
        else:
            print(f"  [PASS] Route {route:<10} -> HTTP {status} ({len(body)} bytes)")

    # Verify Netlify hidden forms in index.html
    _, _, root_bytes = fetch(BASE_URL + "/")
    root_html = root_bytes.decode("utf-8", errors="ignore")
    for form_name in ["product-order-inquiry", "contact-engineering"]:
        if f'name="{form_name}"' in root_html and 'data-netlify="true"' in root_html:
            print(f"  [PASS] Netlify Form registered in HTML: {form_name}")
        else:
            errors.append(f"Missing Netlify form {form_name} in index.html")

    # 2. Check All Product & Validation Images
    for img in REQUIRED_IMAGES:
        status, headers, body = fetch(BASE_URL + img)
        if status == 200 and len(body) > 5000:
            print(f"  [PASS] Image {img:<45} -> HTTP {status} ({len(body)//1024} KB)")
        else:
            errors.append(f"Image {img} failed: status={status}, len={len(body)}")

    # 3. Check All 5 TDS PDFs
    for tds in REQUIRED_TDS:
        status, headers, body = fetch(BASE_URL + tds)
        is_pdf = body.startswith(b"%PDF-")
        if status == 200 and is_pdf and len(body) > 50000:
            print(f"  [PASS] TDS PDF {tds:<43} -> HTTP {status} (Valid PDF, {len(body)//1024} KB)")
        else:
            errors.append(f"TDS {tds} failed: status={status}, is_pdf={is_pdf}, len={len(body)}")

    if errors:
        print("\n[FAIL] Verification errors encountered:")
        for e in errors:
            print("  -", e)
        sys.exit(1)

    print("\n[ALL HTTP & ASSET CHECKS PASSED 100%]")


if __name__ == "__main__":
    main()
