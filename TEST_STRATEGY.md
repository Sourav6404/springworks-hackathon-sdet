# Test Strategy — BGV Package Pricing QA Automation

## 1. Executive Summary

This document outlines the Quality Assurance (QA) and Test-Driven Development (TDD) strategy for the Background Verification (BGV) Package Pricing Application. The testing framework combines API regression testing (Jest + Supertest) and UI component testing (Jest + JSDOM) to achieve end-to-end quality coverage.

---

## 2. Testing Levels & Scope

### 2.1 Smoke Testing
* Validate server initialization on port 3004.
* Ensure core routes (`GET /api/checks-catalog`, `POST /api/quote`) respond to HTTP requests.
* Verify frontend static asset serving (`/index.html`, `/app.js`, `/style.css`).

### 2.2 API Automation Testing (Jest + Supertest)
* **Contract & Status Code Testing**: Verify API HTTP status codes against OpenAPI specs (`200 OK`, `400 Bad Request`).
* **Data Privacy & Security**: Ensure sensitive/internal fields like `vendorCost` are stripped from public endpoints.
* **Input Validation & Boundary Testing**: Validate array presence, empty payloads, and non-existent entity IDs.
* **Business Logic & Arithmetic Integrity**: Test duplicate check ID handling and pricing calculations.

### 2.3 UI & State Synchronization Testing (Jest + JSDOM)
* **DOM Structure & Field Rendering**: Ensure Subtotal, Discount, GST, and Total elements are correctly populated.
* **State Persistance & Toggle Synchronization**: Verify checkbox `change` events accurately update selected check arrays and live subtotal calculations.
* **User Feedback Guards**: Ensure success banners are displayed only after full DOM render completion.

### 2.4 Regression Testing
* Execute complete test suite (`npm test`) on every bug fix commit to ensure zero regressions across both API and UI layers.

---

## 3. Tooling & Environment

| Tool / Library | Version | Role / Purpose |
| :--- | :--- | :--- |
| **Node.js** | v20.x | Execution runtime |
| **Jest** | ^29.x / ^30.x | Core test runner & assertion engine |
| **Supertest** | ^7.x | HTTP assertion library for API endpoints |
| **JSDOM / jest-environment-jsdom** | ^29.x | Virtual DOM environment for client-side UI testing |
| **Express** | ^4.19.2 | Application web framework |
| **Git & GitHub** | - | Version control and TDD commit tracking |

---

## 4. Test Execution & Workflow

```text
[ Document Defects ] ──► [ Write Failing Tests (RED) ] ──► [ Apply Minimal Fix ] ──► [ Verify PASS (GREEN) ] ──► [ Commit & Push ]
```

1. **RED Phase**: All 9 regression tests are authored first and confirmed to fail against the buggy baseline codebase.
2. **GREEN Phase**: Bugs are resolved incrementally in isolation (one bug fix per commit).
3. **REFACTOR / RE-VERIFY**: `npm test` is run after every commit to ensure 100% suite pass rate.
