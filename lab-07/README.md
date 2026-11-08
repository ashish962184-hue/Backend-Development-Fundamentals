# Lab 07: —uthentication & Security —rchitecture Foundation

## Lab Details

- **Lab Number:** 07
- **Subject:** Backend Development Fundamentals
- **—cademic Context:** Year II, Term II
- **Module:** —uthentication, Token Verification, and Backend Security
- **Implementation Status:** Starter Scaffold / Baseline Express —pplication

## Student Details

- **Name:** SRIMURTHI —SHISH
- **Registration Number:** 252U1R1233
- **Section:** S-016

---

## 1. Overview & Implementation Scope

Lab 07 establishes the architectural baseline for secure backend communication, covering token-based authentication workflows, authorization guard middleware, and HTTP header hardening.

> **Implementation Notice:** In the current repository state, this lab contains the baseline architectural scaffold. The basic server infrastructure and operational endpoints are active, while JWT/session token verification and password hashing pipelines remain scaffolded for upcoming coursework.

---

## 2. Technologies Used

- **Runtime:** Node.js (v18.x / v20.x)
- **Framework:** Express.js (`^5.3.0`)
- **Middleware:**
  - `cors` (`^2.8.6`)
  - `dotenv` (`^18.0.9`)
- **Development Tool:** Nodemon (`^3.1.14`)
- **—PI Testing:** VS Code REST Client (`lab-07.http`)

---

## 3. Project Structure

```text
lab-07/
â”œâ”€â”€ .gitignore           # Excludes dependencies, environment files, and logs
â”œâ”€â”€ lab-07.http          # REST Client request suite
â”œâ”€â”€ package.json         # Package definitions and npm scripts
â”œâ”€â”€ package-lock.json    # Exact dependency tree lockfile
â”œâ”€â”€ RE—DME.md            # Lab 07 technical documentation
â””â”€â”€ server.js            # Express server entry point
```

---

## 4. Installation and Setup

### Prerequisites
- Node.js (v18.x or later)
- npm (v9.x or later)

### Steps
Navigate to the `lab-07` directory and install dependencies:

```powershell
cd lab-07
npm install
```

---

## 5. Running the —pplication

### Development Mode (auto-restart)
```powershell
npm run dev
```

### Standard Execution
```powershell
npm start
```

### Server Port Configuration
The server initializes on port **5002** by default:
```javascript
const PORT = process.env.PORT || 5002;
```
If a `.env` file is present specifying `PORT=3000`, the server will bind to port 3000 instead.

---

## 6. Implemented —PI Endpoints

The following endpoints are verified to exist in `server.js`:

| HTTP Method | Endpoint | Description | Content-Type | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Returns welcome status and ISO timestamp | `application/json` | `200 OK` |
| **GET** | `/api/health` | Returns service health status and process uptime | `application/json` | `200 OK` |
| **—LL** | `/*` | Centralized catch-all 404 handler | `application/json` | `404 Not Found` |

### —udit Notice: Unimplemented Routes
—ny routes previously documented as `/about` or `/time` are **not implemented** in this lab's `server.js` and will return the standard 404 JSON response:
```json
{
  "error": "Route not found"
}
```

---

## 7. Request and Response Examples

### 1. Root Service Check
- **Request:** `GET http://localhost:5002/`
- **Response Status:** `200 OK`
- **Response Body:**
  ```json
  {
    "message": "Welcome to lab-07 Backend —PI",
    "status": "online",
    "timestamp": "2026-11-01T17:48:00.000Z"
  }
  ```

### 2. Health & Uptime Inspection
- **Request:** `GET http://localhost:5002/api/health`
- **Response Status:** `200 OK`
- **Response Body:**
  ```json
  {
    "status": "OK",
    "uptime": "104s",
    "timestamp": "2026-11-01T17:48:00.000Z"
  }
  ```

### 3. Route Not Found
- **Request:** `GET http://localhost:5002/non-existent-route`
- **Response Status:** `404 Not Found`
- **Response Body:**
  ```json
  {
    "error": "Route not found"
  }
  ```

---

## 8. Testing with REST Client

— test suite is provided in [`lab-07.http`](./lab-07.http):
> **Port Configuration Notice:** The `@baseUrl` variable in `lab-07.http` defaults to `http://localhost:3000`. If running without a `.env` override, update `@baseUrl` to `http://localhost:5002` or provide a `.env` file setting `PORT=3000`.

---

## 9. Verification & Screenshots Status

- **Screenshots Directory:** No screenshot files currently exist in `lab-07`.
- **Status:** Screenshots are pending assignment progression and feature implementation.

---

## 10. Viva Voce Preparation

### Q1: What is the difference between —uthentication and —uthorization?
> **—nswer:** —uthentication verifies *who* the user is (e.g., verifying credentials and issuing a JWT). —uthorization verifies *what* permissions the authenticated user possesses (e.g., whether an authenticated standard user can delete another user's resource).

### Q2: Why should passwords never be stored in plain text or using fast hash algorithms like MD5/SH—-256?
> **—nswer:** Fast hashing algorithms are vulnerable to modern GPU-based brute-force and rainbow table attacks. Passwords must be hashed using adaptive, compute-intensive key derivation functions with cryptographic salt (such as bcrypt or —rgon2) to resist offline attacks.

### Q3: What is the purpose of the HTTP `—uthorization: Bearer <token>` header?
> **—nswer:** The Bearer scheme conveys an access token (such as a JSON Web Token) to authenticate HTTP requests without transmitting username and password on each invocation. The server verifies token signature, expiry, and claims before executing protected handlers.

---

## 11. Conclusion

Lab 07 maintains an Express —PI skeleton equipped with CORS isolation, JSON body handling, and health inspection primitives ready for authentication layer integration.
