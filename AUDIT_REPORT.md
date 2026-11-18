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
| Directory | Module Title | Implemented / Planned Features | Evidence / Artifacts | Current Implementation Status |
| :---: | :--- | :--- | :--- | :---: |
| **`lab-01/`** | Node.js and Express Server | \`GET /\`, \`GET /about\`, \`GET /time\`, 404 fallback routing | 6 Screenshots in \`screenshots/\`, \`lab-01.http\` | **Completed** |
| **`lab-02/`** | SQLite Database & CRUD Routes | Full REST CRUD (\`GET /books/\`, \`GET /books/:id/\`, \`POST\`, \`PUT\`, \`DELETE\`) | \`database/books.db\`, 7 Screenshots, \`lab-02.http\` | **Completed** |
| **`lab-03/`** | REST API, Query Params & Debugging | Search, sorting, pagination, price filters, strict validation, 4 debugging exercises | \`database.db\`, 17 Screenshots, Postman collection, 21 Passed Tests | **Completed & Verified** |
| **`lab-04/`** | Request Processing | Starter scaffold: project structure created, implementation pending | \`lab-04.http\`, \`server.js\`, \`package.json\` | **Starter Scaffold** |
| **`lab-05/`** | RESTful Routing | Starter scaffold: project structure created, implementation pending | \`lab-05.http\`, \`server.js\`, \`package.json\` | **Starter Scaffold** |
| **`lab-06/`** | Data Validation & Errors | Starter scaffold: project structure created, implementation pending | \`lab-06.http\`, \`server.js\`, \`package.json\` | **Starter Scaffold** |
| **`lab-07/`** | Authentication & Security | Starter scaffold: project structure created, implementation pending | \`lab-07.http\`, \`server.js\`, \`package.json\` | **Starter Scaffold** |
| **`lab-08/`** | Persistent Data Integration | Starter scaffold: project structure created, implementation pending | \`lab-08.http\`, \`server.js\`, \`package.json\` | **Starter Scaffold** |
| **`lab-09/`** | API Integration & Queries | Starter scaffold: project structure created, implementation pending | \`lab-09.http\`, \`server.js\`, \`package.json\` | **Starter Scaffold** |
| **`lab-10/`** | Production Readiness | Starter scaffold: project structure created, implementation pending | \`lab-10.http\`, \`server.js\`, \`package.json\` | **Starter Scaffold** |

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

---

## 5. Follow-up Audit: Labs 01–03 and Lab 04 Authentication

**Review date:** November 17, 2026
**Scope:** Read-only audit of Labs 01–03, followed by the requested Lab 04 registration/login/JWT implementation. Labs 01–03 were not modified. This follow-up supersedes earlier broad PASS claims where current execution did not verify them.

### Results at a glance

| Lab | Result | Evidence |
|---|---|---|
| Lab 01 | **PARTIAL** | Source and referenced image files inspected; HTTP execution not verified. |
| Lab 02 | **PARTIAL** | Source and persistent DB artifact inspected; CRUD execution and DB rows not verified. |
| Lab 03 | **PARTIAL / NOT VERIFIED** | Static implementation inspection completed. `npm.cmd test` returned 0 passed / 21 failed because the sandbox blocks loopback connections; the runner hides child server output. |
| Lab 04 | **Implementation drafted; runtime NOT VERIFIED** | Authentication code and nine-scenario test runner created. Registry access and loopback restrictions prevented dependency installation and test execution. |

### Requirement-by-requirement findings

| Lab / requirement | Status | Inspected evidence and issue | Recommended correction / defect type |
|---|---|---|---|
| 01 native HTTP server responds `Hello` on port 3000 | PASS (code) | `lab-01/plain-server.js` uses `http.createServer`, responds `Hello`, listens on 3000. Runtime not tested. | Run in a normal environment; execution evidence limitation. |
| 01 Express routes and status codes | PASS (code) | `lab-01/app.js` implements `/`, `/about`, `/time` with `new Date()`, and 404. `server.js` duplicates routes. | Clarify/remove duplicate entrypoint; maintainability. |
| 01 package, scripts, node_modules ignore | PASS (inspection) | Express dependency and start/plain/server scripts exist; node_modules is ignored. | Runtime not tested. |
| 01 screenshot files and README references | PARTIAL | Six linked PNGs exist (950×480); image contents/authenticity were not visually verified. | Visually review captures; missing evidence verification. |
| 01 README student metadata and deployment status | PARTIAL | Visible mojibake corrupts name/institution in several places; localhost is labeled “Live Link” despite no public deployment. | Repair encoding; label localhost as local and state not deployed. Documentation defects. |
| 02 dependencies, nodemon, async DB-before-listen | PARTIAL | `sqlite`, `sqlite3`, nodemon and scripts exist; `app.js` awaits open before listening. Startup does not create the table. | Initialize schema or fail clearly with setup instructions; functional setup defect. |
| 02 persistent DB and 8–10 initial records | PASS (artifact only) | Tracked `database/books.db`; seed script defines ten rows. SQLite CLI is unavailable, so stored row count was not read. | Verify rows with SQLite tooling; evidence limitation. |
| 02 nondestructive initialization | FAIL | `init-db` runs `insert-books.js`, which unconditionally appends ten rows on each run. | Make seeding idempotent; data integrity defect. |
| 02 five CRUD routes and SQL parameterization | PARTIAL | All five routes exist and use placeholders/await. POST/PUT omit validation; 500s expose `error.message`. | Add validation and generic 500 JSON; functional/security disclosure defects. |
| 02 README run commands and screenshots | PARTIAL | Seven referenced files exist, but visual content is unverified; README has mojibake. `init-db` behavior is not safe to rerun. | Fix docs and idempotent setup; documentation and data-integrity defects. |
| 03 REST query filters and safe SQL | PASS (static inspection) | Resource-based routes; validation; sort whitelist; parameterized values; awaited DB calls. Runtime not verified. | Rerun tests where loopback is permitted. |
| 03 async initialization and seed preservation | PASS (code) | Async initializer creates schema; seeds only when count is zero. | None found statically. |
| 03 CRUD/error behavior | PARTIAL | Routes validate inputs and use required status codes. Actual response/error shapes not confirmed by execution. | Verify in an unrestricted test environment; execution evidence gap. |
| 03 debugging exercises | PARTIAL | `debug-exercise/DEBUGGING.md` covers all four requested bugs and fixes. Screenshots exist but contents not inspected. | Reproduce/check screenshot evidence; evidence gap. |
| 03 automated suite | NOT VERIFIED | `npm.cmd test`: **0 passed, 21 failed**. Direct localhost requests fail with `EACCES` / Windows socket error 10013. Runner suppresses child stdout/stderr, obscuring startup cause. | Rerun outside restricted sandbox; capture child output and fail fast. Functional verification blocker. |
| 03 GitHub Actions | NOT VERIFIED | Workflow installs dependencies and runs Lab 03 tests on Node 20; no CI run result available here. | Check latest workflow result. Missing verification. |
| 03 screenshots and deployment | PARTIAL | 17 PNGs exist; README links primary screenshots. Duplicates/aliases exist, contents not visually inspected. Render instructions exist but no actual deployment URL is shown. | Clarify not deployed unless a working URL is supplied; verify evidence. Documentation/evidence defects. |
| Shared repository hygiene | PASS (tracked paths) | `git ls-files` shows no tracked node_modules or `.env`; ignore rules are present. SQLite DB files are intentionally tracked. | No correction required from path inspection. |

### Commands and results

- Before edits, `git status --short --branch`: `## main...origin/main` (clean).
- `node --version`: `v26.13.0`; `npm.cmd --version`: `11.20.0`.
- `npm.cmd test` in Lab 03: **0 passed, 21 failed**. The runner starts a child process then requests `localhost:5099`; this environment rejects local TCP connections (`EACCES` / 10013). This does not establish that the API endpoints themselves are defective.
- A direct in-process app request and a direct server request were also blocked by the same loopback restriction.
- SQLite CLI is unavailable; database row counts were not independently queried.
- Labs 01–03 were unchanged (`git diff -- lab-01 lab-02 lab-03` was empty).

### Missing or unverified evidence

- No screenshots were fabricated. Existing Lab 01–03 image paths resolve, but capture contents/authenticity were not visually audited.
- Lab 03 suite needs a rerun with loopback permission and visible child server logs.
- Lab 02 row count and mutations need execution using a disposable database copy or isolated DB.
- No public deployment URL was verified.
- Lab 04 screenshots are absent; README says so plainly.

### Corrections ranked by severity

1. **High — Lab 02:** Make DB initialization complete and idempotent; validate POST/PUT and avoid leaking database error details.
2. **High — Lab 04 verification:** Install dependencies and run the integration suite in an environment with npm registry access and loopback sockets.
3. **Medium — Lab 03:** Rerun tests outside this restricted sandbox; make the runner expose child startup errors.
4. **Medium — Labs 01–03 docs:** Repair mojibake and clarify local versus public deployment status.
5. **Low — screenshots:** Visually inspect evidence and resolve ambiguous duplicate aliases only after confirming assignment needs.

### Lab 04 implementation status

Lab 04 now includes `/register/` and `/login/`, a unique SQLite users table, parameterized queries, bcrypt hash/compare, a development-only JWT secret constant, username-only application claims, one-hour expiry, generic server errors, a nine-scenario isolated test runner, and updated README/REST Client requests. `package.json` declares bcrypt, jsonwebtoken, sqlite, and sqlite3. The existing lockfile could not be regenerated: npm registry access is unavailable and packages are not cached. Lab 04 runtime behavior and dependency lockfile are therefore **NOT VERIFIED / incomplete until `npm.cmd install` and `npm.cmd test` succeed in a connected environment**.
