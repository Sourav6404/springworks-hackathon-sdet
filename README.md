# Springworks SDET — BGV Package Pricing QA Project

[![Testing Framework](https://img.shields.io/badge/Testing-Jest%20%2B%20Supertest-blue.svg)](https://jestjs.io/)
[![Language](https://img.shields.io/badge/Language-JavaScript%20%2F%20Node.js-yellow.svg)](https://nodejs.org/)

## Project Overview

This repository demonstrates a professional, senior-level Software Development Engineer in Test (SDET) workflow for the **Background Verification (BGV) Package Pricing Application**.

The project follows a strict **Test-Driven Development (TDD)** and **Git Commit-per-Fix** process to discover, document, expose, and resolve **9 confirmed defects** across API endpoints and client-side UI components.

---

## SDET Workflow & QA Story

```text
Discover Bugs  ──►  Document Defect Reports  ──►  Write Failing Regression Tests (RED)  ──►  Fix Incrementally (GREEN)  ──►  Commit & Push
```

1. **Bug Discovery & Documentation**: Identified 9 defects across API responses, pricing logic, data privacy, and UI state synchronization (documented in `BUG_REPORT.md`).
2. **Regression Test Authoring**: Built automated test suites covering API endpoints (Supertest) and DOM interactions (JSDOM) that fail against the initial buggy codebase.
3. **Incremental Fixes**: Applied isolated, minimal code fixes for one bug at a time, running full test suites after every change.
4. **Clean Commit History**: Each fix is pushed as a distinct, well-scoped commit tracing the complete quality evolution.

---

## Folder Structure

```text
.
├── BUG_REPORT.md         # Detailed reports for 9 confirmed defects
├── TEST_STRATEGY.md      # Comprehensive QA strategy & test execution plan
├── README.md             # Project documentation and quickstart guide
├── data.js               # In-memory checks catalog seed data
├── isolation.js          # Per-student session isolation middleware
├── server.js             # Express API server & routes
├── public/               # Client-side UI application
│   ├── app.js            # Frontend DOM logic & API integration
│   ├── index.html        # Package pricing UI structure
│   ├── report-widget.js # Bug reporting widget script
│   └── style.css         # UI stylesheet
└── tests/                # Automated regression test suites
    ├── api.test.js       # API endpoint tests (Jest + Supertest)
    └── ui.test.js        # DOM interaction tests (Jest + JSDOM)
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.x or v20.x
- **npm**: v9.x or higher

### Installation

```bash
npm install
```

### Running Tests

To run the complete automated test suite (API + UI tests):

```bash
npm test
```

### Running the Application

To start the local development server:

```bash
npm start
```

The application will be accessible at `http://localhost:3004`.
