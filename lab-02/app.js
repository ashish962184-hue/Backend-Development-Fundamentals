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
    console.log(\DB Error: \\);
    process.exit(1);
  }
};
initializeDBAndServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = \SELECT * FROM book;\;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});

app.get("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;
  const getBookQuery = \SELECT * FROM book WHERE id = ?;\;
  const book = await db.get(getBookQuery, [bookId]);
  response.send(book);
});

app.post("/books/", async (request, response) => {
  const { title, author, price, pages } = request.body;
  const addBookQuery = \INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?);\;
  await db.run(addBookQuery, [title, author, price, pages]);
  response.send("Book Added Successfully");
});

app.put("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;
  const { title, author, price, pages } = request.body;
  const updateBookQuery = \UPDATE book SET title=?, author=?, price=?, pages=? WHERE id = ?;\;
  await db.run(updateBookQuery, [title, author, price, pages, bookId]);
  response.send("Book Updated Successfully");
});

app.delete("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;
  const deleteBookQuery = \DELETE FROM book WHERE id = ?;\;
  await db.run(deleteBookQuery, [bookId]);
  response.send("Book Deleted Successfully");
});
