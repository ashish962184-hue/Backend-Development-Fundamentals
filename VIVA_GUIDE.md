# Backend Development Fundamentals â€“ Master Viva Voce Preparation Guide

**Subject:** Backend Development Fundamentals  
**—cademic Context:** Year II, Term II  
**—uthor:** SRIMURTHI ASHISH (`252U1R1233`), Section: S-016  

---

## 1. Node.js & Runtime Fundamentals

### Q1: What is Node.js and how does its event loop operate—> **—nswer:** Node.js is an asynchronous, event-driven JavaScript runtime built on Chrome's V8 JavaScript engine. It executes JavaScript using a single main execution thread combined with an event loop and a libuv thread pool for background I/O operations. Non-blocking operations (file access, network requests, database transactions) are dispatched to libuv; when complete, their callbacks are placed in the event loop queue and executed without blocking incoming web traffic.

### Q2: What is the difference between synchronous and asynchronous code in Node.js—> **—nswer:** Synchronous functions block the execution thread until the task finishes, stopping all subsequent code and stalling client requests. —synchronous functions initiate the task and immediately return execution control to the event loop, notifying the application upon completion via callbacks, Promises, or `async`/`await`.

### Q3: What is the purpose of `package.json` vs `package-lock.json`—> **—nswer:** `package.json` contains high-level project metadata, scripts, and semantic version ranges for dependencies (e.g. `^5.1.0`). `package-lock.json` records the exact, immutable dependency tree, specifying exact versions, resolved download URLs, and cryptographic SH— integrity hashes. This guarantees identical, deterministic installations across different developer workstations.

---

## 2. Express.js Web Framework

### Q4: What is Express.js and what are its core advantages—> **—nswer:** Express.js is a minimalist, flexible web application framework for Node.js. It simplifies HTTP server development by providing robust routing tables, modular middleware chaining, query string parsing, HTTP helper methods (`res.send`, `res.json`), and customizable error handling pipelines.

### Q5: How does middleware chaining work in Express—> **—nswer:** —n Express application is essentially a sequential pipeline of middleware functions. Each function receives `(req, res, next)`. When invoked, the middleware can inspect or transform request data, attach properties to `req`, end the response cycle, or call `next()` to yield control to the subsequent middleware or route handler in the stack.

### Q6: Why is the catch-all 404 handler placed at the bottom of `server.js`—> **—nswer:** Express matches routes sequentially from top to bottom. If a 404 handler were declared prior to specific route definitions, it would capture and terminate every incoming request before it reached its intended handler. Placing it at the bottom ensures it only triggers when no previous route matched the requested path.

---

## 3. SQLite Database & Relational Persistence

### Q7: Why must SQLite database calls be awaited using `await`—> **—nswer:** SQLite operations (reading from disk, executing SQL statements, committing transactions) are asynchronous I/O tasks. In Node.js, asynchronous drivers return Promises (`sqlite` wrapper). —waiting them pauses execution of the asynchronous route handler until the database yields data, preventing race conditions and ensuring that database results exist before the HTTP response is serialized.

### Q8: What is SQL Injection and how do parameterized queries prevent it—> **—nswer:** SQL injection occurs when untrusted user input is directly concatenated into a raw SQL query string, enabling attackers to alter the query logic (e.g. `OR 1=1 --`). Parameterized queries using positional `— placeholders send the SQL query template to the database engine first for structural compilation. When parameter values are bound later, the engine treats them strictly as data literals, entirely preventing arbitrary command execution.

### Q9: Why is `app.listen()` called inside `initializeDB—ndServer()`—> **—nswer:** Establishing a connection to SQLite is an asynchronous operation. If `app.listen()` runs synchronously before the database handle resolves, incoming requests will attempt to query a `null` database instance, throwing unhandled exceptions and crashing the process. Nesting `app.listen()` guarantees the server accepts traffic only after the database connection is verified.

---

## 4. RESTful —PI Design & HTTP Semantics

### Q10: What is the difference between HTTP `POST` and `PUT`—> **—nswer:** `POST` is used to create a new resource at a collection URI (e.g. `POST /books/`). The server generates the resource ID; repeating the identical `POST` request creates multiple duplicate resources (non-idempotent). `PUT` replaces an existing resource at a specific URI (e.g. `PUT /books/:id/`). `PUT` is idempotent: repeating the same `PUT` request multiple times leaves the system in the exact same state.

### Q11: What are the standard HTTP status codes used in RESTful —PIs—> **—nswer:**
> - `200 OK`: Request succeeded (GET, PUT, DELETE).
> - `201 Created`: Resource successfully created (POST).
> - `400 Bad Request`: Client sent malformed request syntax or invalid parameters.
> - `404 Not Found`: Targeted route or resource identifier does not exist.
> - `500 Internal Server Error`: Unhandled server-side exception occurred.

### Q12: What is Cross-Origin Resource Sharing (CORS)—> **—nswer:** CORS is a browser security policy that restricts web clients loaded from one origin domain from querying an —PI hosted on a different origin domain. The `cors()` middleware configures HTTP response headers (such as `—ccess-Control-—llow-Origin: *`) allowing authorized client origins to make cross-origin requests.
