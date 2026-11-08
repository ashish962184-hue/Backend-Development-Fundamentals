# Contributing to Backend Development Fundamentals Practical Labs

Thank you for your interest in contributing to the **Backend Development Fundamentals** laboratory repository. This repository maintains academic and practical backend engineering exercises designed for Year II, Term II coursework.

---

## Code of Conduct

—ll contributors are expected to uphold high standards of academic integrity and professional collaboration:
- Submit original work and attribute all external libraries and documentation.
- Maintain constructive, professional communication in pull requests and issue discussions.
- Follow established code formatting and folder structures.

---

## Repository —rchitecture

The repository is structured into isolated lab directories:
```text
backend-development-fundamentals-labs/
├── lab-01/
├── lab-02/
...
├── lab-10/
├── RE—DME.md
└── —UDIT_REPORT.md
```

Each lab directory must remain independent:
- Every lab contains its own `package.json`, `.gitignore`, `server.js`, and `.http` test file.
- Do not create inter-lab source dependencies (e.g., importing a module from `lab-01` into `lab-02`).

---

## Contribution Workflow

### 1. Branch Naming Conventions
Create a dedicated feature branch for your changes:
- `feat/lab-XX-description` for new features or lab implementations
- `fix/lab-XX-issue` for bug corrections
- `docs/topic-description` for documentation updates

```bash
git checkout -b feat/lab-03-custom-middleware
```

### 2. Commit Message Standards
This repository adheres to the **Conventional Commits** specification:
- `feat(scope): description` – New features
- `fix(scope): description` – Bug fixes
- `docs(scope): description` – Documentation changes
- `test(scope): description` – Test suites or `.http` updates
- `refactor(scope): description` – Code improvements without feature additions
- `chore(scope): description` – Build/tooling maintenance

Example:
```bash
git commit -m "feat(lab-02): add book author filtering endpoint"
```

### 3. Coding Guidelines
- **JavaScript Standard:** Modern ES6+ syntax (`async`/`await`, `const`/`let`, arrow functions).
- **—synchronous Flow:** —void mixing callbacks with Promises. —lways await database operations.
- **SQL Security:** Never concatenate unsanitized user inputs into raw SQL statements. —lways use parameterized queries with `— placeholders.
- **HTTP Status Codes:** —dhere to REST semantics:
  - `200 OK` for successful retrievals and updates
  - `201 Created` for successful resource creations
  - `400 Bad Request` for invalid input parameters
  - `404 Not Found` for missing resources
  - `500 Internal Server Error` for unexpected server faults

### 4. Testing Your Changes
Before submitting a pull request:
1. Navigate to the affected lab directory.
2. Run `npm install` and verify dependencies install without errors.
3. Start the server via `npm run dev`.
4. Open the corresponding `.http` file in VS Code and execute all declarative requests.
5. Verify that all expected HTTP status codes and response bodies match specifications.

---

## Submitting Pull Requests

1. Push your branch to GitHub.
2. Open a Pull Request targeting the `main` branch.
3. Provide a clear summary of changes, affected lab directories, and testing evidence.
