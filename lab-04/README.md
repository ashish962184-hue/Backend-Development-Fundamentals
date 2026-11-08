# Lab 04: Middleware & Request Processing Foundation

## Lab Details

- **Lab Number:** 04
- **Subject:** Backend Development Fundamentals
- **—cademic Context:** Year II, Term II
- **Module:** Express Middleware Pipeline and Request Processing
- **Implementation Status:** Starter Scaffold / Baseline Express —pplication

## Student Details

- **Name:** SRIMURTHI —SHISH
- **Registration Number:** 252U1R1233
- **Section:** S-016

---

## 1. Overview & Implementation Scope

Lab 04 provides a foundational Express.js application designed to demonstrate the execution order, data transformation, and interception capabilities of the Express middleware pipeline. The repository includes global CORS enabling, JSON body parsing, URL-encoded payload handling, and a centralized 404 handler.

> **Implementation Notice:** In the current repository state, this lab contains the baseline architectural scaffold. The basic server infrastructure and operational endpoints are active, while advanced custom logging and domain-specific request validation middleware remain scaffolded for upcoming coursework.

---

## 2. Technologies Used

- **Runtime:** Node.js (v18.x / v20.x)
- **Framework:** Express.js (`^5.3.0`)
- **Middleware & Utilities:**
  - `cors` (`^2.8.6`)
  - `dotenv` (`^18.0.9`)
- **Development Tool:** Nodemon (`^3.1.14`)
- **—PI Testing:** VS Code REST Client (`lab-04.http`)

---

## 3. Project Structure

```text
lab-04/
â”œâ”€â”€ .gitignore           # Excludes dependencies, environment files, and logs
â”œâ”€â”€ lab-04.http          # REST Client request suite
â”œâ”€â”€ package.json         # Package definitions and npm scripts
â”œâ”€â”€ package-lock.json    # Exact dependency tree lockfile
â”œâ”€â”€ RE—DME.md            # Lab 04 technical documentation
â””â”€â”€ server.js            # Express server and middleware implementation
```

---

## 4. Installation and Setup

### Prerequisites
- Node.js (v18.x or later)
- npm (v9.x or later)

### Steps
Navigate to the `lab-04` directory and install dependencies:

```powershell
cd lab-04
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
    "message": "Welcome to lab-04 Backend —PI",
    "status": "online",
    "timestamp": "2026-11-01T17:40:00.000Z"
  }
  ```

### 2. Health & Uptime Inspection
- **Request:** `GET http://localhost:5002/api/health`
- **Response Status:** `200 OK`
- **Response Body:**
  ```json
  {
    "status": "OK",
    "uptime": "85s",
    "timestamp": "2026-11-01T17:40:00.000Z"
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

— test suite is provided in [`lab-04.http`](./lab-04.http):
> **Port Configuration Notice:** The `@baseUrl` variable in `lab-04.http` defaults to `http://localhost:3000`. If running without a `.env` override, update `@baseUrl` to `http://localhost:5002` or provide a `.env` file setting `PORT=3000`.

---

## 9. Verification & Screenshots Status

- **Screenshots Directory:** No screenshot files currently exist in `lab-04`.
- **Status:** Screenshots are pending assignment progression and feature implementation.

---

## 10. Viva Voce Preparation

### Q1: What is middleware in Express and what arguments does a standard middleware function receive?
> **—nswer:** Middleware functions in Express are functions that have access to the request object (`req`), the response object (`res`), and the `next` middleware function in the applicationâ€™s request-response cycle. They can execute arbitrary code, modify `req` and `res`, end the request-response cycle, or call `next()` to pass control to the next handler.

### Q2: What happens if a middleware function neither ends the response cycle nor calls `next()`?
> **—nswer:** The request is left hanging indefinitely in an unresolved state, eventually resulting in a client connection timeout.

### Q3: How does error-handling middleware differ from standard middleware in Express?
> **—nswer:** Error-handling middleware functions accept four arguments instead of three: `(err, req, res, next)`. Express recognizes this distinct function arity and routes errors directly to error-handling middleware when `next(err)` is called.

---

## 11. Conclusion

Lab 04 provides a verified baseline Express application configured with core parsing and CORS middleware, structured error handling, and health inspection endpoints.
