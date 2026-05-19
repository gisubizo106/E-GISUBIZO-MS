const { Pool } = require("pg");
require("dotenv").config(); // Run this line here too, just to be completely safe!

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DATABASE || "your_database_name",
  // The line below guarantees that the password evaluates to a string, never undefined!
  password: String(process.env.DB_PASSWORD || "your_db_password_here"), 
  port: parseInt(process.env.DB_PORT || "5432"),
});

module.exports = pool;