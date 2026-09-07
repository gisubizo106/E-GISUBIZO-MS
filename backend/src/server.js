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

// --- SIGN UP ROUTE ---
app.post("/api/signup", async (req, res) => {
  // Destructure exactly these keys
  const { firstName, lastName, email, company_name, title, password } = req.body;
  
  // Debug to verify data reception in terminal
  console.log("DEBUG - Received body:", req.body); 

  // Validation
  if (!firstName || !lastName || !email || !company_name || !title || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    
    const lowerEmail = email.toLowerCase().trim();
    
    // Check if user exists
    const userExist = await db.query("SELECT * FROM users WHERE email = $1", [lowerEmail]);
    
    if (userExist.rows.length > 0) {
      return res.status(400).json({ error: "Email already in use." });
    }

    // Perform hashing ONLY ONCE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Proceed with INSERT
    await db.query(
      `INSERT INTO users (first_name, last_name, email, company_name, title, password) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [firstName, lastName, lowerEmail, company_name, title, hashedPassword]
    );

    res.status(201).json({ message: "Account created successfully!" });

  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});
// --- SIGN IN ROUTE ---
app.post("/api/signin", async (req, res) => {
  const { companyName, email, password } = req.body;

  if (!companyName || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const lowerEmail = email.toLowerCase().trim();
    const cleanCompanyName = companyName.trim();

    const result = await db.query("SELECT * FROM users WHERE email = $1", [lowerEmail]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid login details." });
    }

    const user = result.rows[0];

    // Check company name (matches your schema column company_name)
    if (user.company_name.toLowerCase() !== cleanCompanyName.toLowerCase()) {
      return res.status(401).json({ error: "Invalid login details." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid login details." });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Authentication successful!",
      token,
      user: {
        id: user.id,
        email: user.email,
        companyName: user.company_name,
        jobTitle: user.title // Mapped to 'title' from DB
      }
    });
  } catch (err) {
    console.error("Signin Error:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});