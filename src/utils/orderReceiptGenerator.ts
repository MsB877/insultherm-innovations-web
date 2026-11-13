import { CartItem } from '../context/OrderCartContext';
import { INDIAN_GST_STATE_CODES } from './validation';

export interface ConfirmedOrderSnapshot {
  orderRef: string;
  timestampIst: string;
  buyerType: 'b2b' | 'individual';
  buyerName: string;
  companyName: string;
  buyerEmail: string;
  buyerMobileFormatted: string; // e.g., +91 98765 43210
  gstin: string; // 15-char verified or empty
  gstStateLabel: string;
  isIntraStateGujarat: boolean;
  cityAddress: string;
  pinCode: string;
  paymentMode: string;
  notes: string;
  cadFileName: string | null;
  cadFileSizeLabel: string | null;
  items: CartItem[];
  subtotalInr: number;
  appliedCouponCode: string | null;
  couponDiscountInr: number;
  netTaxableInr: number;
  gstInr: number;
  cgstInr: number;
  sgstInr: number;
  igstInr: number;
  grandTotalInr: number;
  amountInWords: string;
  orderDeskEmail: string;
}

/**
 * Converts positive integer INR amount into standard Indian numbering words
 * (Thousand, Lakh, Crore) for official Proforma / Order Confirmations.
 */
export function numberToIndianRupeesWords(amount: number): string {
  const n = Math.max(0, Math.round(amount));
  if (n === 0) return 'Rupees Zero Only';

  const ones = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const tens = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ];

  const twoDigitWords = (num: number): string => {
    if (num < 20) return ones[num];
    const t = Math.floor(num / 10);
    const o = num % 10;
    return `${tens[t]}${o ? ' ' + ones[o] : ''}`;
  };

  const parts: string[] = [];
  let rem = n;

  const crore = Math.floor(rem / 10000000);
  rem %= 10000000;
  if (crore > 0) {
    parts.push(`${crore >= 100 ? n.toLocaleString('en-IN') : twoDigitWords(crore)} Crore`);
  }

  const lakh = Math.floor(rem / 100000);
  rem %= 100000;
  if (lakh > 0) {
    parts.push(`${twoDigitWords(lakh)} Lakh`);
  }

  const thousand = Math.floor(rem / 1000);
  rem %= 1000;
  if (thousand > 0) {
    parts.push(`${twoDigitWords(thousand)} Thousand`);
  }

  const hundred = Math.floor(rem / 100);
  rem %= 100;
  if (hundred > 0) {
    parts.push(`${ones[hundred]} Hundred`);
  }

  if (rem > 0) {
    parts.push(twoDigitWords(rem));
  }

  return `Rupees ${parts.join(' ')} Only`;
}

/**
 * Determines whether the supply from Sanand GIDC, Gujarat (State Code 24, PIN 36xxxx-39xxxx)
 * is Intra-State (CGST 9% + SGST 9%) or Inter-State (IGST 18%).
 */
export function resolveGujaratTaxSplit(gstin: string, pinCode: string, gstInr: number) {
  const cleanGstin = gstin.trim().toUpperCase();
  let isGujarat = false;
  let stateLabel = 'Inter-State Supply (India)';

  if (cleanGstin.length === 15) {
    const code = cleanGstin.slice(0, 2);
    const stName = INDIAN_GST_STATE_CODES[code] || `State ${code}`;
    isGujarat = code === '24';
    stateLabel = `${code} — ${stName}`;
  } else if (/^(36|37|38|39)\d{4}$/.test(pinCode.trim())) {
    isGujarat = true;
    stateLabel = '24 — Gujarat (PIN Verified)';
  }

  if (isGujarat) {
    const cgst = Math.floor(gstInr / 2);
    const sgst = gstInr - cgst;
    return {
      isIntraStateGujarat: true,
      gstStateLabel: stateLabel,
      cgstInr: cgst,
      sgstInr: sgst,
      igstInr: 0,
    };
  }

  return {
    isIntraStateGujarat: false,
    gstStateLabel: stateLabel,
    cgstInr: 0,
    sgstInr: 0,
    igstInr: gstInr,
  };
}

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function fetchLogoDataUri(): Promise<string> {
  try {
    const resp = await fetch('/assets/brand/logo.png');
    const blob = await resp.blob();
    return await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        resolve(typeof reader.result === 'string' ? reader.result : `${window.location.origin}/assets/brand/logo.png`);
      reader.onerror = () => resolve(`${window.location.origin}/assets/brand/logo.png`);
      reader.readAsDataURL(blob);
    });
  } catch {
    return `${window.location.origin}/assets/brand/logo.png`;
  }
}

/**
 * Generates a standalone, print-ready Branded Customer Order Confirmation & Proforma Summary HTML
 * featuring the embedded InsulTherm Innovations logo, itemized SKU table, GST split, and order desk.
 */
export function buildBrandedOrderConfirmationHtml(
  snap: ConfirmedOrderSnapshot,
  logoSrc: string
): string {
  const rowsHtml = snap.items
    .map((it, idx) => {
      const lineTotal = Math.round(it.unitPriceInr * it.quantity);
      const tierBadge =
        it.itemType === 'custom-cad'
          ? it.quantity >= 500
            ? 'OEM Blanket (500+)'
            : it.quantity >= 100
            ? 'Pilot (100–499)'
            : 'Prototype (1–99)'
          : 'Turnkey Kit';

      return `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #E2E8F0;font-family:monospace;font-size:12px;color:#475569;">${String(
            idx + 1
          ).padStart(2, '0')}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #E2E8F0;">
            <div style="font-weight:700;color:#0F1115;font-size:13px;">${escapeHtml(it.title)}</div>
            <div style="font-size:11px;color:#DC2626;font-family:monospace;font-weight:700;margin-top:2px;">SKU: ${escapeHtml(
              it.sku
            )} • ${escapeHtml(tierBadge)}</div>
            <div style="font-size:11px;color:#64748B;margin-top:2px;">${escapeHtml(
              it.dimensionsLabel
            )}${it.finishOption ? ' • ' + escapeHtml(it.finishOption) : ''}</div>
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #E2E8F0;text-align:center;font-family:monospace;font-weight:700;font-size:13px;color:#0F1115;">${it.quantity.toLocaleString(
            'en-IN'
          )}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #E2E8F0;text-align:right;font-family:monospace;font-size:13px;color:#334155;">₹${it.unitPriceInr.toLocaleString(
            'en-IN'
          )}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #E2E8F0;text-align:right;font-family:monospace;font-weight:800;font-size:13px;color:#0F1115;">₹${lineTotal.toLocaleString(
            'en-IN'
          )}</td>
        </tr>
      `;
    })
    .join('');

  const taxRowsHtml = snap.isIntraStateGujarat
    ? `
      <tr>
        <td style="padding:5px 0;color:#475569;">CGST @ 9% (Intra-State Gujarat — State 24)</td>
        <td style="padding:5px 0;text-align:right;font-family:monospace;font-weight:600;">₹${snap.cgstInr.toLocaleString(
          'en-IN'
        )}</td>
      </tr>
      <tr>
        <td style="padding:5px 0;color:#475569;">SGST @ 9% (Intra-State Gujarat — State 24)</td>
        <td style="padding:5px 0;text-align:right;font-family:monospace;font-weight:600;">₹${snap.sgstInr.toLocaleString(
          'en-IN'
        )}</td>
      </tr>
    `
    : `
      <tr>
        <td style="padding:5px 0;color:#475569;">IGST @ 18% (Inter-State Supply — HSN 3919 / 6814 / 8546)</td>
        <td style="padding:5px 0;text-align:right;font-family:monospace;font-weight:600;">₹${snap.igstInr.toLocaleString(
          'en-IN'
        )}</td>
      </tr>
    `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>InsulTherm Order Confirmation ${escapeHtml(snap.orderRef)}</title>
  <style>
    @page { size: A4; margin: 14mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px;
      background: #F1F5F9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0F1115;
    }
    .sheet {
      max-width: 820px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(15, 17, 21, 0.08);
    }
    .accent-bar {
      height: 6px;
      background: linear-gradient(90deg, #0F1115 0%, #0F1115 65%, #DC2626 65%, #DC2626 100%);
    }
    .no-print-bar {
      max-width: 820px;
      margin: 0 auto 14px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
    .btn-print {
      background: #DC2626;
      color: #FFFFFF;
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
    }
    @media print {
      body { background: #FFFFFF; padding: 0; }
      .sheet { box-shadow: none; border: 1px solid #CBD5E1; border-radius: 0; }
      .no-print-bar { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <div style="font-size:12px;color:#475569;font-weight:600;">
      Official Customer Order Confirmation &amp; Proforma Request — <strong>${escapeHtml(snap.orderRef)}</strong>
    </div>
    <button class="btn-print" onclick="window.print()">Print / Save as PDF</button>
  </div>

  <div class="sheet">
    <div class="accent-bar"></div>

    <!-- Branded Header with InsulTherm Logo -->
    <div style="padding:24px 28px;background:#0F1115;color:#FFFFFF;display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;">
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="width:54px;height:54px;background:#FFFFFF;border-radius:10px;padding:5px;display:flex;align-items:center;justify-content:center;">
          <img src="${logoSrc}" alt="InsulTherm Innovations Logo" style="max-width:100%;max-height:100%;object-fit:contain;" />
        </div>
        <div>
          <div style="font-size:22px;font-weight:800;letter-spacing:-0.02em;line-height:1.1;">
            <span style="color:#FFFFFF;">Insul</span><span style="color:#EF4444;">Therm</span>
            <span style="font-weight:600;color:#CBD5E1;font-size:17px;"> Innovations</span>
          </div>
          <div style="font-size:11px;color:#94A3B8;margin-top:4px;">
            Advanced Thermal, Fire-Barrier &amp; Dielectric Materials • Block C-14, Sanand GIDC, Ahmedabad – 382110
          </div>
        </div>
      </div>

      <div style="text-align:right;">
        <div style="display:inline-block;padding:4px 10px;border-radius:6px;background:#DC2626;color:#FFFFFF;font-size:11px;font-weight:800;letter-spacing:0.05em;text-transform:uppercase;">
          Order Confirmation
        </div>
        <div style="font-family:monospace;font-size:16px;font-weight:800;margin-top:6px;color:#FFFFFF;">
          #${escapeHtml(snap.orderRef)}
        </div>
        <div style="font-size:11px;color:#94A3B8;margin-top:2px;">
          ${escapeHtml(snap.timestampIst)}
        </div>
      </div>
    </div>

    <!-- Customer & Order Routing Metadata Grid -->
    <div style="padding:22px 28px;background:#F8FAFC;border-bottom:1px solid #E2E8F0;display:grid;grid-template-columns:1fr 1fr;gap:20px;">
      <div>
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#DC2626;margin-bottom:6px;">
          Customer &amp; Dispatch Details
        </div>
        <div style="font-size:14px;font-weight:800;color:#0F1115;">${escapeHtml(snap.buyerName)}</div>
        <div style="font-size:12px;font-weight:600;color:#334155;margin-top:2px;">
          ${escapeHtml(snap.companyName || 'Individual Prototyper / R&D Researcher')}
        </div>
        <div style="font-size:12px;color:#475569;margin-top:4px;">
          Email: <strong style="font-family:monospace;color:#0F1115;">${escapeHtml(snap.buyerEmail)}</strong><br/>
          Mobile: <strong style="font-family:monospace;color:#0F1115;">${escapeHtml(snap.buyerMobileFormatted)}</strong><br/>
          Dispatch To: <strong>${escapeHtml(snap.cityAddress)} — PIN ${escapeHtml(snap.pinCode)}</strong>
        </div>
      </div>

      <div>
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#DC2626;margin-bottom:6px;">
          Tax, CAD &amp; Order Desk Routing
        </div>
        <div style="font-size:12px;color:#475569;line-height:1.6;">
          Customer GSTIN: <strong style="font-family:monospace;color:#0F1115;">${escapeHtml(
            snap.gstin || 'Unregistered / B2C Prototyping'
          )}</strong><br/>
          Tax Place of Supply: <strong>${escapeHtml(snap.gstStateLabel)}</strong><br/>
          Procurement Mode: <strong>${escapeHtml(snap.paymentMode)}</strong><br/>
          CAD Drawing: <strong>${escapeHtml(
            snap.cadFileName ? `${snap.cadFileName} (${snap.cadFileSizeLabel})` : 'Standard Dimension Spec (No CAD File)'
          )}</strong><br/>
          Active Order Desk: <strong style="font-family:monospace;color:#DC2626;">${escapeHtml(
            snap.orderDeskEmail
          )}</strong>
        </div>
      </div>
    </div>

    <!-- Itemized Order Table -->
    <div style="padding:24px 28px;">
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#0F1115;color:#FFFFFF;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;">
            <th style="padding:10px 12px;text-align:left;width:44px;">#</th>
            <th style="padding:10px 12px;text-align:left;">Material Platform / SKU / Geometry</th>
            <th style="padding:10px 12px;text-align:center;width:72px;">Qty</th>
            <th style="padding:10px 12px;text-align:right;width:105px;">Unit Rate</th>
            <th style="padding:10px 12px;text-align:right;width:115px;">Line Total</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>

      <!-- Totals & GST Box -->
      <div style="margin-top:20px;display:grid;grid-template-columns:1.1fr 0.9fr;gap:24px;align-items:start;">
        <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:14px 16px;font-size:12px;color:#334155;line-height:1.55;">
          <div style="font-weight:800;color:#0F1115;margin-bottom:4px;">Amount Chargeable (in words):</div>
          <div style="font-weight:700;color:#DC2626;margin-bottom:10px;">${escapeHtml(snap.amountInWords)}</div>
          ${
            snap.notes
              ? `<div style="border-top:1px solid #E2E8F0;padding-top:8px;margin-top:6px;"><strong>Engineering Notes:</strong> ${escapeHtml(
                  snap.notes
                )}</div>`
              : ''
          }
          <div style="border-top:1px solid #E2E8F0;padding-top:8px;margin-top:8px;font-size:11px;color:#64748B;">
            • Hard-Tooling / Steel-Die NRE: <strong>₹0 (100% Digital Oscillating-Knife CNC)</strong><br/>
            • Standard Converting SLA: <strong>24–48 Hours Ex-Works Sanand GIDC, Gujarat</strong>
          </div>
        </div>

        <div style="background:#0F1115;color:#FFFFFF;border-radius:10px;padding:16px 18px;font-size:12px;">
          <table style="width:100%;border-collapse:collapse;color:#CBD5E1;">
            <tr>
              <td style="padding:5px 0;">Items Gross Subtotal</td>
              <td style="padding:5px 0;text-align:right;font-family:monospace;font-weight:600;color:#FFFFFF;">₹${snap.subtotalInr.toLocaleString(
                'en-IN'
              )}</td>
            </tr>
            ${
              snap.appliedCouponCode && snap.couponDiscountInr > 0
                ? `<tr>
                    <td style="padding:5px 0;color:#34D399;font-weight:700;">Coupon (${escapeHtml(
                      snap.appliedCouponCode
                    )})</td>
                    <td style="padding:5px 0;text-align:right;font-family:monospace;font-weight:700;color:#34D399;">- ₹${snap.couponDiscountInr.toLocaleString(
                      'en-IN'
                    )}</td>
                  </tr>`
                : ''
            }
            <tr>
              <td style="padding:5px 0;">Custom Tooling / Die NRE</td>
              <td style="padding:5px 0;text-align:right;font-family:monospace;font-weight:700;color:#34D399;">₹0</td>
            </tr>
            <tr style="border-top:1px solid #334155;">
              <td style="padding:6px 0;font-weight:700;color:#FFFFFF;">Net Taxable Value</td>
              <td style="padding:6px 0;text-align:right;font-family:monospace;font-weight:700;color:#FFFFFF;">₹${snap.netTaxableInr.toLocaleString(
                'en-IN'
              )}</td>
            </tr>
            ${taxRowsHtml}
            <tr style="border-top:2px solid #DC2626;">
              <td style="padding:10px 0 2px 0;font-size:15px;font-weight:800;color:#FFFFFF;">Total Order Estimate</td>
              <td style="padding:10px 0 2px 0;text-align:right;font-family:monospace;font-size:17px;font-weight:800;color:#F87171;">₹${snap.grandTotalInr.toLocaleString(
                'en-IN'
              )}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <!-- Footer Confirmation Note -->
    <div style="padding:14px 28px;background:#FEF2F2;border-top:1px solid #FECACA;font-size:11px;color:#7F1D1D;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;">
      <span><strong>Questions or CAD Revisions?</strong> Reply directly to <strong>${escapeHtml(
        snap.orderDeskEmail
      )}</strong> quoting Order <strong>#${escapeHtml(snap.orderRef)}</strong>.</span>
      <span>100% Make-in-India • Sanand GIDC, Gujarat – 382110</span>
    </div>
  </div>
</body>
</html>`;
}
