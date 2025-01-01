const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// Sample routes
app.post("/api/register", (req, res) => {
  const { email, password, gender } = req.body;
  // Add logic to save to the database
  res.send({ message: "Registration successful" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  // Add logic to authenticate
  res.send({ message: "Login successful" });
});

app.get("/api/search", (req, res) => {
  const { query } = req.query;
  // Logic to fetch food data from DB
  res.send([
    { name: "Apple", calories: 52 },
    { name: "Banana", calories: 89 },
  ]);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
