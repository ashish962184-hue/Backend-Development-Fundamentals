const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const TEST_USER = { username: "test-ashish", name: "Test Ashish", password: "ExamplePassword123" };

async function main() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "lab-04-"));
  process.env.DB_PATH = path.join(tempDir, "users.db");
  const app = require("./server");
  const db = await open({ filename: process.env.DB_PATH, driver: sqlite3.Database });
  const results = [];

  async function request(route, body) {
    const routeLayer = app.router.stack.find((layer) => layer.route?.path === route && layer.route.methods.post);
    assert.ok(routeLayer, `POST ${route} must be registered`);
    const handler = routeLayer.route.stack[0].handle;
    const req = { body, method: "POST", path: route, params: {}, app };
    const response = await new Promise((resolve, reject) => {
      const res = {
        statusCode: 200,
        status(code) { this.statusCode = code; return this; },
        json(value) { resolve({ statusCode: this.statusCode, body: value }); return this; },
      };
      Promise.resolve(handler(req, res)).catch(reject);
    });
    return { status: response.statusCode, body: response.body };
  }

  async function test(name, operation) {
    await operation();
    results.push(name);
    console.log(`PASS ${name}`);
  }

  try {
    await app.locals.ready;
    await test("user table initializes with required unique columns", async () => {
      const columns = await db.all("PRAGMA table_info(users)");
      assert.deepEqual(columns.map((column) => column.name), ["id", "username", "name", "password"]);
      assert.equal(columns.find((column) => column.name === "username").notnull, 1);
      assert.equal(columns.find((column) => column.name === "name").notnull, 1);
      assert.equal(columns.find((column) => column.name === "password").notnull, 1);
      const indexes = await db.all("PRAGMA index_list(users)");
      assert.ok(indexes.some((index) => index.unique === 1));
    });
    await test("successful registration returns 201 without password/hash", async () => {
      const response = await request("/register/", TEST_USER);
      assert.equal(response.status, 201);
      assert.equal("password" in response.body, false);
      assert.equal("hash" in response.body, false);
    });
    await test("duplicate username returns 400", async () => {
      assert.equal((await request("/register/", TEST_USER)).status, 400);
    });
    for (const field of ["username", "name", "password"]) {
      await test(`registration missing ${field} returns 400`, async () => {
        const body = { ...TEST_USER };
        delete body[field];
        assert.equal((await request("/register/", body)).status, 400);
      });
    }
    await test("database stores a bcrypt hash and no plaintext password", async () => {
      const row = await db.get("SELECT username, name, password FROM users WHERE username = ?", [TEST_USER.username]);
      assert.match(row.password, /^\$2[aby]\$/);
      assert.notEqual(row.password, TEST_USER.password);
      assert.equal(await bcrypt.compare(TEST_USER.password, row.password), true);
    });
    await test("successful login returns JWT with only username application claim", async () => {
      const response = await request("/login/", { username: TEST_USER.username, password: TEST_USER.password });
      assert.equal(response.status, 200);
      assert.equal(typeof response.body.jwt_token, "string");
      assert.deepEqual(Object.keys(jwt.decode(response.body.jwt_token)).sort(), ["exp", "iat", "username"]);
      assert.equal(jwt.decode(response.body.jwt_token).username, TEST_USER.username);
      assert.equal("password" in response.body, false);
      assert.equal("hash" in response.body, false);
      assert.equal(jwt.verify(response.body.jwt_token, "lab-04-development-only-secret-change-before-deployment").username, TEST_USER.username);
    });
    await test("unknown username returns 400 and no token", async () => {
      const response = await request("/login/", { username: "unknown", password: TEST_USER.password });
      assert.equal(response.status, 400);
      assert.equal("jwt_token" in response.body, false);
    });
    await test("incorrect password returns 400 and no token", async () => {
      const response = await request("/login/", { username: TEST_USER.username, password: "wrong-password" });
      assert.equal(response.status, 400);
      assert.equal("jwt_token" in response.body, false);
    });
    await test("login without credentials returns 400", async () => {
      assert.equal((await request("/login/", { username: TEST_USER.username })).status, 400);
      assert.equal((await request("/login/", { password: TEST_USER.password })).status, 400);
      assert.equal((await request("/login/", {})).status, 400);
    });
    console.log(`\n${results.length} passed, 0 failed.`);
  } finally {
    await db.close();
    await app.locals.closeDatabase();
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
