const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "books.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(3000, () => console.log("Server Running at http://localhost:3000/"));
  } catch (e) {
    console.log(DB Error: );
    process.exit(1);
  }
};
initializeDBAndServer();

app.get("/books/", async (request, response) => {
  const {
    search_q = "",
    order_by = "id",
    order = "ASC",
    limit = 10,
    offset = 0,
    min_price = 0,
    max_price = 100000
  } = request.query;

  const validOrderFields = ["id", "title", "author", "price", "pages"];
  const finalOrderBy = validOrderFields.includes(order_by) ? order_by : "id";
  const finalOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

  const getBooksQuery = 
    SELECT * FROM book 
    WHERE title LIKE ? 
    AND price BETWEEN ? AND ?
    ORDER BY  
    LIMIT ? OFFSET ?;
  ;

  try {
    const books = await db.all(getBooksQuery, [
      %%,
      min_price,
      max_price,
      parseInt(limit),
      parseInt(offset)
    ]);
    response.status(200).json(books);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.get("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;
  const getBookQuery = SELECT * FROM book WHERE id = ?;;
  const book = await db.get(getBookQuery, [bookId]);

  if (!book) {
    return response.status(404).json({ message: "Book Not Found" });
  }
  response.status(200).json(book);
});

app.post("/books/", async (request, response) => {
  const { title, author, price, pages } = request.body;

  if (!title || !author) {
    return response.status(400).json({ message: "Missing required fields: title or author" });
  }
  if (price !== undefined && isNaN(price)) {
    return response.status(400).json({ message: "Price must be a number" });
  }

  const addBookQuery = INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?);;
  const dbResponse = await db.run(addBookQuery, [title, author, price, pages]);
  response.status(201).json({ message: "Book Created Successfully", id: dbResponse.lastID });
});

app.put("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;
  const { title, author, price, pages } = request.body;

  const checkBookQuery = SELECT * FROM book WHERE id = ?;;
  const bookExists = await db.get(checkBookQuery, [bookId]);

  if (!bookExists) {
    return response.status(404).json({ message: "Book Not Found" });
  }
  if (!title || !author) {
    return response.status(400).json({ message: "Missing required fields: title or author" });
  }
  if (price !== undefined && isNaN(price)) {
    return response.status(400).json({ message: "Price must be a number" });
  }

  const updateBookQuery = UPDATE book SET title=?, author=?, price=?, pages=? WHERE id = ?;;
  await db.run(updateBookQuery, [title, author, price, pages, bookId]);
  response.status(200).json({ message: "Book Updated Successfully" });
});

app.delete("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;

  const checkBookQuery = SELECT * FROM book WHERE id = ?;;
  const bookExists = await db.get(checkBookQuery, [bookId]);

  if (!bookExists) {
    return response.status(404).json({ message: "Book Not Found" });
  }

  const deleteBookQuery = DELETE FROM book WHERE id = ?;;
  await db.run(deleteBookQuery, [bookId]);
  response.status(200).json({ message: "Book Deleted Successfully" });
});
