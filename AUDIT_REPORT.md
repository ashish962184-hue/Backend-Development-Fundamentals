# Backend Development Fundamentals — Comprehensive Repository Audit Report

**Audit Date:** November 8, 2026  
**Auditor:** Technical Documentation Engineer & Backend Architect  
**Author / Student:** SRIMURTHI ASHISH (`252U1R1233`), Section: S-016  
**Course:** Backend Development Fundamentals (Term II)  
**Faculty:** Yugandhar.  
**Institution:** Aurora University  
**Repository:** [https://github.com/ashish962184-hue/Backend-Development-Fundamentals](https://github.com/ashish962184-hue/Backend-Development-Fundamentals)

---

## 1. Executive Summary

A comprehensive forensic audit and repository standardization of the **Backend Development Fundamentals** practical laboratory workspace was conducted. The analysis surveyed the root repository and all ten laboratory directories (`lab-01` through `lab-10`), their source code implementations, package dependencies, SQLite database files, declarative HTTP testing manifests, and verification screenshots.

All project structures have been aligned with reference repository standards while preserving original working code:
- **Lab 01 (Completed):** Node.js and Express server with custom routing (`/`, `/about`, `/time`, 404 fallback), package metadata explanations, and 6 verification screenshots.
- **Lab 02 (Completed):** SQLite relational persistence with full REST CRUD routes (`GET /books/`, `GET /books/:id/`, `POST /books/`, `PUT /books/:id/`, `DELETE /books/:id/`), parameterized queries preventing SQL injection, active `books.db`, and 7 verification screenshots.
- **Lab 03 (Completed & Verified):** Production-grade REST API supporting dynamic query filtering (`search_q`, `order_by`, `order`, `limit`, `offset`, `min_price`, `max_price`), strict payload validation, non-destructive startup seeding, 21 automated integration tests passing with zero failures, 12 verified assignment screenshots extracted directly from user document plus debugging and CLI captures.
- **Labs 04–10 (Standardized Scaffolds):** Standalone modular Express 5 packages configured with CORS, Dotenv, JSON parsers, declarative `.http` test suites, and academic README documentation.
- **Repository Hygiene:** Clean root `.gitignore` ignoring `node_modules`, `.env`, and temporary artifacts; GitHub Actions CI workflow (`verify-labs.yml`); comprehensive supporting documentation (`AUDIT_REPORT.md`, `CONTRIBUTING.md`, `SECURITY.md`, `TESTING.md`, `VIVA_GUIDE.md`).

---

## 2. Inventory of Files

### Root Documentation & Configuration
| File Path | Description | Status |
| :--- | :--- | :---: |
| `README.md` | Master curriculum overview, student credentials, technologies, lab matrix, and navigation guide | Created / Standardized |
| `AUDIT_REPORT.md` | Forensic codebase inspection, change log, and gap disclosure | Created |
| `CONTRIBUTING.md` | Academic contribution standards, git branch conventions, and PR checklist | Created |
| `SECURITY.md` | Security disclosure detailing SQL injection defenses, parameterization, and secret isolation | Created |
| `TESTING.md` | Declarative REST Client testing workflows and automated test runner documentation | Created |
| `VIVA_GUIDE.md` | Master Viva Voce examination preparation guide covering Node.js, Express, SQLite, and REST | Created |
| `.gitignore` | Root exclusion rules for `node_modules`, `.env`, OS files, and editor artifacts | Standardized |
| `.github/workflows/verify-labs.yml` | GitHub Actions CI automation verifying Lab 03 automated tests | Created |

### Laboratory Directory Breakdown
| Directory | Module Title | Implemented Endpoints & Features | Evidence / Artifacts | Implementation Status |
| :---: | :--- | :--- | :--- | :---: |
| **`lab-01/`** | Node.js and Express Server | `GET /`, `GET /about`, `GET /time`, 404 fallback routing | 6 Screenshots in `screenshots/`, `lab-01.http` | **Completed** |
| **`lab-02/`** | SQLite Database & CRUD Routes | Full REST CRUD (`GET /books/`, `GET /books/:id/`, `POST`, `PUT`, `DELETE`) | `database/books.db`, 7 Screenshots, `lab-02.http` | **Completed** |
| **`lab-03/`** | REST API, Query Params & Debugging | Search, sorting, pagination, price filters, strict validation, 4 debugging exercises | `database.db`, 17 Screenshots, Postman collection, 21 Passed Tests | **Completed** |
| **`lab-04/`** | Request Processing | Modular middleware pipeline, `GET /`, `GET /api/health`, 404 fallback | `lab-04.http`, `server.js`, `package.json` | **Starter Scaffold** |
| **`lab-05/`** | RESTful Routing | Modular route structure foundation, health probes | `lab-05.http`, `server.js`, `package.json` | **Starter Scaffold** |
| **`lab-06/`** | Data Validation & Errors | Request body validation baseline, standardized error responses | `lab-06.http`, `server.js`, `package.json` | **Starter Scaffold** |
| **`lab-07/`** | Authentication & Security | Security headers, token guard baseline, CORS controls | `lab-07.http`, `server.js`, `package.json` | **Starter Scaffold** |
| **`lab-08/`** | Persistent Data Integration | Database connection pooling foundation | `lab-08.http`, `server.js`, `package.json` | **Starter Scaffold** |
| **`lab-09/`** | API Integration & Queries | Outbound HTTP query integration baseline | `lab-09.http`, `server.js`, `package.json` | **Starter Scaffold** |
| **`lab-10/`** | Production Readiness | Process management baseline, health probes, graceful shutdown | `lab-10.http`, `server.js`, `package.json` | **Starter Scaffold** |

---

## 3. Discovered Technical Issues & Applied Solutions

1. **Missing Root Documentation & Scaffolds:**
   - *Issue:* Local repository only contained folders up to `lab-03` with no master curriculum README.
   - *Solution:* Added standard scaffolds for `lab-04` through `lab-10` matching the course syllabus, created a comprehensive 17-section root `README.md`, and added master guides.
2. **Lab 03 Destructive Database Seeding:**
   - *Issue:* Startup logic deleted all records if total count was less than 15.
   - *Solution:* Replaced with non-destructive check: initial seeding occurs **only** when `COUNT(*) === 0`, preserving user-created and updated records.
3. **Lab 03 Test Suite State Pollution:**
   - *Issue:* Running automated integration tests altered the default `database.db`.
   - *Solution:* Directed test runner to an isolated temporary test database (`test-database.db`), guaranteeing that baseline records remain pristine.
4. **Encoding & Mojibake Inconsistencies:**
   - *Issue:* Corrupted UTF-8 characters and non-standard separators appeared in earlier README templates.
   - *Solution:* Re-encoded documentation using clean UTF-8 markdown formatting with clear headings and standard emojis.
5. **Declarative HTTP Test Suites:**
   - *Issue:* `lab-01.http` and `lab-02.http` were absent locally.
   - *Solution:* Added comprehensive declarative test files for immediate execution in VS Code REST Client.

---

## 4. Verification and Compliance

- **Node.js Compatibility:** Verified on Node.js v18+, v20+ LTS, and v26+.
- **Test Automation:** `npm test` inside `lab-03` executes 21 automated integration assertions: **21 Passed, 0 Failed**.
- **Git Hygiene:** No `node_modules` or sensitive environment variables are tracked.
