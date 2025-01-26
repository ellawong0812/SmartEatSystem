const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Create Database
const db = new sqlite3.Database("./recipes.db");

////////////////////////// Create Table  /////////////////////////////
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, email TEXT ,password TEXT, gender TEXT)`
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS admin (id INTEGER PRIMARY KEY, username TEXT, email TEXT, password TEXT)`
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS dish_choices (id INTEGER PRIMARY KEY, name TEXT, restaurant TEXT, protein TEXT, fat TEXT, ingredient_list TEXT)`
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS consumption_record (id INTEGER PRIMARY KEY, mem_id INTEGER, dish_id INTEGER, datetime TEXT, remark TEXT, net_calories INTEGER)`
  );
});

//////////////////////////// Middleware for authentication  /////////////////////////////
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);

  jwt.verify(token.split(" ")[1], "secret_key", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Recipes API",
    routes: {
      register: "POST /register",
      login: "POST /login",
      viewAllRecords: "GET /ViewAllRecords (auth required)",
      addRecord: "POST /AddRecord (auth required)",
      allDishes: "GET /allDishes (auth required)",
      addDish: "POST /AddDish (auth required, admin only)",
      updateDish: "PUT /dishes/:id (auth required, admin only)",
      generateReport: "POST /GenerateReport (auth required, admin only)",
    },
  });
});

// Routes
////////////////////////// Register & Login  /////////////////////////////
app.post("/register", async (req, res) => {
  const { username, email, password, gender } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.run(
    `INSERT INTO users (username, email, password, gender) VALUES (?, ?, ?, ?)`,
    [username, email, hashedPassword, gender],
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
      if (err) return res.status(500).send(err.message);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(403).send("Invalid credentials");
      }
      const token = jwt.sign(
        { id: user.id, username: user.username, role: "user" },
        "secret_key"
      );
      res.json({ token });
    }
  );
});

app.post("/login/admin", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required."); // Add validation
  }

  db.get(
    `SELECT * FROM admin WHERE username = ?`,
    [username],
    async (err, user) => {
      if (err) return res.status(500).send("Internal Server Error");
      if (!user) {
        return res.status(403).send("Invalid credentials");
      }
      // Token generation logic
      const token = jwt.sign(
        { id: user.id, username: user.username, role: "admin" },
        "secret_key"
      );
      res.json({ token });
    }
  );
});

////////////////////////// User /////////////////////////////
// User view their consumption record
app.get("/ViewAllRecords", authenticateToken, (req, res) => {
  db.all(
    `SELECT * FROM consumption_record WHERE mem_id = ?`,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).send(err.message);
      res.json(rows);
    }
  );
});

// User add their consumption record
app.post("/AddRecord", authenticateToken, (req, res) => {
  const { dish_id, datetime, remark, net_calories } = req.body;
  const mem_id = req.user.id;

  console.log("Adding record with data:", {
    mem_id,
    dish_id,
    datetime,
    remark,
    net_calories,
  }); // Debugging

  if (!dish_id || !datetime || !net_calories) {
    return res.status(400).send("Missing required fields"); // Validate input
  }

  db.run(
    `INSERT INTO consumption_record (mem_id, dish_id, datetime, remark, net_calories) VALUES (?, ?, ?, ?, ?)`,
    [mem_id, dish_id, datetime, remark, net_calories],
    (err) => {
      if (err) return res.status(500).send(err.message);
      res.sendStatus(201);
    }
  );
});

///////////////////////////// Admin /////////////////////////////
/// Admin/ User views all dishes
app.get("/allDishes", authenticateToken, (req, res) => {
  db.all(`SELECT * FROM dish_choices`, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// admin add new dish to the database
app.post("/AddDish", authenticateToken, (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  const { name, restaurant, protein, fat, ingredient_list } = req.body;
  db.run(
    `INSERT INTO dish_choices (name, restaurant, protein, fat, ingredient_list) VALUES (?, ?, ?, ?, ?)`,
    [name, restaurant, protein, fat, ingredient_list],
    (err) => {
      if (err) return res.status(500).send(err.message);
      res.sendStatus(201);
    }
  );
});

// admin changes EXISTING dish info
app.put("/dishes/:id", authenticateToken, (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  const { id } = req.params;
  const { name, restaurant, protein, fat, ingredient_list } = req.body;

  db.run(
    `UPDATE dish_choices SET name = ?, restaurant = ?, protein = ?, fat = ?, ingredient_list = ? WHERE id = ?`,
    [name, restaurant, protein, fat, ingredient_list, id],
    (err) => {
      if (err) return res.status(500).send(err.message);
      res.sendStatus(200);
    }
  );
});

// Admin generates reports on user data
app.post("/GenerateReport", authenticateToken, (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  db.all(
    `SELECT * FROM consumption_record JOIN users ON consumption_record.mem_id = users.id`,
    [],
    (err, rows) => {
      if (err) return res.status(500).send(err.message);
      res.json(rows);
    }
  );
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
