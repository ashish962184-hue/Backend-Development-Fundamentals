# Backend Development Fundamentals — Practical Laboratory Portfolio

[![Node.js Version](https://img.shields.io/badge/Node.js-LTS%20Recommended-green.svg)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/Express-v5.x-lightgrey.svg)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-SQLite3-blue.svg)](https://www.sqlite.org/)
[![API Testing](https://img.shields.io/badge/Testing-REST%20Client%20%7C%20Postman-orange.svg)](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
[![CI Verification](https://github.com/ashish962184-hue/Backend-Development-Fundamentals/actions/workflows/verify-labs.yml/badge.svg)](https://github.com/ashish962184-hue/Backend-Development-Fundamentals/actions)

---

### Quick Navigation
[Laboratories](#9-lab-by-lab-overview) · [Installation](#12-installation--prerequisites) · [Testing](#14-testing--verification-information) · [Viva Guide](./VIVA_GUIDE.md) · [Security Policy](./SECURITY.md) · [Audit Report](./AUDIT_REPORT.md)

---

## 1. Project Title & Description

This repository is the academic practical portfolio for **Backend Development Fundamentals** at **Aurora University**. It documents the implementation and progression of backend development concepts through individual laboratory exercises.

**Labs 01–03** contain implemented practical work covering Node.js, Express, SQLite database operations, REST API development, query parameter handling, request validation, and debugging.

**Labs 04–10** currently contain starter folder structures and project scaffolds prepared for upcoming coursework. Their implementations and practical evidence will be added as the corresponding assignments are completed.

Each laboratory is organized in a separate directory with its own project configuration, source files, documentation, and supporting test resources where applicable. Each lab maintains its own package manifest and lockfile for independent dependency management.

---

## 2. Course Overview

- **Course:** Backend Development Fundamentals
- **Term:** Year II, Term II
- **Institution:** Aurora University
- **Faculty:** Yugandhar.
- **Repository:** [https://github.com/ashish962184-hue/Backend-Development-Fundamentals](https://github.com/ashish962184-hue/Backend-Development-Fundamentals)

---

## 3. Student Information

| Field | Details |
| :--- | :--- |
| **Student Name** | SRIMURTHI ASHISH |
| **Registration Number** | 252U1R1233 |
| **Section** | S-016 |
| **Course** | Backend Development Fundamentals |
| **Institution** | Aurora University |

---

## 4. Institution & Course Details

The course curriculum is structured to explore practical backend engineering concepts across ten sequential laboratory modules:
- Core Node.js execution and runtime architecture.
- Modular RESTful API development using Express.
- Asynchronous database interactions using SQLite3.
- Parameterized SQL queries to prevent SQL injection.
- Complex query parameters (search, pagination, multi-column sorting, numerical filtering).
- Defensive programming with strict request payload validation and consistent JSON error formats.
- Root cause analysis and resolution of server failures (port conflicts, missing modules, schema typos, unresolved promises).
- Middleware pipeline architectures, authentication baselines, persistent data integration, and production health probes (planned upcoming areas).

---

## 5. Technologies Used

### Implemented Technologies (Verified in Labs 01–03)

| Technology | Purpose | Current Usage |
| :--- | :--- | :--- |
| **Node.js** | JavaScript runtime environment | Labs 01–03 implemented |
| **Express.js** | Backend web application framework | Labs 01–03 implemented |
| **Native HTTP Module** | Built-in HTTP server | Lab 01 |
| **SQLite / sqlite3** | Relational database engine & Promise wrapper | Labs 02–03 |
| **Nodemon** | Development server file monitoring & auto-reload | Where configured in Labs 01–03 |
| **VS Code REST Client** | Declarative HTTP testing via `.http` files | Labs 01–03 |
| **Postman** | API exploration and collection testing | Lab 03 |
| **GitHub Actions** | Automated CI verification | Lab 03 workflow (`verify-labs.yml`) |

### Planned Technologies (Configured in Starter Scaffolds)

- **CORS (`cors`):** Cross-Origin Resource Sharing middleware configured in scaffolds for Labs 04–10.
- **Dotenv (`dotenv`):** Environment variable isolation configured in scaffolds for Labs 04–10.

---

## 6. Course Learning Objectives

The course is designed to develop practical knowledge and skills in the following backend development areas. Implementation progress is documented in the individual laboratory folders.

1. **Server Initialization & Lifecycle:** Configuring modular Express web servers, managing port bindings, and handling graceful process shutdowns.
2. **Relational Database Management:** Creating schemas, managing table keys, executing CRUD operations, and managing asynchronous SQLite database handles.
3. **Defensive Programming & SQL Injection Prevention:** Implementing parameterized queries with positional `?` placeholders to eliminate SQL injection vulnerabilities.
4. **RESTful API Semantics:** Mapping HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`) to database operations and returning standard status codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`).
5. **Middleware Pipelines:** Implementing global CORS policies, JSON request payload parsing, URL-encoded form handling, and catch-all 404 routing.
6. **Automated API Testing:** Writing declarative HTTP request specifications using the VS Code REST Client extension and custom test runners for deterministic verification.

---

## 7. Table of Contents

- [1. Project Title & Description](#1-project-title--description)
- [2. Course Overview](#2-course-overview)
- [3. Student Information](#3-student-information)
- [4. Institution & Course Details](#4-institution--course-details)
- [5. Technologies Used](#5-technologies-used)
- [6. Course Learning Objectives](#6-course-learning-objectives)
- [7. Table of Contents](#7-table-of-contents)
- [8. Repository Folder Structure](#8-repository-folder-structure)
- [9. Lab-by-Lab Overview](#9-lab-by-lab-overview)
- [10. Technologies & Concepts Covered / Planned by Lab](#10-technologies-and-concepts-covered--planned-by-lab)
- [11. Individual Lab Documentation](#11-individual-lab-documentation)
- [12. Installation & Prerequisites](#12-installation--prerequisites)
- [13. Repository Navigation Instructions](#13-repository-navigation-instructions)
- [14. Testing & Verification Information](#14-testing--verification-information)
- [15. Screenshots & Evidence Navigation](#15-screenshots--evidence-navigation)
- [16. Learning Outcomes from Completed Labs](#16-learning-outcomes-from-completed-labs)
- [17. Author Information](#17-author-information)

---

## 8. Repository Folder Structure

The repository follows an independent-folder structure for each laboratory. Labs 01–03 contain implemented coursework, while Labs 04–10 currently contain starter scaffolds for upcoming assignments.

```text
Backend-Development-Fundamentals/
├── .github/
│   └── workflows/
│       └── verify-labs.yml       # GitHub Actions CI automated testing pipeline (Lab 03)
├── .gitignore                    # Master exclusion rules (node_modules, .env, OS files)
├── README.md                     # Master curriculum overview and documentation index
├── AUDIT_REPORT.md               # Forensic documentation and implementation audit report
├── CONTRIBUTING.md               # Contribution standards and pull request guidelines
├── SECURITY.md                   # Security policy and SQL injection prevention disclosure
├── TESTING.md                    # Declarative REST Client testing specifications
├── VIVA_GUIDE.md                 # Master Viva Voce examination preparation guide
├── lab-01/                       # Lab 01: Node.js and Express Server (Completed)
│   ├── screenshots/              # 6 Verification screenshots
│   ├── .gitignore
│   ├── app.js
│   ├── lab-01.http               # Declarative REST Client tests
│   ├── package.json
│   ├── package-lock.json
│   ├── plain-server.js           # Built-in http module server
│   ├── README.md
│   └── server.js                 # Express server with student metadata
├── lab-02/                       # Lab 02: SQLite Database & CRUD Routes (Completed)
│   ├── database/
│   │   └── books.db              # SQLite relational database
│   ├── screenshots/              # 7 Verification screenshots
│   ├── .gitignore
│   ├── app.js                    # Full REST CRUD implementation
│   ├── create-table.js
│   ├── insert-books.js
│   ├── lab-02.http               # Declarative REST Client tests
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── server.js
├── lab-03/                       # Lab 03: REST API, Query Params & Debugging (Completed & Verified)
│   ├── debug-exercise/           # 4 Deliberate bug analyses and broken server code
│   │   ├── DEBUGGING.md
│   │   └── server-broken.js
│   ├── postman/
│   │   └── Lab3.postman_collection.json # 21 test scenarios
│   ├── screenshots/              # 17 Verified screenshots (12 document + debug + CLI)
│   ├── .env.example
│   ├── .gitignore
│   ├── .node-version
│   ├── database.db               # SQLite database with 15 seeded books
│   ├── lab-03.http               # 21 REST Client test requests
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── server.js                 # Express API with query filters & body validation
│   └── test-runner.js            # Automated integration test runner (21/21 passing)
├── lab-04/                       # Request Processing — Starter Scaffold
│   ├── .gitignore
│   ├── lab-04.http
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── server.js
├── lab-05/                       # RESTful Routing — Starter Scaffold
│   ├── .gitignore
│   ├── lab-05.http
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── server.js
├── lab-06/                       # Data Validation & Errors — Starter Scaffold
│   ├── .gitignore
│   ├── lab-06.http
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── server.js
├── lab-07/                       # Authentication & Security — Starter Scaffold
│   ├── .gitignore
│   ├── lab-07.http
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── server.js
├── lab-08/                       # Persistent Data Integration — Starter Scaffold
│   ├── .gitignore
│   ├── lab-08.http
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── server.js
├── lab-09/                       # API Integration & Queries — Starter Scaffold
│   ├── .gitignore
│   ├── lab-09.http
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── server.js
└── lab-10/                       # Production Readiness — Starter Scaffold
    ├── .gitignore
    ├── lab-10.http
    ├── package.json
    ├── package-lock.json
    ├── README.md
    └── server.js
```

---

## 9. Lab-by-Lab Overview

| Lab | Title | Current Status | Description | Documentation |
| :---: | :--- | :---: | :--- | :---: |
| **01** | Node.js and Express Server | **Completed** | Implemented built-in `http` server, Express 5 server, `GET /`, `GET /about`, `GET /time`, and 404 fallback routing. | [Lab 01 README](./lab-01/README.md) |
| **02** | SQLite Database & CRUD Routes | **Completed** | Implemented asynchronous SQLite connection, seeded `books.db`, and full CRUD routes with parameterized queries. | [Lab 02 README](./lab-02/README.md) |
| **03** | REST API, Query Parameters & Debugging | **Completed & Verified** | Implemented query filters (`search_q`, sort, order, limit, offset, min/max price), payload validation, 4 debugging exercises, and 21 automated tests. | [Lab 03 README](./lab-03/README.md) |
| **04** | Request Processing | **Starter Scaffold** | Folder and initial project files created. Implementation pending. | [Lab 04 README](./lab-04/README.md) |
| **05** | RESTful Routing | **Starter Scaffold** | Folder and initial project files created. Implementation pending. | [Lab 05 README](./lab-05/README.md) |
| **06** | Data Validation & Errors | **Starter Scaffold** | Folder and initial project files created. Implementation pending. | [Lab 06 README](./lab-06/README.md) |
| **07** | Authentication & Security | **Starter Scaffold** | Folder and initial project files created. Implementation pending. | [Lab 07 README](./lab-07/README.md) |
| **08** | Persistent Data Integration | **Starter Scaffold** | Folder and initial project files created. Implementation pending. | [Lab 08 README](./lab-08/README.md) |
| **09** | API Integration & Queries | **Starter Scaffold** | Folder and initial project files created. Implementation pending. | [Lab 09 README](./lab-09/README.md) |
| **10** | Production Readiness | **Starter Scaffold** | Folder and initial project files created. Implementation pending. | [Lab 10 README](./lab-10/README.md) |

---

## 10. Technologies and Concepts Covered / Planned by Lab

### Completed Modules
- **Lab 01 (Completed):** Native `http` module vs Express; request-response lifecycle; route handlers; HTTP status codes (`200`, `404`); JSON serialization.
- **Lab 02 (Completed):** SQLite database initialization; table creation; SQL CRUD operations; parameterized queries (`?`) preventing SQL injection; asynchronous database handles.
- **Lab 03 (Completed & Verified):** Dynamic URL query parameter parsing; case-insensitive search via SQL `LIKE`; SQL `ORDER BY` injection protection via JavaScript whitelisting; numerical pagination (`LIMIT`, `OFFSET`); range filtering (`min_price`, `max_price`); request body validation; status codes (`201 Created`, `400 Bad Request`, `404 Not Found`); debugging port conflicts (`EADDRINUSE`), import paths, schema typos, and unawaited Promises.

### Planned Modules (Starter Scaffolds — Implementation Pending)
- **Lab 04:** Express middleware chaining (`cors`, `express.json`, `express.urlencoded`); global pre-processing; request logging pipeline. *(Planned topic based on current starter scaffold; implementation pending).*
- **Lab 05:** Modular RESTful routing architecture; resource-oriented URI design and sub-router composition. *(Planned topic based on current starter scaffold; implementation pending).*
- **Lab 06:** Defensive payload validation; schema verification; standardized JSON error schemas. *(Planned topic based on current starter scaffold; implementation pending).*
- **Lab 07:** Security headers; token guard baselines; credential safety; CORS protection. *(Planned topic based on current starter scaffold; implementation pending).*
- **Lab 08:** Database connection management; transactions and relational integrity. *(Planned topic based on current starter scaffold; implementation pending).*
- **Lab 09:** External API integration; query composition; asynchronous client fetching. *(Planned topic based on current starter scaffold; implementation pending).*
- **Lab 10:** Production deployment readiness; health probes (`/api/health`); process lifecycle; graceful shutdown signals. *(Planned topic based on current starter scaffold; implementation pending).*

---

## 11. Individual Lab Documentation

### Laboratory Documentation Links
- [Lab 01 — Node.js and Express Server](./lab-01/README.md) — Completed
- [Lab 02 — SQLite Database and CRUD Routes](./lab-02/README.md) — Completed
- [Lab 03 — REST API, Query Parameters and Debugging](./lab-03/README.md) — Completed & Verified
- [Lab 04 — Request Processing](./lab-04/README.md) — Starter Scaffold
- [Lab 05 — RESTful Routing](./lab-05/README.md) — Starter Scaffold
- [Lab 06 — Data Validation and Errors](./lab-06/README.md) — Starter Scaffold
- [Lab 07 — Authentication and Security](./lab-07/README.md) — Starter Scaffold
- [Lab 08 — Persistent Data Integration](./lab-08/README.md) — Starter Scaffold
- [Lab 09 — API Integration and Queries](./lab-09/README.md) — Starter Scaffold
- [Lab 10 — Production Readiness](./lab-10/README.md) — Starter Scaffold

### Supporting Repository Documentation
- [📋 Master Audit Report](./AUDIT_REPORT.md) — Detailed codebase audit, change log, and gap disclosure.
- [🧪 Testing Guide & Procedures](./TESTING.md) — Declarative REST Client testing and test-runner guide.
- [💡 Master Viva Voce Preparation Guide](./VIVA_GUIDE.md) — Course-wide exam questions and answers.
- [🤝 Contribution Standards](./CONTRIBUTING.md) — Academic coding standards and PR checklist.
- [🛡️ Security Policy](./SECURITY.md) — SQL injection prevention disclosure and parameterization practices.

---

## 12. Installation & Prerequisites

### Prerequisites
- **Node.js:** Install a supported LTS release compatible with the individual lab's `package.json` and dependencies ([https://nodejs.org/](https://nodejs.org/)).
- **npm:** Use the npm version bundled with your Node.js installation.
- **VS Code:** Recommended editor, with the [REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) for executing `.http` test files.

### Independent Package Architecture
Each lab maintains its own `package.json` and `package-lock.json`; dependencies must be installed inside the relevant lab folder prior to running:

```powershell
# Navigate into the desired lab directory
cd lab-03

# Install dependencies locally
npm.cmd install

# Start the application
npm.cmd start
```

---

## 13. Repository Navigation Instructions

- **Source Code:** Each lab's primary application entry point resides in `server.js` (or `app.js` in Lab 02).
- **HTTP Declarative Requests:** Execute `.http` files directly within VS Code using the `Send Request` button above each request block.
- **Database Inspection:** SQLite databases are stored locally as `database.db` (Lab 03) or `database/books.db` (Lab 02) and can be examined with the SQLite CLI:
  ```powershell
  sqlite3 database.db
  ```
- **Automated Verification:** Run the automated test runner in Lab 03 with:
  ```powershell
  cd lab-03
  npm.cmd test
  ```
- **Reference & Evaluation Guides:** Review [AUDIT_REPORT.md](./AUDIT_REPORT.md) for codebase verification, [TESTING.md](./TESTING.md) for test procedures, and [VIVA_GUIDE.md](./VIVA_GUIDE.md) for theoretical concepts.

---

## 14. Testing & Verification Information

> **Verification Scope:** The automated 21-test integration suite applies specifically to **Lab 03**. It does not represent automated verification of Labs 01–10. The GitHub Actions CI workflow (`.github/workflows/verify-labs.yml`) executes this automated test suite for Lab 03.

### Recorded Lab 03 Automated Verification Result

```text
> node test-runner.js

Starting Lab 03 Server for Automated Verification with Isolated Test DB...

--- Executing Test Scenarios ---
  ✓ PASS: 1. GET / Root metadata contains student SRIMURTHI ASHISH
  ✓ PASS: 2. Successful GET all books (GET /books/ default limit 10)
  ✓ PASS: 3. Search query filter (GET /books/?search_q=JavaScript)
  ✓ PASS: 4. Sorting by price descending (GET /books/?order_by=price&order=DESC)
  ✓ PASS: 5. Pagination with limit and offset (GET /books/?limit=3&offset=3)
  ✓ PASS: 6. Price range filtering (GET /books/?min_price=400&max_price=800)
  ✓ PASS: 7. Combined search, price, sort & pagination (GET /books/?...)
  ✓ PASS: 8. GET single book by ID (GET /books/1/)
  ✓ PASS: 9. POST create new book (POST /books/ 201 Created)
  ✓ PASS: 10. POST missing title validation (400 Bad Request)
  ✓ PASS: 11. POST missing author validation (400 Bad Request)
  ✓ PASS: 12. POST invalid price validation (400 Bad Request)
  ✓ PASS: 13. PUT update existing book (PUT /books/1/ 200 OK)
  ✓ PASS: 14. PUT update nonexistent book ID (404 Not Found)
  ✓ PASS: 15. DELETE existing book (DELETE /books/15/ 200 OK)
  ✓ PASS: 16. DELETE nonexistent book ID (404 Not Found)
  ✓ PASS: 17. Validation: Invalid sorting field (400 Bad Request)
  ✓ PASS: 18. Validation: Invalid sorting direction (400 Bad Request)
  ✓ PASS: 19. Validation: Negative pagination limit (400 Bad Request)
  ✓ PASS: 20. Validation: Non-numeric book ID path parameter (400 Bad Request)
  ✓ PASS: 21. Not Found: Unknown route handler (404 Not Found)

Verification Complete: 21 Passed, 0 Failed.
```

---

## 15. Screenshots & Evidence Navigation

All screenshots are organized in their respective laboratory folders to provide visual verification:
- **Lab 01 Screenshots:** [`lab-01/screenshots/`](./lab-01/screenshots/) (6 images: Welcome, About, Time, 404, Plain Server, Terminal).
- **Lab 02 Screenshots:** [`lab-02/screenshots/`](./lab-02/screenshots/) (7 images: GET all, GET single, 404, POST, PUT, DELETE, SQLite CLI).
- **Lab 03 Screenshots:** [`lab-03/screenshots/`](./lab-03/screenshots/) (17 images, comprising 12 practical verification captures extracted from the assignment document and 5 additional debugging and database/CLI evidence images).
- **Labs 04–10:** Screenshots and practical evidence are pending completion of the upcoming lab assignments.

---

## 16. Learning Outcomes from Completed Labs

The completed work in Labs 01–03 demonstrates practical competencies in:
1. **Node.js & Express Routing:** Configuring HTTP servers, managing port bindings, and handling request-response lifecycles.
2. **Relational Database Integration:** Creating and initializing SQLite databases asynchronously using `sqlite` and `sqlite3`.
3. **RESTful CRUD Operations:** Designing and implementing standard endpoints (`GET`, `POST`, `PUT`, `DELETE`) for resource management.
4. **Defensive Parameterized Queries:** Preventing SQL injection vulnerabilities by using positional `?` placeholders.
5. **Advanced Query Parameter Handling:** Implementing dynamic partial-title search via SQL `LIKE`, safe column sorting whitelists, numerical pagination, and price range filters.
6. **Request Validation & Error Handling:** Validating incoming payloads and returning standard HTTP status codes (`200`, `201`, `400`, `404`) with consistent JSON messages.
7. **Declarative & Automated Testing:** Testing endpoints using VS Code REST Client declarative requests, Postman collections, and scripted automated integration test runners.
8. **Systematic Debugging:** Diagnosing and resolving common runtime backend errors including port conflicts (`EADDRINUSE`), missing import paths, table name mismatches, and unawaited Promises.

---

## 17. Author Information

**SRIMURTHI ASHISH**  
Registration Number: **252U1R1233**  
Section: **S-016**  
Term: **Year II, Term II**  
Course: **Backend Development Fundamentals**  
Faculty: **Yugandhar.**  
Institution: **Aurora University**  
GitHub: [https://github.com/ashish962184-hue](https://github.com/ashish962184-hue)
