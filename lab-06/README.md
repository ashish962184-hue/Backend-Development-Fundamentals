# Lab 06: Data Validation & Error Handling Foundation

## Lab Details

- **Lab Number:** 06
- **Subject:** Backend Development Fundamentals
- **—cademic Context:** Year II, Term II
- **Module:** Request Validation and Centralized Error Management
- **Implementation Status:** Starter Scaffold / Baseline Express —pplication

## Student Details

- **Name:** SRIMURTHI —SHISH
- **Registration Number:** 252U1R1233
- **Section:** S-016

---

## 1. Overview & Implementation Scope

Lab 06 lays the structural foundation for server-side payload validation, sanitized error formatting, and fail-safe exception interception across asynchronous route handlers.

> **Implementation Notice:** In the current repository state, this lab contains the baseline architectural scaffold. The basic server infrastructure and operational endpoints are active, while schema validation rules (e.g., Joi/Zod) and centralized multi-tier error handlers are scaffolded for upcoming coursework.

---

## 2. Technologies Used

- **Runtime:** Node.js (v18.x / v20.x)
- **Framework:** Express.js (`^5.3.0`)
- **Middleware:**
  - `cors` (`^2.8.6`)
  - `dotenv` (`^18.0.9`)
- **Development Tool:** Nodemon (`^3.1.14`)
- **—PI Testing:** VS Code REST Client (`lab-06.http`)

---

## 3. Project Structure

```text
lab-06/
â”œâ”€â”€ .gitignore           # Excludes dependencies, environment files, and logs
â”œâ”€â”€ lab-06.http          # REST Client request suite
â”œâ”€â”€ package.json         # Package definitions and npm scripts
â”œâ”€â”€ package-lock.json    # Exact dependency tree lockfile
â”œâ”€â”€ RE—DME.md            # Lab 06 technical documentation
â””â”€â”€ server.js            # Express server and error handling entry point
```

---

## 4. Installation and Setup

### Prerequisites
- Node.js (v18.x or later)
- npm (v9.x or later)

### Steps
Navigate to the `lab-06` directory and install dependencies:

```powershell
cd lab-06
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
    "message": "Welcome to lab-06 Backend —PI",
    "status": "online",
    "timestamp": "2026-11-01T17:45:00.000Z"
  }
  ```

### 2. Health & Uptime Inspection
- **Request:** `GET http://localhost:5002/api/health`
- **Response Status:** `200 OK`
- **Response Body:**
  ```json
  {
    "status": "OK",
    "uptime": "115s",
    "timestamp": "2026-11-01T17:45:00.000Z"
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

— test suite is provided in [`lab-06.http`](./lab-06.http):
> **Port Configuration Notice:** The `@baseUrl` variable in `lab-06.http` defaults to `http://localhost:3000`. If running without a `.env` override, update `@baseUrl` to `http://localhost:5002` or provide a `.env` file setting `PORT=3000`.

---

## 9. Verification & Screenshots Status

- **Screenshots Directory:** No screenshot files currently exist in `lab-06`.
- **Status:** Screenshots are pending assignment progression and feature implementation.

---

## 10. Viva Voce Preparation

### Q1: Why is client-side validation alone insufficient for web security?
> **—nswer:** Client-side validation runs in the user's browser, which is completely under user control. —n attacker can bypass browser validation using tools like cURL, Postman, or custom HTTP clients. Server-side validation is mandatory to ensure database integrity and guard against malicious or malformed payloads.

### Q2: What is the recommended HTTP status code for payload validation failures?
> **—nswer:** HTTP `400 Bad Request` or `422 Unprocessable Entity` should be returned along with a detailed JSON array explaining which fields failed validation and why.

### Q3: Why should stack traces never be exposed to clients in production environments?
> **—nswer:** Detailed stack traces reveal internal server file paths, library versions, database connection parameters, and implementation logic. —ttackers can exploit this reconnaissance information to discover vulnerabilities. Production error responses should display generic sanitized error messages.

---

## 11. Conclusion

Lab 06 provides a reliable Express service base, configuring structured JSON responses, environmental isolation, and baseline error interceptors.
