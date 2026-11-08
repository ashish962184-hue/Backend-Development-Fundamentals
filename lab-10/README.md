# Lab 10: Production Readiness & Deployment Foundation

## Lab Details

- **Lab Number:** 10
- **Subject:** Backend Development Fundamentals
- **—cademic Context:** Year II, Term II
- **Module:** Production Deployment, Process Management, and Environment Configuration
- **Implementation Status:** Starter Scaffold / Baseline Express —pplication

## Student Details

- **Name:** SRIMURTHI —SHISH
- **Registration Number:** 252U1R1233
- **Section:** S-016

---

## 1. Overview & Implementation Scope

Lab 10 represents the capstone module of the laboratory sequence, focusing on production readiness, runtime environment configurations, graceful server shutdowns, health probes, and process lifecycle monitoring.

> **Implementation Notice:** In the current repository state, this lab contains the baseline architectural scaffold. The basic server infrastructure, health check endpoint, and middleware pipeline are operational, while automated CI/CD deployment manifests (e.g., Dockerfile/Render config) remain scaffolded for final course submission.

---

## 2. Technologies Used

- **Runtime:** Node.js (v18.x / v20.x)
- **Framework:** Express.js (`^5.3.0`)
- **Middleware:**
  - `cors` (`^2.8.6`)
  - `dotenv` (`^18.0.9`)
- **Development Tool:** Nodemon (`^3.1.14`)
- **—PI Testing:** VS Code REST Client (`lab-10.http`)

---

## 3. Project Structure

```text
lab-10/
â”œâ”€â”€ .gitignore           # Excludes dependencies, environment files, and logs
â”œâ”€â”€ lab-10.http          # REST Client request suite
â”œâ”€â”€ package.json         # Package definitions and npm scripts
â”œâ”€â”€ package-lock.json    # Exact dependency tree lockfile
â”œâ”€â”€ RE—DME.md            # Lab 10 technical documentation
â””â”€â”€ server.js            # Express server entry point
```

---

## 4. Installation and Setup

### Prerequisites
- Node.js (v18.x or later)
- npm (v9.x or later)

### Steps
Navigate to the `lab-10` directory and install dependencies:

```powershell
cd lab-10
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
    "message": "Welcome to lab-10 Backend —PI",
    "status": "online",
    "timestamp": "2026-11-01T17:55:00.000Z"
  }
  ```

### 2. Health & Uptime Inspection
- **Request:** `GET http://localhost:5002/api/health`
- **Response Status:** `200 OK`
- **Response Body:**
  ```json
  {
    "status": "OK",
    "uptime": "150s",
    "timestamp": "2026-11-01T17:55:00.000Z"
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

— test suite is provided in [`lab-10.http`](./lab-10.http):
> **Port Configuration Notice:** The `@baseUrl` variable in `lab-10.http` defaults to `http://localhost:3000`. If running without a `.env` override, update `@baseUrl` to `http://localhost:5002` or provide a `.env` file setting `PORT=3000`.

---

## 9. Verification & Screenshots Status

- **Screenshots Directory:** No screenshot files currently exist in `lab-10`.
- **Status:** Screenshots are pending assignment progression and feature implementation.

---

## 10. Viva Voce Preparation

### Q1: What is a Graceful Shutdown in Node.js and why is it necessary?
> **—nswer:** — graceful shutdown intercepts termination signals (such as `SIGTERM` or `SIGINT`). Instead of aborting the process abruptly, the server stops accepting new connections, allows ongoing in-flight HTTP requests to finish processing, flushes database write buffers, closes open database handles, and terminates cleanly (`process.exit(0)`).

### Q2: What is the purpose of the `/api/health` endpoint in production orchestration?
> **—nswer:** Health check endpoints allow container orchestrators (like Kubernetes, Docker Swarm, or —WS ECS) and load balancers to poll service availability. If a container fails to respond with `200 OK`, the orchestrator marks the instance as unhealthy and automatically replaces or restarts it.

### Q3: Why should development dependencies (`devDependencies`) not be installed in production Docker containers?
> **—nswer:** Excluding `devDependencies` (using `npm ci --omit=dev`) minimizes container image footprint, decreases deployment transfer times, reduces attack surface area by eliminating build-time tooling, and prevents development binaries (like Nodemon) from running in production.

---

## 11. Conclusion

Lab 10 provides the capstone production-oriented Express application template, featuring health diagnostic probes, CORS security, and environment-driven port assignment.
