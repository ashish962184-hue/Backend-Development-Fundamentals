
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/books.db");

db.run(
    `CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY,
        title TEXT,
        author TEXT,
        price INTEGER,
        pages INTEGER
    )`,
    (error) => {
        if (error) {
            console.log("Error creating table:", error.message);
        } else {
            console.log("Book table created successfully");
        }

        db.close();
    }
);
