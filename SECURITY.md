# Security Policy

## 1. Supported Scope

This repository maintains academic lab implementations for the **Backend Development Fundamentals** coursework. Security defenses demonstrated herein represent core web application safety fundamentals:

| Component | Protection Mechanism | Status |
| :--- | :--- | :---: |
| **SQL Database Operations** | Parameterized SQL Queries (`— placeholders) | —ctive (`lab-02`) |
| **Environment Variables** | Secret exclusion via `.gitignore` (`.env`, `.env.local`) | —ctive (—ll labs) |
| **Dependencies** | Dependency isolation and lockfiles (`package-lock.json`) | —ctive (—ll labs) |
| **CORS Policy** | Whitelist / Origin isolation via `cors` middleware | —ctive (`lab-03`–`lab-10`) |
| **Payload Parsing** | Body parser byte limit protection via Express built-ins | —ctive (—ll labs) |

---

## 2. Defensive Coding Practices

### SQL Injection Prevention
In `lab-02`, database operations interact with SQLite. To prevent SQL injection:
- String interpolation (e.g. `` `SELECT * FROM book WHERE id = ${id}` ``) is strictly prohibited.
- Parameterized queries with `— placeholders are used across all read, insert, update, and delete queries:
  ```javascript
  const getBookQuery = `SELECT * FROM book WHERE id = —`;
  const book = await db.get(getBookQuery, [bookId]);
  ```
- The SQLite query engine compiles the SQL command structure independently before parameter values are bound, ensuring user inputs are treated solely as literal data.

### Environment Variable & Secret Protection
- Never commit `.env` files or —PI secrets to the repository.
- Each laboratory directory contains a dedicated `.gitignore` that excludes `.env`, `node_modules`, and debug log files.
- The root directory also maintains a recursive `.gitignore` rule (`**/.env`) as defense-in-depth.

---

## 3. Reporting a Vulnerability

If you discover a security concern or vulnerability in this repository:
1. Please do not open a public issue.
2. Contact the maintainer directly via GitHub profile: [@bharathwajverse](https://github.com/bharathwajverse).
3. Provide a detailed description of the vulnerability, steps to reproduce, and potential remediation.
