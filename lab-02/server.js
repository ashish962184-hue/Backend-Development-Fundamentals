
const express = require("express");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
const PORT = 3000;
const dbPath = "./database/books.db";

let db = null;

// Middleware to read JSON request bodies
app.use(express.json());

// 1. GET: Retrieve all books
app.get("/books/", async (request, response) => {
    const books = await db.all("SELECT * FROM book");
    response.status(200).send(books);
});

// 2. GET: Retrieve a single book
app.get("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;

    const book = await db.get(
        "SELECT * FROM book WHERE id = ?",
        [bookId]
    );

    if (book === undefined) {
        response.status(404).send("Book not found");
    } else {
        response.status(200).send(book);
    }
});

// 3. POST: Add a new book
app.post("/books/", async (request, response) => {
    const { title, author, price, pages } = request.body;

    const query = `
        INSERT INTO book (title, author, price, pages)
        VALUES (?, ?, ?, ?)
    `;

    await db.run(query, [title, author, price, pages]);

    response.status(201).send("Book added successfully");
});

// 4. PUT: Update an existing book
app.put("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;
    const { title, author, price, pages } = request.body;

    const query = `
        UPDATE book
        SET title = ?, author = ?, price = ?, pages = ?
        WHERE id = ?
    `;

    const result = await db.run(
        query,
        [title, author, price, pages, bookId]
    );

    if (result.changes === 0) {
        response.status(404).send("Book not found");
    } else {
        response.status(200).send("Book updated successfully");
    }
});

// 5. DELETE: Remove a book
app.delete("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;

    const result = await db.run(
        "DELETE FROM book WHERE id = ?",
        [bookId]
    );

    if (result.changes === 0) {
        response.status(404).send("Book not found");
    } else {
        response.status(200).send("Book deleted successfully");
    }
});

// Initialize database and start server
const initializeDBAndServer = async () => {
    try {
        db = await sqlite.open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.log(`Database Error: ${error.message}`);
        process.exit(1);
    }
};

initializeDBAndServer();
