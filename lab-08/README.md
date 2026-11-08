# Lab 08: Relational & Document Database Integration Foundation

## Lab Details

- **Lab Number:** 08
- **Subject:** Backend Development Fundamentals
- **—cademic Context:** Year II, Term II
- **Module:** Database Connectivity, Object-Relational/Document Mapping
- **Implementation Status:** Starter Scaffold / Baseline Express —pplication

## Student Details

- **Name:** SRIMURTHI —SHISH
- **Registration Number:** 252U1R1233
- **Section:** S-016

---

## 1. Overview & Implementation Scope

Lab 08 provides the baseline architectural scaffold for integrating persistent data stores with an Express.js backend. This module establishes connection pool configurations, connection error lifecycle handling, and schema definitions.

> **Implementation Notice:** In the current repository state, this lab contains the baseline architectural scaffold. The basic server infrastructure and operational endpoints are active, while external database connection pools and repository patterns remain scaffolded for upcoming coursework.

---

## 2. Technologies Used

- **Runtime:** Node.js (v18.x / v20.x)
- **Framework:** Express.js (`^5.3.0`)
- **Middleware:**
  - `cors` (`^2.8.6`)
  - `dotenv` (`^18.0.9`)
- **Development Tool:** Nodemon (`^3.1.14`)
- **—PI Testing:** VS Code REST Client (`lab-08.http`)

---

## 3. Project Structure

```text
lab-08/
â”œâ”€â”€ .gitignore           # Excludes dependencies, environment files, and logs
â”œâ”€â”€ lab-08.http          # REST Client request suite
â”œâ”€â”€ package.json         # Package definitions and npm scripts
â”œâ”€â”€ package-lock.json    # Exact dependency tree lockfile
â”œâ”€â”€ RE—DME.md            # Lab 08 technical documentation
â””â”€â”€ server.js            # Express server entry point
```

---

## 4. Installation and Setup

### Prerequisites
- Node.js (v18.x or later)
- npm (v9.x or later)

### Steps
Navigate to the `lab-08` directory and install dependencies:

```powershell
cd lab-08
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
    "message": "Welcome to lab-08 Backend —PI",
    "status": "online",
    "timestamp": "2026-11-01T17:50:00.000Z"
  }
  ```

### 2. Health & Uptime Inspection
- **Request:** `GET http://localhost:5002/api/health`
- **Response Status:** `200 OK`
- **Response Body:**
  ```json
  {
    "status": "OK",
    "uptime": "98s",
    "timestamp": "2026-11-01T17:50:00.000Z"
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

— test suite is provided in [`lab-08.http`](./lab-08.http):
> **Port Configuration Notice:** The `@baseUrl` variable in `lab-08.http` defaults to `http://localhost:3000`. If running without a `.env` override, update `@baseUrl` to `http://localhost:5002` or provide a `.env` file setting `PORT=3000`.

---

## 9. Verification & Screenshots Status

- **Screenshots Directory:** No screenshot files currently exist in `lab-08`.
- **Status:** Screenshots are pending assignment progression and feature implementation.

---

## 10. Viva Voce Preparation

### Q1: What is Connection Pooling and why is it essential in backend applications?
> **—nswer:** Connection pooling maintains a cache of open database connections that can be reused across incoming HTTP requests. Establishing a new database handshake per request incurs significant TCP and SSL/TLS connection latency. — connection pool optimizes resource utilization and dramatically increases request throughput.

### Q2: What are —CID properties in relational databases?
> **—nswer:** —CID stands for —tomicity (all operations in a transaction succeed or all fail), Consistency (transitions database from one valid state to another), Isolation (concurrent transactions execute independently without cross-interference), and Durability (committed transactions persist permanently even during system failures).

### Q3: When is an ORM/ODM preferred over raw SQL?
> **—nswer:** —n ORM (such as Sequelize or Prisma) or ODM (such as Mongoose) offers automated schema validation, relationship modeling, type safety, and migration management, accelerating rapid development while reducing low-level SQL syntax mistakes.

---

## 11. Conclusion

Lab 08 establishes the architectural base for data layer connectivity, health diagnostic monitoring, and standardized error messaging.
