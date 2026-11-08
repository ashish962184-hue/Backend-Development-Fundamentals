const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "database", "books.db");
const db = new sqlite3.Database(dbPath);

const books = [
    ["The Alchemist", "Paulo Coelho", 350, 208],
    ["Atomic Habits", "James Clear", 450, 320],
    ["Rich Dad Poor Dad", "Robert Kiyosaki", 300, 336],
    ["The Psychology of Money", "Morgan Housel", 400, 256],
    ["Deep Work", "Cal Newport", 380, 304],
    ["Ikigai", "Hector Garcia", 280, 194],
    ["Think and Grow Rich", "Napoleon Hill", 320, 238],
    ["The Power of Now", "Eckhart Tolle", 360, 236],
    ["Start With Why", "Simon Sinek", 420, 256],
    ["Wings of Fire", "A.P.J. Abdul Kalam", 250, 180]
];

const query = `
    INSERT INTO book (title, author, price, pages)
    VALUES (?, ?, ?, ?)
`;

db.serialize(() => {
    const statement = db.prepare(query);

    books.forEach((book) => {
        statement.run(book);
    });

    statement.finalize((error) => {
        if (error) {
            console.log("Error inserting books:", error.message);
        } else {
            console.log("10 books inserted successfully");
        }

        db.close();
    } );
});
