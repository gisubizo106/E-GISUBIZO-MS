const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/db-test", async (req, res) => {
  const result = await db.query("SELECT NOW()");
  res.json(result.rows);
});

// Server port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});