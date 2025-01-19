const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

app.use(bodyParser.json());

// Create Database
const db = new sqlite3.Database("./recipes.db");

// Create tables
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, email TEXT ,password TEXT, gender TEXT ,role TEXT)`
  );
});

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);

  jwt.verify(token.split(" ")[1], "secret_key", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post("/register", async (req, res) => {
  const { username, email, password, gender, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.run(
    `INSERT INTO users (username, email, password, gender, role) VALUES (?, ?, ?, ?, ?)`,
    [username, email, hashedPassword, gender, role],
    (err) => {
      if (err) return res.status(500).send(err.message);
      res.sendStatus(201);
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get(
    `SELECT * FROM users WHERE username = ?`,
    [username],
    async (err, user) => {
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(403).send("Invalid credentials");
      }
      const token = jwt.sign(
        { username: user.username, role: user.role },
        "secret_key"
      );
      res.json({ token });
    }
  );
});

//////////////////////////
// User
app.get("/recipes", authenticateToken, (req, res) => {
  db.all(`SELECT * FROM recipes`, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

app.post("/recipes", authenticateToken, (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  const { mood, recipe } = req.body;
  db.run(
    `INSERT INTO recipes (mood, recipe) VALUES (?, ?)`,
    [mood, recipe],
    (err) => {
      if (err) return res.status(500).send(err.message);
      res.sendStatus(201);
    }
  );
});

app.put("/recipes/:id", authenticateToken, (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  const { id } = req.params; // Get recipe ID from URL
  const { recipe } = req.body; // Get updated recipe content from body

  if (!id || !recipe) {
    return res.status(400).send("Missing recipe ID or content.");
  }

  db.run(`UPDATE recipes SET recipe = ? WHERE id = ?`, [recipe, id], (err) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Database error");
    }
    res.sendStatus(200);
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
