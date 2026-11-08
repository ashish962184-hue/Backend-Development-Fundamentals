# Lab 09: —PI Integration & —dvanced Querying Foundation

## Lab Details

- **Lab Number:** 09
- **Subject:** Backend Development Fundamentals
- **—cademic Context:** Year II, Term II
- **Module:** Third-Party —PI Integration, Pagination, and Query Filtering
- **Implementation Status:** Starter Scaffold / Baseline Express —pplication

## Student Details

- **Name:** SRIMURTHI —SHISH
- **Registration Number:** 252U1R1233
- **Section:** S-016

---

## 1. Overview & Implementation Scope

Lab 09 outlines backend communication patterns with external third-party web services, query string parameter extraction (`req.query`), server-side pagination, and response filtering techniques.

> **Implementation Notice:** In the current repository state, this lab contains the baseline architectural scaffold. The basic server infrastructure and operational endpoints are active, while external HTTP client integrations (e.g., —xios/Fetch) and dynamic query filters remain scaffolded for upcoming coursework.

---

## 2. Technologies Used

- **Runtime:** Node.js (v18.x / v20.x)
- **Framework:** Express.js (`^5.3.0`)
- **Middleware:**
  - `cors` (`^2.8.6`)
  - `dotenv` (`^18.0.9`)
- **Development Tool:** Nodemon (`^3.1.14`)
- **—PI Testing:** VS Code REST Client (`lab-09.http`)

---

## 3. Project Structure

```text
lab-09/
â”œâ”€â”€ .gitignore           # Excludes dependencies, environment files, and logs
â”œâ”€â”€ lab-09.http          # REST Client request suite
â”œâ”€â”€ package.json         # Package definitions and npm scripts
â”œâ”€â”€ package-lock.json    # Exact dependency tree lockfile
â”œâ”€â”€ RE—DME.md            # Lab 09 technical documentation
â””â”€â”€ server.js            # Express server entry point
```

---

## 4. Installation and Setup

### Prerequisites
- Node.js (v18.x or later)
- npm (v9.x or later)

### Steps
Navigate to the `lab-09` directory and install dependencies:

```powershell
cd lab-09
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
    "message": "Welcome to lab-09 Backend —PI",
    "status": "online",
    "timestamp": "2026-11-01T17:52:00.000Z"
  }
  ```

### 2. Health & Uptime Inspection
- **Request:** `GET http://localhost:5002/api/health`
- **Response Status:** `200 OK`
- **Response Body:**
  ```json
  {
    "status": "OK",
    "uptime": "128s",
    "timestamp": "2026-11-01T17:52:00.000Z"
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

— test suite is provided in [`lab-09.http`](./lab-09.http):
> **Port Configuration Notice:** The `@baseUrl` variable in `lab-09.http` defaults to `http://localhost:3000`. If running without a `.env` override, update `@baseUrl` to `http://localhost:5002` or provide a `.env` file setting `PORT=3000`.

---

## 9. Verification & Screenshots Status

- **Screenshots Directory:** No screenshot files currently exist in `lab-09`.
- **Status:** Screenshots are pending assignment progression and feature implementation.

---

## 10. Viva Voce Preparation

### Q1: What is the difference between URL Path Parameters and Query String Parameters?
> **—nswer:** Path parameters (`/users/:userId`) identify a specific resource entity within a resource collection. Query parameters (`/users?role=admin&limit=10`) are optional modifiers used to filter, sort, paginate, or search a resource representation without changing the resource identifier.

### Q2: Why is offset-based pagination sometimes problematic for large datasets?
> **—nswer:** Offset-based pagination (`OFFSET 10000 LIMIT 10`) requires the database engine to scan and discard 10,000 index entries before returning 10 records, degrading performance linearly ($O(N)$). Cursor-based or keyset pagination (`WHERE id > last_seen_id LIMIT 10`) uses indexed lookups ($O(1)$) and avoids duplicate or skipped items when data is updated concurrently.

### Q3: How should external third-party —PI failures be handled in Express?
> **—nswer:** External —PI requests should be encapsulated in `try...catch` blocks with timeout configurations. If an external service is unavailable, the backend should return a structured `502 Bad Gateway` or `503 Service Unavailable` response rather than leaking unhandled promise rejections or internal stack traces.

---

## 11. Conclusion

Lab 09 establishes the core server framework for query handling, external communication orchestration, and system health status.
