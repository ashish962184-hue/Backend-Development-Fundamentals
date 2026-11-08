const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = process.env.DB_PATH || path.join(__dirname, "database.db");

// Middleware to parse incoming JSON request bodies
app.use(express.json());

let db = null;

// Initialize Database connection and start Express server
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Create the book table if it does not exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        price INTEGER NOT NULL,
        pages INTEGER NOT NULL
      )
    `);

    // Seed sample records only when the book table is completely empty
    const count = await db.get("SELECT COUNT(*) as total FROM book");
    if (count.total === 0) {
      await db.exec(`
        INSERT INTO book (title, author, price, pages) VALUES
        ('The Pragmatic Programmer', 'David Thomas, Andrew Hunt', 750, 352),
        ('Clean Code', 'Robert C. Martin', 650, 464),
        ('You Don''t Know JS: Scope & Closures', 'Kyle Simpson', 420, 144),
        ('Designing Data-Intensive Applications', 'Martin Kleppmann', 1200, 616),
        ('JavaScript: The Good Parts', 'Douglas Crockford', 380, 176),
        ('Atomic Habits', 'James Clear', 450, 320),
        ('Node.js Design Patterns', 'Mario Casciaro', 890, 660),
        ('Learning SQL', 'Alan Beaulieu', 550, 380),
        ('Introduction to Algorithms', 'Thomas H. Cormen', 1400, 1312),
        ('Refactoring: Improving the Design of Existing Code', 'Martin Fowler', 790, 448),
        ('Cracking the Coding Interview', 'Gayle Laakmann McDowell', 950, 687),
        ('Head First Design Patterns', 'Eric Freeman', 720, 694),
        ('Eloquent JavaScript', 'Marijn Haverbeke', 499, 472),
        ('Clean Architecture', 'Robert C. Martin', 680, 432),
        ('Database System Concepts', 'Abraham Silberschatz', 1150, 1376)
      `);
      console.log("Seeded database with 15 realistic book records.");
    }

    const server = app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

    // Friendly error handling for port conflicts (EADDRINUSE)
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(
          `[Port Conflict] Port ${PORT} is already in use. Please terminate the process using this port or specify another port using PORT=<number>.`
        );
      } else {
        console.error(`[Server Error] ${error.message}`);
      }
    });
  } catch (error) {
    console.error(`Database Initialization Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// ==========================================
// ROOT ROUTE - API DIRECTORY & STUDENT INFO
// ==========================================
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Backend Development Fundamentals - Lab 3 (REST API, Query Parameters, Validation & Debugging)",
    student: "SRIMURTHI ASHISH",
    registrationNumber: "252U1R1233",
    section: "S-016",
    college: "Aurora University",
    faculty: "Yugandhar.",
    endpoints: {
      listBooksWithFilters: "GET /books/?search_q=&order_by=id&order=ASC&limit=10&offset=0&min_price=&max_price=",
      getSingleBook: "GET /books/:bookId/",
      addBook: "POST /books/",
      updateBook: "PUT /books/:bookId/",
      deleteBook: "DELETE /books/:bookId/"
    }
  });
});

// ==========================================
// REST ENDPOINTS
// ==========================================

// 1. GET /books/ - List books with Query Parameters (Search, Sort, Pagination, Price Range)
app.get("/books/", async (req, res, next) => {
  try {
    const {
      search_q,
      order_by,
      order,
      limit,
      offset,
      min_price,
      max_price,
    } = req.query;

    // --- SEARCH QUERY VALIDATION ---
    let searchVal = "";
    if (search_q !== undefined) {
      if (typeof search_q !== "string" || Array.isArray(search_q)) {
        return res.status(400).json({
          message: "search_q must be a string",
        });
      }
      searchVal = search_q.trim();
    }

    // --- SECURITY NOTE: ORDER BY WHITELIST VALIDATION ---
    // In SQL, ? placeholders are strictly reserved for literal values (strings, numbers).
    // Identifiers such as column names and keywords (ASC/DESC) CANNOT be parameterized.
    // To prevent SQL injection, order_by and order MUST be validated against a strict whitelist in JavaScript.
    const allowedOrderBy = ["id", "title", "author", "price", "pages"];
    let normalizedOrderBy = "id";
    if (order_by !== undefined) {
      if (typeof order_by !== "string" || Array.isArray(order_by)) {
        return res.status(400).json({
          message: `Invalid order_by field. Allowed fields: ${allowedOrderBy.join(", ")}`,
        });
      }
      const trimmedOrderBy = order_by.trim().toLowerCase();
      if (!allowedOrderBy.includes(trimmedOrderBy)) {
        return res.status(400).json({
          message: `Invalid order_by field. Allowed fields: ${allowedOrderBy.join(", ")}`,
        });
      }
      normalizedOrderBy = trimmedOrderBy;
    }

    let normalizedOrder = "ASC";
    if (order !== undefined) {
      if (typeof order !== "string" || Array.isArray(order)) {
        return res.status(400).json({
          message: "Invalid order value. Allowed values: ASC, DESC",
        });
      }
      const trimmedOrder = order.trim().toUpperCase();
      if (trimmedOrder !== "ASC" && trimmedOrder !== "DESC") {
        return res.status(400).json({
          message: "Invalid order value. Allowed values: ASC, DESC",
        });
      }
      normalizedOrder = trimmedOrder;
    }

    // --- PAGINATION VALIDATION ---
    let parsedLimit = 10;
    if (limit !== undefined) {
      if (typeof limit !== "string" || Array.isArray(limit) || limit.trim() === "" || !/^\d+$/.test(limit.trim())) {
        return res.status(400).json({
          message: "limit must be a non-negative integer",
        });
      }
      parsedLimit = Number(limit.trim());
      if (!Number.isSafeInteger(parsedLimit) || parsedLimit < 0) {
        return res.status(400).json({
          message: "limit must be a non-negative integer",
        });
      }
    }

    let parsedOffset = 0;
    if (offset !== undefined) {
      if (typeof offset !== "string" || Array.isArray(offset) || offset.trim() === "" || !/^\d+$/.test(offset.trim())) {
        return res.status(400).json({
          message: "offset must be a non-negative integer",
        });
      }
      parsedOffset = Number(offset.trim());
      if (!Number.isSafeInteger(parsedOffset) || parsedOffset < 0) {
        return res.status(400).json({
          message: "offset must be a non-negative integer",
        });
      }
    }

    // --- PRICE FILTER VALIDATION ---
    let minPriceVal;
    if (min_price !== undefined) {
      if (typeof min_price !== "string" || Array.isArray(min_price) || min_price.trim() === "") {
        return res.status(400).json({
          message: "min_price must be a non-negative number",
        });
      }
      const parsedMin = Number(min_price.trim());
      if (isNaN(parsedMin) || parsedMin < 0 || !isFinite(parsedMin)) {
        return res.status(400).json({
          message: "min_price must be a non-negative number",
        });
      }
      minPriceVal = parsedMin;
    }

    let maxPriceVal;
    if (max_price !== undefined) {
      if (typeof max_price !== "string" || Array.isArray(max_price) || max_price.trim() === "") {
        return res.status(400).json({
          message: "max_price must be a non-negative number",
        });
      }
      const parsedMax = Number(max_price.trim());
      if (isNaN(parsedMax) || parsedMax < 0 || !isFinite(parsedMax)) {
        return res.status(400).json({
          message: "max_price must be a non-negative number",
        });
      }
      maxPriceVal = parsedMax;
    }

    if (minPriceVal !== undefined && maxPriceVal !== undefined) {
      if (minPriceVal > maxPriceVal) {
        return res.status(400).json({
          message: "min_price cannot be greater than max_price",
        });
      }
    }

    // --- SQL QUERY CONSTRUCTION (Parameterized for data values) ---
    const conditions = [];
    const queryParams = [];

    // Partial search on title using LIKE with ? parameter
    if (searchVal !== "") {
      conditions.push("title LIKE ?");
      queryParams.push(`%${searchVal}%`);
    }

    // Price range filtering (BETWEEN or separate conditions)
    if (minPriceVal !== undefined && maxPriceVal !== undefined) {
      conditions.push("price BETWEEN ? AND ?");
      queryParams.push(minPriceVal, maxPriceVal);
    } else if (minPriceVal !== undefined) {
      conditions.push("price >= ?");
      queryParams.push(minPriceVal);
    } else if (maxPriceVal !== undefined) {
      conditions.push("price <= ?");
      queryParams.push(maxPriceVal);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    // Assemble SQL using whitelisted identifiers and ? parameterized data values
    const query = `
      SELECT * FROM book
      ${whereClause}
      ORDER BY ${normalizedOrderBy} ${normalizedOrder}
      LIMIT ? OFFSET ?
    `;
    queryParams.push(parsedLimit, parsedOffset);

    const books = await db.all(query, queryParams);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

// Helper function to validate request body for POST & PUT
const validateBookBody = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "Request body must be a valid JSON object";
  }
  const { title, author, price, pages } = body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return "title is required";
  }

  if (!author || typeof author !== "string" || author.trim() === "") {
    return "author is required";
  }

  if (price === undefined || typeof price !== "number" || isNaN(price) || price < 0) {
    return "price is required and must be a non-negative number";
  }

  if (pages !== undefined && (!Number.isInteger(pages) || pages <= 0)) {
    return "pages must be a positive integer";
  }

  return null;
};

// 2. GET /books/:bookId/ - Retrieve a single book
app.get("/books/:bookId/", async (req, res, next) => {
  try {
    const { bookId } = req.params;
    if (typeof bookId !== "string" || !/^\d+$/.test(bookId.trim())) {
      return res.status(400).json({
        message: "Invalid bookId format. Must be a positive integer",
      });
    }

    const parsedId = Number(bookId.trim());
    if (!Number.isSafeInteger(parsedId) || parsedId <= 0) {
      return res.status(400).json({
        message: "Invalid bookId format. Must be a positive integer",
      });
    }

    const query = "SELECT * FROM book WHERE id = ?";
    const book = await db.get(query, [parsedId]);

    if (!book) {
      return res.status(404).json({
        message: `Book with ID ${parsedId} not found`,
      });
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
});

// 3. POST /books/ - Create a new book
app.post("/books/", async (req, res, next) => {
  try {
    const validationError = validateBookBody(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const { title, author, price, pages = 100 } = req.body;

    const query = "INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?)";
    const result = await db.run(query, [title.trim(), author.trim(), price, pages]);

    res.status(201).json({
      message: "Book Added Successfully",
      bookId: result.lastID,
    });
  } catch (error) {
    next(error);
  }
});

// 4. PUT /books/:bookId/ - Update an existing book
app.put("/books/:bookId/", async (req, res, next) => {
  try {
    const { bookId } = req.params;
    if (typeof bookId !== "string" || !/^\d+$/.test(bookId.trim())) {
      return res.status(400).json({
        message: "Invalid bookId format. Must be a positive integer",
      });
    }

    const parsedId = Number(bookId.trim());
    if (!Number.isSafeInteger(parsedId) || parsedId <= 0) {
      return res.status(400).json({
        message: "Invalid bookId format. Must be a positive integer",
      });
    }

    // Check if the record exists first so missing ID returns 404
    const existingBook = await db.get("SELECT * FROM book WHERE id = ?", [parsedId]);
    if (!existingBook) {
      return res.status(404).json({
        message: `Book with ID ${parsedId} not found`,
      });
    }

    const validationError = validateBookBody(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const { title, author, price, pages = existingBook.pages } = req.body;

    const query = "UPDATE book SET title = ?, author = ?, price = ?, pages = ? WHERE id = ?";
    await db.run(query, [title.trim(), author.trim(), price, pages, parsedId]);

    res.status(200).json({ message: "Book Updated Successfully" });
  } catch (error) {
    next(error);
  }
});

// 5. DELETE /books/:bookId/ - Delete a book
app.delete("/books/:bookId/", async (req, res, next) => {
  try {
    const { bookId } = req.params;
    if (typeof bookId !== "string" || !/^\d+$/.test(bookId.trim())) {
      return res.status(400).json({
        message: "Invalid bookId format. Must be a positive integer",
      });
    }

    const parsedId = Number(bookId.trim());
    if (!Number.isSafeInteger(parsedId) || parsedId <= 0) {
      return res.status(400).json({
        message: "Invalid bookId format. Must be a positive integer",
      });
    }

    // Check if record exists before deleting
    const existingBook = await db.get("SELECT * FROM book WHERE id = ?", [parsedId]);
    if (!existingBook) {
      return res.status(404).json({
        message: `Book with ID ${parsedId} not found`,
      });
    }

    const query = "DELETE FROM book WHERE id = ?";
    await db.run(query, [parsedId]);

    res.status(200).json({ message: "Book Deleted Successfully" });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// 404 UNKNOWN ROUTE HANDLER
// ==========================================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack || err.message);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
