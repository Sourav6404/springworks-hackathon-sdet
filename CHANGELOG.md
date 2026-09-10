# Changelog

All notable changes to the **Springworks SDET BGV Package Pricing Project** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned Fixes (GREEN Phase)
- `fix(api)`: Return HTTP status `200 OK` for quote calculation endpoint.
- `fix(api)`: Remove internal `vendorCost` field from public checks catalog response.
- `fix(api)`: Deduplicate `checkIds` to prevent double pricing.
- `fix(api)`: Return `400 Bad Request` when `checkIds` payload is missing or invalid.
- `fix(api)`: Reject unknown `checkIds` with `400 Bad Request`.
- `fix(ui)`: Correctly map DOM checkbox values and render Subtotal, Discount, GST & Total fields.
- `fix(ui)`: Format quote summary values with currency symbol (`₹`) and 2 decimal places.
- `fix(ui)`: Guard success feedback banner until complete quote summary renders on 2xx response.
- `fix(ui)`: Synchronize checkbox deselection state with live subtotal calculation.

---

## [0.2.0] - 2026-09-10

### Added
- Created automated API regression test suite in `tests/api.test.js` covering 5 API defects using Jest and Supertest.
- Created automated UI regression test suite in `tests/ui.test.js` covering 4 UI defects using Jest and JSDOM.
- Configured root Jest runner in `jest.config.js` with `api` and `ui` project environments.
- Added `jest`, `supertest`, and `jest-environment-jsdom` to `devDependencies` in `package.json`.

---

## [0.1.0] - 2026-09-10

### Added
- Created `BUG_REPORT.md` documenting all 9 confirmed defects with Bug ID, Defect Type, Expected/Actual results, and Severity ratings.
- Created `TEST_STRATEGY.md` outlining QA scope across Smoke, API, UI, and Regression testing levels.
- Created `README.md` providing project overview, folder structure, quickstart instructions, and TDD workflow story.
- Initialized Git repository and set up `.gitignore` for node modules and temporary archives.
