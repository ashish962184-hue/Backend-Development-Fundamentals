const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
const PORT = Number(process.env.PORT) || 5002;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, "users.db");
const BCRYPT_ROUNDS = 10;
// Lab requirement: this is an explicitly development-only key. Never deploy it.
const DEVELOPMENT_ONLY_JWT_SECRET = "lab-04-development-only-secret-change-before-deployment";
const JWT_EXPIRES_IN = "1h";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let db;
const initialization = initializeDatabase();
app.locals.ready = initialization;
app.locals.closeDatabase = async () => {
  await initialization;
  if (db) await db.close();
};
app.locals.dbReady = initialization;

function requiredString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

app.post("/register/", async (req, res) => {
  const { username, name, password } = req.body || {};
  if (![username, name, password].every(requiredString)) {
    return res.status(400).json({ error: "username, name, and password are required" });
  }

  try {
    const existingUser = await db.get("SELECT id FROM users WHERE username = ?", [username.trim()]);
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    await db.run(
      "INSERT INTO users (username, name, password) VALUES (?, ?, ?)",
      [username.trim(), name.trim(), passwordHash]
    );
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(400).json({ error: "Username already exists" });
    }
    console.error("Registration failed");
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login/", async (req, res) => {
  const { username, password } = req.body || {};
  if (![username, password].every(requiredString)) {
    return res.status(400).json({ error: "username and password are required" });
  }

  try {
    const user = await db.get(
      "SELECT username, password FROM users WHERE username = ?",
      [username.trim()]
    );
    if (!user) {
      return res.status(400).json({ error: "Invalid username" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const jwtToken = jwt.sign(
      { username: user.username },
      DEVELOPMENT_ONLY_JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    return res.status(200).json({ jwt_token: jwtToken });
  } catch (error) {
    console.error("Login failed");
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

async function initializeDBAndServer() {
  try {
    await initialization;

    if (require.main === module) {
      const server = app.listen(PORT, () => {
        console.log(`Lab 04 authentication API listening on port ${PORT}`);
      });
      server.on("error", (error) => {
        console.error(error.code === "EADDRINUSE" ? `Port ${PORT} is already in use` : "Server failed to start");
        process.exitCode = 1;
      });
    }
  } catch (error) {
    console.error("Database initialization failed");
    if (require.main === module) process.exitCode = 1;
    throw error;
  }
}

async function initializeDatabase() {
  db = await open({ filename: DB_PATH, driver: sqlite3.Database });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `);
}

if (require.main === module) initializeDBAndServer().catch(() => { process.exitCode = 1; });

module.exports = app;
