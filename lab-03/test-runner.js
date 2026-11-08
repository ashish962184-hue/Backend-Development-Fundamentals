/**
 * Lab 03 Automated Integration Test Suite
 * Student: SRIMURTHI ASHISH | 252U1R1233 | S-016
 * Tests REST endpoint scenarios against an isolated temporary test database.
 */

const http = require("http");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const TEST_PORT = 5099;
const TEST_DB_PATH = path.join(__dirname, "test-database.db");

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, body: data ? JSON.parse(data) : {} });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on("error", reject);
    if (postData) {
      req.write(typeof postData === "string" ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

function cleanupTestDb() {
  try {
    if (fs.existsSync(TEST_DB_PATH)) fs.unlinkSync(TEST_DB_PATH);
    if (fs.existsSync(TEST_DB_PATH + "-journal")) fs.unlinkSync(TEST_DB_PATH + "-journal");
    if (fs.existsSync(TEST_DB_PATH + "-wal")) fs.unlinkSync(TEST_DB_PATH + "-wal");
  } catch {
    // Ignore cleanup errors
  }
}

async function runTests() {
  console.log("Starting Lab 03 Server for Automated Verification with Isolated Test DB...");
  cleanupTestDb();

  const serverProcess = spawn("node", [path.join(__dirname, "server.js")], {
    env: { ...process.env, PORT: TEST_PORT, DB_PATH: TEST_DB_PATH },
    stdio: "pipe",
  });

  // Give server time to initialize DB and listen
  await new Promise((resolve) => setTimeout(resolve, 2500));

  let passed = 0;
  let failed = 0;

  async function assertTest(name, fn) {
    try {
      await fn();
      console.log(`  ✓ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ FAIL: ${name} -> ${err.message}`);
      failed++;
    }
  }

  try {
    console.log("\n--- Executing Test Scenarios ---");

    // 1. Root Endpoint
    await assertTest("1. GET / Root metadata contains student SRIMURTHI ASHISH", async () => {
      const res = await makeRequest({ host: "localhost", port: TEST_PORT, path: "/", method: "GET" });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      if (res.body.student !== "SRIMURTHI ASHISH") throw new Error(`Unexpected student: ${res.body.student}`);
      if (res.body.registrationNumber !== "252U1R1233") throw new Error(`Unexpected reg: ${res.body.registrationNumber}`);
    });

    // 2. Successful GET all books
    await assertTest("2. Successful GET all books (GET /books/ default limit 10)", async () => {
      const res = await makeRequest({ host: "localhost", port: TEST_PORT, path: "/books/", method: "GET" });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      if (!Array.isArray(res.body) || res.body.length !== 10) throw new Error(`Expected 10 books, got ${res.body.length}`);
      if (!res.body[0].title || !res.body[0].author) throw new Error("Expected book properties missing");
    });

    // 3. Search
    await assertTest("3. Search query filter (GET /books/?search_q=JavaScript)", async () => {
      const res = await makeRequest({ host: "localhost", port: TEST_PORT, path: "/books/?search_q=JavaScript", method: "GET" });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      if (!Array.isArray(res.body) || res.body.length === 0) throw new Error("Expected at least 1 match");
      for (const b of res.body) {
        if (!b.title.toLowerCase().includes("javascript")) throw new Error(`Title does not match: ${b.title}`);
      }
    });

    // 4. Sorting
    await assertTest("4. Sorting by price descending (GET /books/?order_by=price&order=DESC)", async () => {
      const res = await makeRequest({ host: "localhost", port: TEST_PORT, path: "/books/?order_by=price&order=DESC&limit=5", method: "GET" });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      if (res.body.length < 2) throw new Error("Expected at least 2 books");
      for (let i = 0; i < res.body.length - 1; i++) {
        if (res.body[i].price < res.body[i + 1].price) throw new Error("Books not sorted descending by price");
      }
    });

    // 5. Pagination
    await assertTest("5. Pagination with limit and offset (GET /books/?limit=3&offset=3)", async () => {
      const res = await makeRequest({ host: "localhost", port: TEST_PORT, path: "/books/?limit=3&offset=3", method: "GET" });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      if (!Array.isArray(res.body) || res.body.length !== 3) throw new Error(`Expected length 3, got ${res.body.length}`);
      if (res.body[0].id !== 4) throw new Error(`Expected first book id 4, got ${res.body[0].id}`);
    });

    // 6. Price filtering
    await assertTest("6. Price range filtering (GET /books/?min_price=400&max_price=800)", async () => {
      const res = await makeRequest({ host: "localhost", port: TEST_PORT, path: "/books/?min_price=400&max_price=800", method: "GET" });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      if (!Array.isArray(res.body) || res.body.length === 0) throw new Error("Expected matching books");
      for (const b of res.body) {
        if (b.price < 400 || b.price > 800) throw new Error(`Book price ${b.price} out of range [400, 800]`);
      }
    });

    // 7. Combined filtering
    await assertTest("7. Combined search, price, sort & pagination (GET /books/?...)", async () => {
      const res = await makeRequest({
        host: "localhost",
        port: TEST_PORT,
        path: "/books/?search_q=the&min_price=200&max_price=900&order_by=price&order=DESC&limit=4&offset=0",
        method: "GET",
      });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      if (!Array.isArray(res.body) || res.body.length === 0) throw new Error("Expected matching books");
      for (const b of res.body) {
        if (!b.title.toLowerCase().includes("the")) throw new Error("Title does not match 'the'");
        if (b.price < 200 || b.price > 900) throw new Error("Price out of range");
      }
    });

    // 8. GET single book
    await assertTest("8. GET single book by ID (GET /books/1/)", async () => {
      const res = await makeRequest({ host: "localhost", port: TEST_PORT, path: "/books/1/", method: "GET" });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      if (res.body.id !== 1) throw new Error(`Expected book ID 1, got ${res.body.id}`);
      if (!res.body.title) throw new Error("Expected title property");
    });

    // 9. POST successful creation
    await assertTest("9. POST create new book (POST /books/ 201 Created)", async () => {
      const res = await makeRequest(
        {
          host: "localhost",
          port: TEST_PORT,
          path: "/books/",
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
        { title: "System Design Interview", author: "Alex Xu", price: 850, pages: 300 }
      );
      if (res.status !== 201) throw new Error(`Status ${res.status}`);
      if (!res.body.bookId) throw new Error("Missing bookId in response");
      if (res.body.message !== "Book Added Successfully") throw new Error(`Unexpected message: ${res.body.message}`);
    });

    // 10. POST missing title
    await assertTest("10. POST missing title validation (400 Bad Request)", async () => {
      const res = await makeRequest(
        {
          host: "localhost",
          port: TEST_PORT,
          path: "/books/",
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
        { author: "Alex Xu", price: 850, pages: 300 }
      );
      if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
      if (res.body.message !== "title is required") throw new Error(`Unexpected message: ${res.body.message}`);
    });

    // 11. POST missing author
    await assertTest("11. POST missing author validation (400 Bad Request)", async () => {
      const res = await makeRequest(
        {
          host: "localhost",
          port: TEST_PORT,
          path: "/books/",
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
        { title: "System Design Interview", price: 850, pages: 300 }
      );
      if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
      if (res.body.message !== "author is required") throw new Error(`Unexpected message: ${res.body.message}`);
    });

    // 12. POST invalid price
    await assertTest("12. POST invalid price validation (400 Bad Request)", async () => {
      const res = await makeRequest(
        {
          host: "localhost",
          port: TEST_PORT,
          path: "/books/",
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
        { title: "System Design Interview", author: "Alex Xu", price: -100, pages: 300 }
      );
      if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
      if (!res.body.message.includes("price")) throw new Error(`Unexpected message: ${res.body.message}`);
    });

    // 13. PUT successful update
    await assertTest("13. PUT update existing book (PUT /books/1/ 200 OK)", async () => {
      const res = await makeRequest(
        {
          host: "localhost",
          port: TEST_PORT,
          path: "/books/1/",
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        },
        { title: "The Pragmatic Programmer (20th Anniversary Edition)", author: "David Thomas, Andrew Hunt", price: 799, pages: 360 }
      );
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      if (res.body.message !== "Book Updated Successfully") throw new Error(`Unexpected message: ${res.body.message}`);
    });

    // 14. PUT nonexistent ID
    await assertTest("14. PUT update nonexistent book ID (404 Not Found)", async () => {
      const res = await makeRequest(
        {
          host: "localhost",
          port: TEST_PORT,
          path: "/books/999/",
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        },
        { title: "Nonexistent Book", author: "Nobody", price: 500, pages: 200 }
      );
      if (res.status !== 404) throw new Error(`Expected status 404, got ${res.status}`);
      if (res.body.message !== "Book with ID 999 not found") throw new Error(`Unexpected message: ${res.body.message}`);
    });

    // 15. DELETE successful deletion
    await assertTest("15. DELETE existing book (DELETE /books/15/ 200 OK)", async () => {
      const res = await makeRequest({ host: "localhost", port: TEST_PORT, path: "/books/15/", method: "DELETE" });
      if (res.status !== 200) throw new Error(`Status ${res.status}`);
      if (res.body.message !== "Book Deleted Successfully") throw new Error(`Unexpected message: ${res.body.message}`);
    });

    // 16. DELETE nonexistent ID
    await assertTest("16. DELETE nonexistent book ID (404 Not Found)", async () => {
      const res = await makeRequest({ host: "localhost", port: TEST_PORT, path: "/books/999/", method: "DELETE" });
      if (res.status !== 404) throw new Error(`Expected status 404, got ${res.status}`);
      if (res.body.message !== "Book with ID 999 not found") throw new Error(`Unexpected message: ${res.body.message}`);
    });

    // 17. Invalid sorting field
    await assertTest("17. Validation: Invalid sorting field (400 Bad Request)", async () => {
      const res = await makeRequest({ host: "localhost", port: TEST_PORT, path: "/books/?order_by=invalid_column", method: "GET" });
      if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
      if (!res.body.message.includes("Invalid order_by field")) throw new Error(`Unexpected message: ${res.body.message}`);
    });

    // 18. Invalid sorting direction
    await assertTest("18. Validation: Invalid sorting direction (400 Bad Request)", async () => {
      const res = await makeRequest({ host: "localhost", port: TEST_PORT, path: "/books/?order=DIAGONAL", method: "GET" });
      if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
      if (!res.body.message.includes("Invalid order value")) throw new Error(`Unexpected message: ${res.body.message}`);
    });

    // 19. Invalid pagination
    await assertTest("19. Validation: Negative pagination limit (400 Bad Request)", async () => {
      const res = await makeRequest({ host: "localhost", port: TEST_PORT, path: "/books/?limit=-5", method: "GET" });
      if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
      if (!res.body.message.includes("limit must be a non-negative integer")) throw new Error(`Unexpected message: ${res.body.message}`);
    });

    // 20. Invalid book ID
    await assertTest("20. Validation: Non-numeric book ID path parameter (400 Bad Request)", async () => {
      const res = await makeRequest({ host: "localhost", port: TEST_PORT, path: "/books/abc/", method: "GET" });
      if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
      if (res.body.message !== "Invalid bookId format. Must be a positive integer") throw new Error(`Unexpected message: ${res.body.message}`);
    });

    // 21. Unknown route
    await assertTest("21. Not Found: Unknown route handler (404 Not Found)", async () => {
      const res = await makeRequest({ host: "localhost", port: TEST_PORT, path: "/unknown-api-route/", method: "GET" });
      if (res.status !== 404) throw new Error(`Expected status 404, got ${res.status}`);
      if (res.body.message !== "Route not found") throw new Error(`Unexpected message: ${res.body.message}`);
    });

    console.log(`\nVerification Complete: ${passed} Passed, ${failed} Failed.`);
  } finally {
    serverProcess.kill();
    // Allow process to close file handle before deleting temporary test DB
    await new Promise((resolve) => setTimeout(resolve, 800));
    cleanupTestDb();
  }

  if (failed > 0) process.exit(1);
}

runTests();
