export const INDIAN_GST_STATE_CODES: Record<string, string> = {
  '01': 'Jammu & Kashmir',
  '02': 'Himachal Pradesh',
  '03': 'Punjab',
  '04': 'Chandigarh',
  '05': 'Uttarakhand',
  '06': 'Haryana',
  '07': 'Delhi',
  '08': 'Rajasthan',
  '09': 'Uttar Pradesh',
  '10': 'Bihar',
  '11': 'Sikkim',
  '12': 'Arunachal Pradesh',
  '13': 'Nagaland',
  '14': 'Manipur',
  '15': 'Mizoram',
  '16': 'Tripura',
  '17': 'Meghalaya',
  '18': 'Assam',
  '19': 'West Bengal',
  '20': 'Jharkhand',
  '21': 'Odisha',
  '22': 'Chhattisgarh',
  '23': 'Madhya Pradesh',
  '24': 'Gujarat',
  '25': 'Daman & Diu',
  '26': 'Dadra & Nagar Haveli and Daman & Diu',
  '27': 'Maharashtra',
  '28': 'Andhra Pradesh (Old)',
  '29': 'Karnataka',
  '30': 'Goa',
  '31': 'Lakshadweep',
  '32': 'Kerala',
  '33': 'Tamil Nadu',
  '34': 'Puducherry',
  '35': 'Andaman & Nicobar Islands',
  '36': 'Telangana',
  '37': 'Andhra Pradesh',
  '38': 'Ladakh',
  '97': 'Other Territory',
};

export const ALLOWED_CAD_EXTENSIONS = [
  '.dxf',
  '.step',
  '.stp',
  '.iges',
  '.igs',
  '.dwg',
  '.pdf',
  '.zip',
  '.png',
  '.jpg',
  '.jpeg',
];

export const MAX_CAD_FILE_BYTES = 10 * 1024 * 1024; // 10 MB FormSubmit multipart limit

const EMAIL_TYPO_MAP: Record<string, string> = {
  'gamil.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.con': 'gmail.com',
  'gmail.in': 'gmail.com',
  'gmail.org': 'gmail.com',
  'gmail.net': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gimail.com': 'gmail.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'outlok.com': 'outlook.com',
  'hotmial.com': 'hotmail.com',
};

const DISPOSABLE_OR_DUMMY_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
  'guerrillamail.com',
  'yopmail.com',
  'trashmail.com',
  'test.com',
  'example.com',
  'abc.com',
  'xyz.com',
]);

const DUMMY_LOCAL_PARTS = new Set([
  'test',
  'testing',
  'asdf',
  'asdfgh',
  'qwerty',
  '123456',
  '12345678',
  'abcdef',
  'noreply',
  'no-reply',
  'admin123',
]);

export interface ValidationResult {
  valid: boolean;
  error?: string;
  suggestion?: string;
  meta?: string;
}

/**
 * Normalizes GSTIN input as user types: uppercase alphanumeric only, max 15 chars.
 */
export function sanitizeGstinInput(raw: string): string {
  return raw
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 15);
}

/**
 * Strict 15-character Indian GSTIN Validator:
 * Pos 1-2  : Valid 2-digit Indian State Code (01-38 or 97)
 * Pos 3-7  : 5 Uppercase Letters (PAN letters)
 * Pos 8-11 : 4 Digits (PAN digits)
 * Pos 12   : 1 Uppercase Letter (PAN check char)
 * Pos 13   : 1 Entity Number/Letter [1-9A-Z] (cannot be 0)
 * Pos 14   : 'Z' (default character per GSTN format)
 * Pos 15   : 1 Alphanumeric Checksum [0-9A-Z]
 */
export function validateIndianGstin(raw: string, required = false): ValidationResult {
  const clean = sanitizeGstinInput(raw);
  if (!clean) {
    if (required) {
      return {
        valid: false,
        error: '15-character GSTIN is required for B2B GST Input Credit (or select Unregistered Lab).',
      };
    }
    return { valid: true };
  }

  if (clean.length !== 15) {
    return {
      valid: false,
      error: `GSTIN must be exactly 15 characters (${clean.length}/15 entered). Format: 24ABCDE1234F1Z5.`,
    };
  }

  const stateCode = clean.slice(0, 2);
  if (!/^\d{2}$/.test(stateCode) || !INDIAN_GST_STATE_CODES[stateCode]) {
    return {
      valid: false,
      error: `Positions 1–2 ("${stateCode}") must be a valid 2-digit Indian GST State Code (01–38, e.g., 24 for Gujarat, 27 for Maharashtra, 03 for Punjab).`,
    };
  }

  const panLetters = clean.slice(2, 7);
  if (!/^[A-Z]{5}$/.test(panLetters)) {
    return {
      valid: false,
      error: `Positions 3–7 ("${panLetters}") must be 5 CAPITAL letters (first 5 letters of PAN).`,
    };
  }

  const panDigits = clean.slice(7, 11);
  if (!/^[0-9]{4}$/.test(panDigits)) {
    return {
      valid: false,
      error: `Positions 8–11 ("${panDigits}") must be 4 numeric digits (PAN digits).`,
    };
  }

  const panCheck = clean.slice(11, 12);
  if (!/^[A-Z]$/.test(panCheck)) {
    return {
      valid: false,
      error: `Position 12 ("${panCheck}") must be 1 CAPITAL letter (10th character of PAN).`,
    };
  }

  const entityCode = clean.slice(12, 13);
  if (!/^[1-9A-Z]$/.test(entityCode)) {
    return {
      valid: false,
      error: `Position 13 ("${entityCode}") must be a non-zero entity code (1–9 or A–Z).`,
    };
  }

  const zChar = clean.slice(13, 14);
  if (zChar !== 'Z') {
    return {
      valid: false,
      error: `Position 14 ("${zChar}") must be capital letter 'Z' in standard Indian GSTINs.`,
    };
  }

  const checkDigit = clean.slice(14, 15);
  if (!/^[0-9A-Z]$/.test(checkDigit)) {
    return {
      valid: false,
      error: `Position 15 ("${checkDigit}") must be a valid checksum digit or capital letter (0–9 or A–Z).`,
    };
  }

  // Reject trivial fake patterns like AAAAA0000A
  if (/^(.)\1{4}$/.test(panLetters) && /^(.)\1{3}$/.test(panDigits)) {
    return {
      valid: false,
      error: 'Please enter a genuine registered GSTIN (placeholder characters detected).',
    };
  }

  const stateName = INDIAN_GST_STATE_CODES[stateCode];
  const pan = clean.slice(2, 12);
  return {
    valid: true,
    meta: `Verified Format • State ${stateCode} (${stateName}) • PAN ${pan}`,
  };
}

/**
 * Sanitizes Indian 10-digit mobile number input (for a field already prefixed with +91).
 * Handles pasted "+91 98765 43210" or "09876543210" cleanly down to 10 digits.
 */
export function sanitizeIndianMobile10(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

/**
 * Strict 10-digit Indian mobile number validator (paired with locked +91 prefix).
 */
export function validateIndianMobile10(raw: string): ValidationResult {
  const digits = sanitizeIndianMobile10(raw);
  if (!digits) {
    return { valid: false, error: 'Enter your 10-digit Indian mobile number after +91.' };
  }
  if (digits.length !== 10) {
    return {
      valid: false,
      error: `Mobile number must be exactly 10 digits after +91 (${digits.length}/10 digits entered).`,
    };
  }
  if (!/^[6-9][0-9]{9}$/.test(digits)) {
    return {
      valid: false,
      error: 'Valid Indian 10-digit mobile numbers must start with 6, 7, 8, or 9.',
    };
  }
  if (
    /^(\d)\1{6,}/.test(digits) ||
    digits === '9876543210' ||
    digits === '9000000000' ||
    digits === '8000000000' ||
    digits === '7000000000' ||
    digits === '6000000000'
  ) {
    return {
      valid: false,
      error: 'Please enter an active, legitimate 10-digit mobile number.',
    };
  }
  return {
    valid: true,
    meta: `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`,
  };
}

/**
 * Strict Email & Gmail validator with domain typo detection and Google Gmail username rules.
 */
export function validateEmailStrict(raw: string): ValidationResult {
  const trimmed = raw.trim().toLowerCase();
  if (!trimmed) {
    return { valid: false, error: 'Email address is required for Order Confirmation & Proforma Invoice.' };
  }
  if (trimmed.includes(' ') || trimmed.split('@').length !== 2) {
    return { valid: false, error: 'Enter a valid email address (e.g., name@company.com or username@gmail.com).' };
  }

  const [localPart, domainPart] = trimmed.split('@');
  if (!localPart || !domainPart) {
    return { valid: false, error: 'Email address must include both username and domain.' };
  }

  if (
    localPart.startsWith('.') ||
    localPart.endsWith('.') ||
    localPart.includes('..') ||
    domainPart.startsWith('.') ||
    domainPart.endsWith('.') ||
    domainPart.includes('..')
  ) {
    return { valid: false, error: 'Email address cannot start/end with a dot or contain consecutive dots (..).' };
  }

  // Common domain typo detection (e.g., gamil.com -> gmail.com)
  if (EMAIL_TYPO_MAP[domainPart]) {
    const corrected = `${localPart}@${EMAIL_TYPO_MAP[domainPart]}`;
    return {
      valid: false,
      error: `Domain "@${domainPart}" looks mistyped. Did you mean "${corrected}"?`,
      suggestion: corrected,
    };
  }

  if (DISPOSABLE_OR_DUMMY_DOMAINS.has(domainPart)) {
    return {
      valid: false,
      error: 'Disposable or placeholder email domains are not accepted. Use your active Gmail or work email.',
    };
  }

  if (!/^[a-z0-9._%+-]{2,64}$/.test(localPart)) {
    return {
      valid: false,
      error: 'Email username contains invalid characters or is too short.',
    };
  }

  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,12}$/.test(domainPart)) {
    return {
      valid: false,
      error: 'Enter a valid email domain (e.g., @gmail.com, @company.co.in, @institute.ac.in).',
    };
  }

  const baseLocal = localPart.split('+')[0];
  if (DUMMY_LOCAL_PARTS.has(baseLocal)) {
    return {
      valid: false,
      error: 'Placeholder email usernames (e.g., "test", "123456") are blocked. Enter your real email.',
    };
  }

  // Enforce authentic Google Gmail rules when domain is gmail.com / googlemail.com
  if (domainPart === 'gmail.com' || domainPart === 'googlemail.com') {
    if (!/^[a-z0-9.]+$/.test(baseLocal)) {
      return {
        valid: false,
        error: 'Gmail addresses only allow letters (a–z), numbers (0–9), and periods (.) before @gmail.com (no underscores or hyphens).',
      };
    }
    const strippedDots = baseLocal.replace(/\./g, '');
    if (baseLocal.length < 6 || baseLocal.length > 30 || strippedDots.length < 5) {
      return {
        valid: false,
        error: 'Valid @gmail.com usernames must be between 6 and 30 characters.',
      };
    }
    if (!/[a-z]/.test(strippedDots)) {
      return {
        valid: false,
        error: 'Gmail usernames cannot consist purely of digits.',
      };
    }
  }

  return { valid: true, meta: trimmed };
}

/**
 * Full Name validator: 2-80 chars, alphabetic words, spaces, dots, hyphens, apostrophes.
 */
export function validatePersonName(raw: string): ValidationResult {
  const clean = raw.trim().replace(/\s+/g, ' ');
  if (!clean) {
    return { valid: false, error: 'Full name is required.' };
  }
  if (clean.length < 2 || clean.length > 80) {
    return { valid: false, error: 'Full name must be between 2 and 80 characters.' };
  }
  if (!/^[A-Za-z][A-Za-z\s.'-]{1,79}$/.test(clean)) {
    return {
      valid: false,
      error: 'Full name can only contain letters, spaces, periods, hyphens, or apostrophes (no digits/symbols).',
    };
  }
  const letterCount = (clean.match(/[A-Za-z]/g) || []).length;
  if (letterCount < 2) {
    return { valid: false, error: 'Please enter your legitimate full name.' };
  }
  return { valid: true };
}

/**
 * Organization / Company / Lab validator.
 */
export function validateOrganizationName(raw: string, required: boolean): ValidationResult {
  const clean = raw.trim().replace(/\s+/g, ' ');
  if (!clean) {
    if (required) {
      return { valid: false, error: 'Company / R&D Lab / Institution name is required for B2B orders.' };
    }
    return { valid: true };
  }
  if (clean.length < 2 || clean.length > 120) {
    return { valid: false, error: 'Organization name must be 2–120 characters.' };
  }
  const letterCount = (clean.match(/[A-Za-z]/g) || []).length;
  if (letterCount < 2) {
    return { valid: false, error: 'Organization name must include valid letters (not pure numbers).' };
  }
  return { valid: true };
}

/**
 * Delivery City / Industrial Estate validator.
 */
export function validateCityAddress(raw: string): ValidationResult {
  const clean = raw.trim().replace(/\s+/g, ' ');
  if (!clean) {
    return { valid: false, error: 'Delivery city / industrial area is required.' };
  }
  if (clean.length < 2 || clean.length > 120) {
    return { valid: false, error: 'Delivery city / address must be 2–120 characters.' };
  }
  if ((clean.match(/[A-Za-z]/g) || []).length < 2) {
    return { valid: false, error: 'Enter a valid city & state name (e.g., Pune, Maharashtra).' };
  }
  return { valid: true };
}

/**
 * Strict 6-digit Indian PIN Code validator (100000 - 999999, never starts with 0).
 */
export function sanitizePinCode(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, 6);
}

export function validateIndianPinCode(raw: string): ValidationResult {
  const pin = sanitizePinCode(raw);
  if (!pin) {
    return { valid: false, error: '6-digit Indian PIN code is required for dispatch.' };
  }
  if (pin.length !== 6) {
    return { valid: false, error: `PIN code must be exactly 6 digits (${pin.length}/6 entered).` };
  }
  if (!/^[1-9][0-9]{5}$/.test(pin)) {
    return { valid: false, error: 'Indian PIN codes must be 6 digits and cannot start with 0.' };
  }
  if (/^(\d)\1{5}$/.test(pin) || pin === '123456') {
    return { valid: false, error: 'Please enter a valid 6-digit Indian postal PIN code.' };
  }
  return { valid: true };
}

/**
 * Validates CAD / technical drawing files (extension + max 10 MB size).
 */
export function validateCadFile(file: File | null): ValidationResult {
  if (!file) return { valid: true };
  const lower = file.name.toLowerCase();
  const hasValidExt = ALLOWED_CAD_EXTENSIONS.some((ext) => lower.endsWith(ext));
  if (!hasValidExt) {
    return {
      valid: false,
      error: `Unsupported file type "${file.name}". Allowed CAD/print formats: ${ALLOWED_CAD_EXTENSIONS.join(', ').toUpperCase()}.`,
    };
  }
  if (file.size <= 0) {
    return { valid: false, error: 'Selected file is empty (0 bytes).' };
  }
  if (file.size > MAX_CAD_FILE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `File "${file.name}" (${sizeMb} MB) exceeds the 10 MB direct upload limit. Compress into a .ZIP under 10 MB.`,
    };
  }
  const kbOrMb =
    file.size >= 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      : `${Math.max(1, Math.round(file.size / 1024))} KB`;
  return { valid: true, meta: `${file.name} (${kbOrMb})` };
}

/**
 * Clamps numeric dimensions (10 - 1,000 mm) and quantities (1 - 100,000 pcs).
 */
export function clampDimensionMm(val: number, fallback = 100): number {
  if (!Number.isFinite(val)) return fallback;
  return Math.max(10, Math.min(1000, Math.round(val * 10) / 10));
}

export function clampQuantityPcs(val: number, fallback = 1): number {
  if (!Number.isFinite(val)) return fallback;
  return Math.max(1, Math.min(100000, Math.round(val)));
}
