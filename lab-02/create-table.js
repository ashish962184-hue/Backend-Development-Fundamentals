const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const dbDir = path.join(__dirname, "database");
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}
const dbPath = path.join(dbDir, "books.db");
const db = new sqlite3.Database(dbPath);

db.run(
    `CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
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
