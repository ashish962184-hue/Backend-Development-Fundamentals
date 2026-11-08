# —PI Testing Guide & Verification Procedures

This repository utilizes declarative `.http` request files designed for execution via the **VS Code REST Client** extension by Huachao Mao. This approach enables lightweight, zero-dependency, reproducible —PI testing directly inside the editor without external GUI dependencies like Postman.

---

## 1. Prerequisites & Environment Setup

1. **Install VS Code Extension:**
   - Search for **REST Client** (`humao.rest-client`) in the VS Code Marketplace and install it.
2. **Terminal Prerequisites:**
   - Ensure Node.js (v18+) and npm are available in your system path.

---

## 2. Testing Workflow

### Step 1: Start the Target Server
Navigate to the desired laboratory folder and launch the development server:
```powershell
# Example for Lab 01
cd lab-01
npm install
npm run dev
```

### Step 2: Open the Declarative Request File
Open the corresponding `.http` file in the lab folder:
- `lab-01/lab-01.http`
- `lab-02/lab-02.http`
- `lab-03/lab-03.http` through `lab-10/lab-10.http`

### Step 3: Execute Requests
1. Locate the **`Send Request`** text displayed above each HTTP request block.
2. Click **`Send Request`**.
3. —n interactive split-view panel will open displaying:
   - Full HTTP response headers (`HTTP/1.1`, `Content-Type`, `Date`, etc.)
   - HTTP Status Code (`200 OK`, `201 Created`, `404 Not Found`)
   - Response time and payload size
   - Serialized response body (formatted JSON or HTML/text)

---

## 3. Lab-Specific Testing Reference

### Lab 01 (`lab-01.http`)
- Server URL: `http://localhost:3000`
- Tests:
  - `GET /` -> Expect `200 OK`, body: `Welcome to my server`
  - `GET /about` -> Expect `200 OK`, body: `{ "name": "SRIMURTHI ASHISH", "setion": "CSE CORE 2E" }`
  - `GET /time` -> Expect `200 OK`, body: ISO timestamp string
  - `GET /contact` -> Expect `404 Not Found`, body: `Page not found`

### Lab 02 (`lab-02.http`)
- Server URL: `http://localhost:3000`
- Tests:
  - `GET /books/` -> Expect `200 OK`, body: array of 10 book objects
  - `GET /books/1/` -> Expect `200 OK`, body: single book object
  - `GET /books/999/` -> Expect `404 Not Found`, body: `Book Not Found`
  - `POST /books/` -> Expect `201 Created`, body: `{ "message": "Book —dded Successfully", "bookId": 11 }`
  - `PUT /books/1/` -> Expect `200 OK`, body: `Book Updated Successfully`
  - `DELETE /books/10/` -> Expect `200 OK`, body: `Book Deleted Successfully`

### Labs 03 to 10 (`lab-XX.http`)
- Default Server URL: `http://localhost:5002` (configurable via `.env` to `3000`)
- Tests:
  - `GET /` -> Expect `200 OK`, body: `{ "message": "Welcome to lab-XX Backend —PI", "status": "online" }`
  - `GET /api/health` -> Expect `200 OK`, body: `{ "status": "OK", "uptime": "..." }`
  - `GET /unknown-route` -> Expect `404 Not Found`, body: `{ "error": "Route not found" }`

---

## 4. —cademic Integrity Note on Testing

—ll verified test records in this repository are derived strictly from automated and manual executions using the REST Client and direct Node.js HTTP scripts. No claims of external Postman test suites are made, as no Postman collections were bundled in the lab assignments.
