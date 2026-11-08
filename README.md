# Backend Development Fundamentals — Practical Laboratory Portfolio

[![Node.js Version](https://img.shields.io/badge/Node.js-v18%2B%20%7C%20v20%2B-green.svg)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/Express-v5.x-lightgrey.svg)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-SQLite3-blue.svg)](https://www.sqlite.org/)
[![API Testing](https://img.shields.io/badge/Testing-REST%20Client%20%7C%20Postman-orange.svg)](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
[![Build Status](https://img.shields.io/badge/Build-Passing%20(21%2F21)-success.svg)](./lab-03/README.md)

---

## 1. Project Title & Description

This repository serves as the official, comprehensive academic portfolio for **Backend Development Fundamentals**. It demonstrates the progression from fundamental HTTP request/response handling and modular server architectures to relational database persistence with SQLite, production RESTful API construction, defensive query parameter validation, and systematic debugging of server runtime errors.

Each laboratory exercise is maintained as an **independent, isolated Node.js package** equipped with its own configuration, dependency tree, declarative test suite (`.http`), and dedicated technical documentation.

---

## 2. Course Overview

- **Course:** Backend Development Fundamentals
- **Term:** Term II (Year II)
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

The curriculum provides rigorous practical training in building secure, scalable backend web applications. Key milestones include:
- Core Node.js execution and runtime architecture.
- RESTful API design using Express 5.
- Asynchronous database interactions using SQLite3.
- Parameterized SQL queries to eliminate SQL injection.
- Complex query parameters (search, pagination, multi-column sorting, numerical filtering).
- Defensive programming with strict request payload validation and consistent JSON error formats.
- Root cause analysis and resolution of server failures (port conflicts, missing modules, schema typos, unresolved promises).

---

## 5. Technologies Used

| Technology | Role & Purpose | Verified Usage |
| :--- | :--- | :---: |
| **Node.js** | Non-blocking, event-driven JavaScript runtime engine | Labs 01–10 |
| **Express.js** | Minimalist web application framework for HTTP routing and middleware | Labs 01–10 |
| **SQLite (sqlite3 / sqlite)** | Lightweight, file-based relational database engine with Promise wrappers | Labs 02, 03 |
| **CORS** | Cross-Origin Resource Sharing middleware | Labs 03–10 |
| **Dotenv** | Zero-dependency environment variable manager | Labs 03–10 |
| **Nodemon** | Development process manager with automatic file-watching reload | Labs 01–10 |
| **VS Code REST Client** | Declarative HTTP request specification and execution (`.http`) | Labs 01–10 |
| **Postman** | API exploration, schema verification, and integration test collections | Lab 03 |
| **GitHub Actions** | Continuous Integration CI pipeline verifying automated tests | CI Workflow |

---

## 6. Learning Objectives

By completing the laboratory curriculum, students demonstrate mastery over:
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
- [6. Learning Objectives](#6-learning-objectives)
- [7. Table of Contents](#7-table-of-contents)
- [8. Repository Folder Structure](#8-repository-folder-structure)
- [9. Lab-by-Lab Overview](#9-lab-by-lab-overview)
- [10. Technologies & Concepts by Lab](#10-technologies--concepts-by-lab)
- [11. Individual Lab Documentation](#11-individual-lab-documentation)
- [12. Installation & Prerequisites](#12-installation--prerequisites)
- [13. Repository Navigation Instructions](#13-repository-navigation-instructions)
- [14. Testing & Verification Information](#14-testing--verification-information)
- [15. Screenshots & Evidence Navigation](#15-screenshots--evidence-navigation)
- [16. Learning Outcomes](#16-learning-outcomes)
- [17. Author Information](#17-author-information)

---

## 8. Repository Folder Structure

```text
Backend-Development-Fundamentals/
├── .github/
│   └── workflows/
│       └── verify-labs.yml       # GitHub Actions CI automated testing pipeline
├── .gitignore                    # Master exclusion rules (node_modules, .env, OS files)
├── README.md                     # Master curriculum overview and documentation index
├── AUDIT_REPORT.md               # Forensic documentation and implementation audit report
├── CONTRIBUTING.md               # Contribution standards and pull request guidelines
├── SECURITY.md                   # Security policy and SQL injection prevention disclosure
├── TESTING.md                    # Declarative REST Client testing specifications
├── VIVA_GUIDE.md                 # Master Viva Voce examination preparation guide
├── lab-01/                       # Lab 01: Node.js and Express Server (Complete)
│   ├── screenshots/              # 6 Verification screenshots
│   ├── lab-01.http               # Declarative REST Client tests
│   ├── package.json
│   ├── package-lock.json
│   ├── plain-server.js           # Built-in http module server
│   ├── README.md
│   └── server.js                 # Express server with student info
├── lab-02/                       # Lab 02: SQLite Database & CRUD Routes (Complete)
│   ├── database/
│   │   └── books.db              # SQLite relational database
│   ├── screenshots/              # 7 Verification screenshots
│   ├── app.js                    # Full REST CRUD implementation
│   ├── create-table.js
│   ├── insert-books.js
│   ├── lab-02.http               # Declarative REST Client tests
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── server.js
├── lab-03/                       # Lab 03: REST API, Query Params & Debugging (Complete)
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
│   ├── server.js                 # Complete Express API with query filters & validation
│   └── test-runner.js            # Automated integration test runner (21/21 passing)
├── lab-04/                       # Lab 04: Request Processing (Starter Scaffold)
│   ├── .gitignore
│   ├── lab-04.http
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── server.js
├── lab-05/                       # Lab 05: RESTful Routing (Starter Scaffold)
│   ├── .gitignore
│   ├── lab-05.http
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── server.js
├── lab-06/                       # Lab 06: Data Validation & Errors (Starter Scaffold)
│   ├── .gitignore
│   ├── lab-06.http
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── server.js
├── lab-07/                       # Lab 07: Authentication & Security (Starter Scaffold)
│   ├── .gitignore
│   ├── lab-07.http
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── server.js
├── lab-08/                       # Lab 08: Persistent Data Integration (Starter Scaffold)
│   ├── .gitignore
│   ├── lab-08.http
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── server.js
├── lab-09/                       # Lab 09: API Integration & Queries (Starter Scaffold)
│   ├── .gitignore
│   ├── lab-09.http
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── server.js
└── lab-10/                       # Lab 10: Production Readiness (Starter Scaffold)
    ├── .gitignore
    ├── lab-10.http
    ├── package.json
    ├── package-lock.json
    ├── README.md
    └── server.js
```

---

## 9. Lab-by-Lab Overview

| Lab | Title | Tech Stack | Implemented Functionality | Documentation | Status |
| :---: | :--- | :--- | :--- | :---: | :---: |
| **01** | Node.js and Express Server | Node.js, Express 5, Nodemon | `GET /`, `GET /about`, `GET /time`, 404 fallback routing | [Lab 01 README](./lab-01/README.md) | **Completed** |
| **02** | SQLite Database & CRUD Routes | Node.js, Express 5, SQLite3, sqlite, Nodemon | Full REST CRUD (`GET /books/`, `GET /books/:id/`, `POST`, `PUT`, `DELETE`) with parameterized queries | [Lab 02 README](./lab-02/README.md) | **Completed** |
| **03** | REST API, Query Parameters & Debugging | Node.js, Express 5, SQLite3, sqlite, Nodemon | Query filtering (`search_q`, sort, order, limit, offset, min/max price), strict body validation, debugging exercises | [Lab 03 README](./lab-03/README.md) | **Completed & Verified** |
| **04** | Request Processing | Node.js, Express 5, CORS, Dotenv | Middleware pipeline architecture, `GET /`, `GET /api/health`, 404 handler | [Lab 04 README](./lab-04/README.md) | **Starter Scaffold** |
| **05** | RESTful Routing | Node.js, Express 5, CORS, Dotenv | Modular route structure foundation, health probes | [Lab 05 README](./lab-05/README.md) | **Starter Scaffold** |
| **06** | Data Validation & Errors | Node.js, Express 5, CORS, Dotenv | Payload validation base, standardized error handling | [Lab 06 README](./lab-06/README.md) | **Starter Scaffold** |
| **07** | Authentication & Security | Node.js, Express 5, CORS, Dotenv | Security & token guard baseline, CORS controls | [Lab 07 README](./lab-07/README.md) | **Starter Scaffold** |
| **08** | Persistent Data Integration | Node.js, Express 5, CORS, Dotenv | Database integration foundation, connection lifecycle | [Lab 08 README](./lab-08/README.md) | **Starter Scaffold** |
| **09** | API Integration & Queries | Node.js, Express 5, CORS, Dotenv | Third-party API & query baseline | [Lab 09 README](./lab-09/README.md) | **Starter Scaffold** |
| **10** | Production Readiness | Node.js, Express 5, CORS, Dotenv | Process management baseline, health probes, graceful shutdown | [Lab 10 README](./lab-10/README.md) | **Starter Scaffold** |

---

## 10. Technologies & Concepts by Lab

- **Lab 01:** Native `http` module vs Express 5; request-response lifecycle; route handlers; HTTP status codes (`200`, `404`); JSON serialization.
- **Lab 02:** SQLite database initialization; table creation; SQL CRUD operations; parameterized queries (`?`) preventing SQL injection; asynchronous database handles.
- **Lab 03:** Dynamic URL query parameter parsing; case-insensitive search via SQL `LIKE`; SQL `ORDER BY` injection protection via JavaScript whitelisting; numerical pagination (`LIMIT`, `OFFSET`); range filtering (`min_price`, `max_price`); request body validation; status codes (`201 Created`, `400 Bad Request`, `404 Not Found`); debugging port conflicts (`EADDRINUSE`), import paths, schema typos, and unawaited Promises.
- **Lab 04:** Express middleware chaining (`cors`, `express.json`, `express.urlencoded`); global pre-processing; request logging.
- **Lab 05:** Modular RESTful routing architecture; resource-oriented URI design.
- **Lab 06:** Defensive payload validation; schema verification; standardized JSON error schemas.
- **Lab 07:** Security headers; token guard baselines; credential safety; CORS protection.
- **Lab 08:** Database connection management; transactions and relational integrity.
- **Lab 09:** External API integration; query composition; asynchronous client fetching.
- **Lab 10:** Production deployment readiness; health probes (`/api/health`); process lifecycle; graceful shutdown signals.

---

## 11. Individual Lab Documentation

Each lab maintains its own detailed documentation:
- [📖 Lab 01 Documentation](./lab-01/README.md)
- [📖 Lab 02 Documentation](./lab-02/README.md)
- [📖 Lab 03 Documentation](./lab-03/README.md)
- [📖 Lab 04 Documentation](./lab-04/README.md)
- [📖 Lab 05 Documentation](./lab-05/README.md)
- [📖 Lab 06 Documentation](./lab-06/README.md)
- [📖 Lab 07 Documentation](./lab-07/README.md)
- [📖 Lab 08 Documentation](./lab-08/README.md)
- [📖 Lab 09 Documentation](./lab-09/README.md)
- [📖 Lab 10 Documentation](./lab-10/README.md)

---

## 12. Installation & Prerequisites

### Prerequisites
- **Node.js:** v18.x, v20.x, or v22+ LTS installed ([https://nodejs.org/](https://nodejs.org/))
- **npm:** v9.x or higher (packaged with Node.js)
- **VS Code:** with the [REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) installed.

### Independent Package Architecture
Each lab folder is an independent package. Navigate into the specific lab directory to install dependencies and execute:

```powershell
# Navigate to desired lab folder
cd lab-03

# Install dependencies
npm.cmd install

# Start server
npm.cmd start
```

---

## 13. Repository Navigation Instructions

- **Source Code:** Each lab's primary logic resides in `server.js` (or `app.js` in Lab 02).
- **HTTP Tests:** Execute `.http` files directly within VS Code using the `Send Request` button above each request block.
- **Database Files:** SQLite databases are stored locally as `database.db` or `database/books.db` and can be examined with the SQLite CLI:
  ```powershell
  sqlite3 database.db
  ```
- **Automated Tests:** In Lab 03, run the full automated test suite with:
  ```powershell
  cd lab-03
  npm.cmd test
  ```

---

## 14. Testing & Verification Information

Automated end-to-end integration testing is implemented in **Lab 03** via `test-runner.js`. The test suite spins up an Express server on an isolated temporary test database (`test-database.db`), executing 21 comprehensive assertions:

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

All screenshots are stored in each lab's dedicated `screenshots/` directory:
- **Lab 01 Screenshots:** [`lab-01/screenshots/`](./lab-01/screenshots/) (6 images: Welcome, About, Time, 404, Plain Server, Terminal)
- **Lab 02 Screenshots:** [`lab-02/screenshots/`](./lab-02/screenshots/) (7 images: GET all, GET single, 404, POST, PUT, DELETE, SQLite CLI)
- **Lab 03 Screenshots:** [`lab-03/screenshots/`](./lab-03/screenshots/) (17 images: 12 assignment verification captures, SQLite CLI, and 4 debugging scenarios)

---

## 16. Learning Outcomes

1. **Production REST Architecture:** Mastered declarative routing, status codes, and HTTP method semantics.
2. **Database Security:** Eliminated SQL injection risks through rigorous whitelisting and parameterized queries.
3. **Defensive API Engineering:** Implemented robust query parameter parsing and strict JSON payload validation.
4. **Automated Testing:** Designed reproducible, isolated test suites using declarative `.http` requests and scripted test runners.
5. **Systematic Debugging:** Diagnosed port conflicts, runtime import errors, SQL schema discrepancies, and asynchronous Promise pitfalls.

---

## 17. Author Information

**SRIMURTHI ASHISH**  
Registration Number: **252U1R1233**  
Section: **S-016**  
Term: **Term II**  
Course: **Backend Development Fundamentals**  
Faculty: **Yugandhar.**  
Institution: **Aurora University**  
GitHub: [https://github.com/ashish962184-hue](https://github.com/ashish962184-hue)
