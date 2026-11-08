const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Resolve database path (support both database/books.db and books.db)
const dbDirectory = path.join(__dirname, "database");
let dbPath = path.join(dbDirectory, "books.db");
if (!fs.existsSync(dbPath) && fs.existsSync(path.join(__dirname, "books.db"))) {
  dbPath = path.join(__dirname, "books.db");
}

let db = null;

// Initialize SQLite database connection and start server
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    console.log(`Database connected successfully at ${dbPath}`);
    app.listen(PORT, () => {
      console.log(`Server Running at http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// 1. GET: Retrieve all books
app.get("/books/", async (request, response) => {
  try {
    const getBooksQuery = "SELECT * FROM book ORDER BY id ASC;";
    const booksArray = await db.all(getBooksQuery);
    response.status(200).json(booksArray);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// 2. GET: Retrieve a single book by ID
app.get("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;
    const getBookQuery = "SELECT * FROM book WHERE id = ?;";
    const book = await db.get(getBookQuery, [bookId]);

    if (!book) {
      return response.status(404).json({ message: "Book Not Found" });
    }
    response.status(200).json(book);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// 3. POST: Add a new book
app.post("/books/", async (request, response) => {
  try {
    const { title, author, price, pages } = request.body;
    const addBookQuery = `
      INSERT INTO book (title, author, price, pages)
      VALUES (?, ?, ?, ?);
    `;
    const dbResponse = await db.run(addBookQuery, [title, author, price, pages]);
    response.status(201).json({
      message: "Book Added Successfully",
      bookId: dbResponse.lastID,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// 4. PUT: Update an existing book by ID
app.put("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;
    const { title, author, price, pages } = request.body;

    const checkBookQuery = "SELECT * FROM book WHERE id = ?;";
    const existingBook = await db.get(checkBookQuery, [bookId]);

    if (!existingBook) {
      return response.status(404).json({ message: "Book Not Found" });
    }

    const updateBookQuery = `
      UPDATE book
      SET title = ?, author = ?, price = ?, pages = ?
      WHERE id = ?;
    `;
    await db.run(updateBookQuery, [title, author, price, pages, bookId]);
    response.status(200).json({ message: "Book Updated Successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// 5. DELETE: Remove a book by ID
app.delete("/books/:bookId/", async (request, response) => {
  try {
    const { bookId } = request.params;

    const checkBookQuery = "SELECT * FROM book WHERE id = ?;";
    const existingBook = await db.get(checkBookQuery, [bookId]);

    if (!existingBook) {
      return response.status(404).json({ message: "Book Not Found" });
    }

    const deleteBookQuery = "DELETE FROM book WHERE id = ?;";
    await db.run(deleteBookQuery, [bookId]);
    response.status(200).json({ message: "Book Deleted Successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

module.exports = app;
