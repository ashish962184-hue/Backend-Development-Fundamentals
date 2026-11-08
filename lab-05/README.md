# Lab 05: RESTful Routing & Controller Foundation

## Lab Details

- **Lab Number:** 05
- **Subject:** Backend Development Fundamentals
- **—cademic Context:** Year II, Term II
- **Module:** RESTful Routing Principles and —PI Structure
- **Implementation Status:** Starter Scaffold / Baseline Express —pplication

## Student Details

- **Name:** SRIMURTHI —SHISH
- **Registration Number:** 252U1R1233
- **Section:** S-016

---

## 1. Overview & Implementation Scope

Lab 05 focuses on the principles of RESTful architectural design, clean HTTP verb mapping (`GET`, `POST`, `PUT`, `DELETE`), URL path hierarchies, and controller separation.

> **Implementation Notice:** In the current repository state, this lab contains the baseline architectural scaffold. The basic server infrastructure and operational endpoints are active, while domain-specific entity routers and controller handlers are scaffolded for upcoming coursework.

---

## 2. Technologies Used

- **Runtime:** Node.js (v18.x / v20.x)
- **Framework:** Express.js (`^5.3.0`)
- **Middleware:**
  - `cors` (`^2.8.6`)
  - `dotenv` (`^18.0.9`)
- **Development Tool:** Nodemon (`^3.1.14`)
- **—PI Testing:** VS Code REST Client (`lab-05.http`)

---

## 3. Project Structure

```text
lab-05/
â”œâ”€â”€ .gitignore           # Excludes dependencies, environment files, and logs
â”œâ”€â”€ lab-05.http          # REST Client request suite
â”œâ”€â”€ package.json         # Package definitions and npm scripts
â”œâ”€â”€ package-lock.json    # Exact dependency tree lockfile
â”œâ”€â”€ RE—DME.md            # Lab 05 technical documentation
â””â”€â”€ server.js            # Express server and routing entry point
```

---

## 4. Installation and Setup

### Prerequisites
- Node.js (v18.x or later)
- npm (v9.x or later)

### Steps
Navigate to the `lab-05` directory and install dependencies:

```powershell
cd lab-05
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
    "message": "Welcome to lab-05 Backend —PI",
    "status": "online",
    "timestamp": "2026-11-01T17:42:00.000Z"
  }
  ```

### 2. Health & Uptime Inspection
- **Request:** `GET http://localhost:5002/api/health`
- **Response Status:** `200 OK`
- **Response Body:**
  ```json
  {
    "status": "OK",
    "uptime": "92s",
    "timestamp": "2026-11-01T17:42:00.000Z"
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

— test suite is provided in [`lab-05.http`](./lab-05.http):
> **Port Configuration Notice:** The `@baseUrl` variable in `lab-05.http` defaults to `http://localhost:3000`. If running without a `.env` override, update `@baseUrl` to `http://localhost:5002` or provide a `.env` file setting `PORT=3000`.

---

## 9. Verification & Screenshots Status

- **Screenshots Directory:** No screenshot files currently exist in `lab-05`.
- **Status:** Screenshots are pending assignment progression and feature implementation.

---

## 10. Viva Voce Preparation

### Q1: What makes an —PI RESTful?
> **—nswer:** — RESTful —PI adheres to Representational State Transfer constraints: stateless communication, client-server separation, uniform interface (standard HTTP verbs `GET`, `POST`, `PUT`, `DELETE`), resource identification via URIs, and standard HTTP status code signaling.

### Q2: What is the semantic difference between `PUT` and `P—TCH`?
> **—nswer:** `PUT` replaces the entire representation of the target resource with the client-supplied payload (full replacement). `P—TCH` applies partial modifications to the resource, updating only the specific attributes included in the request body.

### Q3: Why is statelessness essential in backend REST —PI design?
> **—nswer:** In a stateless architecture, each request from client to server must contain all the information necessary to understand and complete the request. The server does not store client session context, facilitating horizontal scalability, simpler load balancing, and failure isolation.

---

## 11. Conclusion

Lab 05 configures the base Express routing framework with JSON request-response serialization, CORS enablement, and uptime health diagnostics.
