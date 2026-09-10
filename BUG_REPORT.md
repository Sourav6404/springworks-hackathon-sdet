# Confirmed Bug Reports — Springworks SDET Challenge

This document records the 9 confirmed defects identified during exploratory and automated testing of the Background Verification (BGV) Package Pricing Application.

---

## 1. BUG-01: Wrong HTTP Success Status Code

* **Bug ID**: `BUG-01`
* **Endpoint**: `POST /api/quote`
* **Defect Type**: API Contract Violation / HTTP Protocol Error
* **Description**: The `POST /api/quote` endpoint returns an HTTP `201 Created` status code when calculating a package quote.
* **Expected**: Per OpenAPI specification and standard REST guidelines for calculation endpoints, it should return `200 OK`.
* **Actual**: Returns `201 Created`.
* **Severity**: Medium

---

## 2. BUG-02: Hidden Internal Field Exposure (`vendorCost`)

* **Bug ID**: `BUG-02`
* **Endpoint**: `GET /api/checks-catalog`
* **Defect Type**: Information Disclosure / Data Leakage
* **Description**: The checks catalog endpoint returns internal vendor pricing (`vendorCost`) in the JSON payload alongside public fields.
* **Expected**: Only public fields (`id`, `name`, `price`) should be exposed to clients.
* **Actual**: Response objects contain `{ id, name, price, vendorCost }`.
* **Severity**: High

---

## 3. BUG-03: Duplicate Check IDs Double Pricing

* **Bug ID**: `BUG-03`
* **Endpoint**: `POST /api/quote`
* **Defect Type**: Pricing Calculation Error / Missing Input Sanitization
* **Description**: Submitting duplicate check IDs in the request body array (e.g. `["IDENTITY", "IDENTITY"]`) causes the API to price the same check multiple times.
* **Expected**: Duplicate check IDs should be deduplicated so each selected check is priced exactly once.
* **Actual**: Subtotal is multiplied by the number of duplicate occurrences.
* **Severity**: High

---

## 4. BUG-04: Missing `checkIds` Request Validation

* **Bug ID**: `BUG-04`
* **Endpoint**: `POST /api/quote`
* **Defect Type**: Unhandled Input Exception / Invalid Status Code
* **Description**: Sending a request without the required `checkIds` parameter (or with non-array input) causes an unhandled 500 internal server error.
* **Expected**: Missing or malformed `checkIds` should be rejected with `400 Bad Request` and an error description.
* **Actual**: Returns `500 Internal Server Error`.
* **Severity**: High

---

## 5. BUG-05: Invalid `checkId` Reference Validation

* **Bug ID**: `BUG-05`
* **Endpoint**: `POST /api/quote`
* **Defect Type**: Missing Entity Reference Validation
* **Description**: The API does not validate whether submitted `checkId` values exist in the checks catalog.
* **Expected**: Unknown or invalid `checkId` entries should be rejected with `400 Bad Request`.
* **Actual**: Unknown check IDs are ignored, and a quote is generated successfully.
* **Severity**: High

---

## 6. BUG-06: Quote Summary Aggregate Values Not Rendered

* **Bug ID**: `BUG-06`
* **Component**: UI (`public/app.js`)
* **Defect Type**: UI State & Rendering Bug
* **Description**: After generating a quote, the UI summary displays `$0.00` for Subtotal, Discount, and GST, while rendering only the Total value.
* **Expected**: The UI should display calculated values for Subtotal, Discount, GST, and Total.
* **Actual**: Subtotal, Discount, and GST remain `$0.00` or empty.
* **Severity**: High

---

## 7. BUG-07: Unformatted Currency Display in UI

* **Bug ID**: `BUG-07`
* **Component**: UI (`public/app.js`)
* **Defect Type**: Formatting / Display Bug
* **Description**: Quote values displayed in the UI summary lack standardized currency formatting (`$XX.XX`).
* **Expected**: Values should be formatted consistently as currency strings.
* **Actual**: Numeric values are displayed without standard currency formatting or remaining unpopulated.
* **Severity**: Medium

---

## 8. BUG-08: Premature Success Feedback Guard

* **Bug ID**: `BUG-08`
* **Component**: UI (`public/app.js`)
* **Defect Type**: Race Condition / Missing Feedback Guard
* **Description**: The UI displays "Quote generated successfully!" even when the quote summary calculation fields have not finished rendering or are incomplete.
* **Expected**: Success notification should only appear after all quote fields (Subtotal, Discount, GST, Total) are successfully rendered in the DOM.
* **Actual**: Success message appears immediately regardless of render status.
* **Severity**: Medium

---

## 9. BUG-09: Checkbox Deselection State Synchronization Failure

* **Bug ID**: `BUG-09`
* **Component**: UI (`public/app.js`)
* **Defect Type**: Event Handler & State Synchronization Bug
* **Description**: Toggling a check item checkbox on and then off does not remove the item from the active selection array, leaving the live subtotal out of sync with checked items.
* **Expected**: Unchecking a checkbox should immediately remove the check ID from the selected list and update the live subtotal.
* **Actual**: Checkbox visual state toggles, but item remains selected in state and live total does not decrease.
* **Severity**: High
