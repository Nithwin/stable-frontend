# Rule 02: Form Validation and Field Specifications

## 1. Universal Validation Principles

Validation rules must be enforced regardless of the implementation mechanism (whether using a schema library like Zod or vanilla validation logic).

* **Server and Client Parity:** The exact same validation rules must execute on the client (for instant UI feedback) and on the server (for secure boundary enforcement).
* **Sanitize Before Validation:** Always trim leading/trailing whitespace and normalize casing (e.g. email) before checking lengths or regex patterns.
* **No Unhandled Types:** Explicitly check for `null`, `undefined`, and `NaN` on every incoming value.

---

## 2. Field-by-Field Validation Specifications

Apply these specific checks when building forms containing the following common input types:

### Email Address
* **Required:** Must not be empty, null, or whitespace-only.
* **Sanitization:** Apply `.trim()` and convert to `.toLowerCase()`.
* **Format:** Must match standard email pattern (`local-part@domain.extension`).
* **Length:** Maximum length of 254 characters (RFC 5321).
* **Error Messages:** Explicitly differentiate between "Email is required" and "Please enter a valid email address".

### Password & Confirmation
* **Minimum Length:** Minimum 8 characters (or project-specified length).
* **Complexity:** Check for at least one uppercase letter, one lowercase letter, and one number.
* **Whitespace:** Do not silently strip internal spaces; reject leading/trailing spaces if required by policy.
* **Confirmation Field:** Must match the primary password field exactly. Mark error directly on the confirmation field: "Passwords do not match".

### Text, Names & Titles
* **Required:** Must reject empty strings or whitespace-only input.
* **Sanitization:** Always apply `.trim()`.
* **Length Bounds:** Define explicit minimum (e.g. 2 characters for names) and maximum (e.g. 50–100 characters) thresholds to prevent database overflow.
* **Content:** Reject raw HTML or script tags to prevent stored cross-site scripting (XSS).

### Numbers, Quantities & Currency
* **Type Safety:** Guard against `NaN` and non-numeric inputs.
* **Integer vs. Decimal:** Enforce integer checks for quantities, IDs, and age; allow fixed decimals (e.g. 2 decimal places) for currency.
* **Range Bounds:** Define explicit minimums (e.g. non-negative `>= 0`, age `>= 18`) and maximum ceilings.

### Phone Numbers
* **Format:** Accept optional international prefix `+` followed by digits. Strip spaces, hyphens, and parentheses prior to validation.
* **Length:** Between 7 and 15 digits (E.164 international standard).

### URLs & External Links
* **Protocol:** Require valid `https://` (or `http://`) protocol prefix.
* **Domain:** Validate host and top-level domain format.

### Dates & Date Ranges
* **Validity:** Reject `Invalid Date` instances or malformed date strings.
* **Bounds:** Future/past constraints based on context (e.g. Date of Birth cannot be in the future).
* **Ranges:** When start and end dates exist, validate that `endDate >= startDate`.
* **Timezone Safety:** Store and transmit in standardized ISO 8601 (UTC).

### Checkboxes & Legal Acceptance
* **Terms of Service:** If required, value must be explicitly strictly equal to `true` (not merely truthy or string `"on"`).

### Select Dropdowns & Radio Groups
* **Enum Membership:** Input value must be an exact match against the predefined list of allowed choices. Reject any unrecognized string.

### File Uploads
* **File Size:** Enforce strict byte ceiling (e.g. max 5MB).
* **MIME Types:** Restrict to explicit allowed types (e.g. `image/jpeg`, `image/png`, `application/pdf`).
* **Filename:** Sanitize filename to prevent directory traversal (`../`).

---

## 3. Mandatory Form Lifecycle States

Every form component must explicitly represent and visually handle five states:

1. **Pristine / Idle:** Clean initial state. Do not show validation errors before the user has interacted with a field.
2. **Submitting / In-Flight:**
   * Disable all inputs, selects, and action buttons (`disabled={isSubmitting}`).
   * Lock submit handler to eliminate duplicate in-flight submissions from double-clicks.
3. **Field-Level Errors:** Specific error messages positioned directly beneath the invalid input.
4. **Form-Level / Server Errors:** Render an alert banner above the form for system errors (e.g. 401 Unauthorized, 422 Unprocessable Entity, 500 Internal Server Error).
5. **Success Confirmation:** Clear feedback upon successful submission (inline message, toast alert, or redirect).

---

## 4. Accessibility (A11y) Requirements

* **Label Associations:** Every input must have an explicit `<label htmlFor="id">` matching `<input id="id">`.
* **Accessible Error State:** Set `aria-invalid={true}` on fields with active errors.
* **Error Announcement:** Bind the error message text to the input using `aria-describedby="[field]-error"`.
* **Focus Management:** Upon failed submission, automatically focus the first invalid field.
