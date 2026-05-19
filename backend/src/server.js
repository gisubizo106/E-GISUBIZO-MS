const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/db-test", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

// --- SIGN UP ROUTE ---
app.post("/api/signup", async (req, res) => {
 const { firstName, lastName, email, companyName, title, password } = req.body;

  if (!firstName || !lastName || !email || !companyName || !title || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters long." });
  }

  try {
    const lowerEmail = email.toLowerCase().trim();

    const userExist = await db.query("SELECT * FROM users WHERE email = $1", [lowerEmail]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ error: "Email already in use." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      `INSERT INTO users (first_name, last_name, email, company_name, title, password) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, email`,
      [firstName, lastName, lowerEmail, companyName, title, hashedPassword]
    );

    const token = jwt.sign(
      { userId: newUser.rows[0].id, email: newUser.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Account created successfully!",
      token,
      user: {
        id: newUser.rows[0].id,
        email: newUser.rows[0].email,
        companyName: newUser.rows[0].company_name,
        title: newUser.rows[0].title
      }
    });

  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});


// --- ADDED SIGN IN ROUTE ---
app.post("/api/signin", async (req, res) => {
  const { companyName, email, password } = req.body;

  // 1. Basic Validation
  if (!companyName || !email || !password) {
    return res.status(400).json({ error: "All fields are required to verify your workspace token." });
  }

  try {
    const lowerEmail = email.toLowerCase().trim();
    const cleanCompanyName = companyName.trim();

    // 2. Lookup the user record matching the given email
    const result = await db.query("SELECT * FROM users WHERE email = $1", [lowerEmail]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid login details or company match failed." });
    }

    const user = result.rows[0];

    // 3. Verify that the company name matches what they registered with
    // Using a case-insensitive check to be user-friendly
    if (user.company_name.toLowerCase() !== cleanCompanyName.toLowerCase()) {
      return res.status(401).json({ error: "Invalid login details or company match failed." });
    }

    // 4. Compare the encrypted password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid login details or company match failed." });
    }

    // 5. Generate a new JWT Token
    const token = jwt.sign(
      { userId: user.id, email: user.email, companyName: user.company_name, title: user.title },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6. Return Success Data back to React app
    res.status(200).json({
      message: "Authentication successful! Welcome back.",
      token,
      user: {
        id: user.id,
        email: user.email,
        companyName: user.company_name,
        title: user.title
      }
    });

  } catch (err) {
    console.error("Signin Error:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});


// Server port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 