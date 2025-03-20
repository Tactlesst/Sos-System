// pages/api/login.js
import pool from "../../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const [users] = await pool.execute("SELECT * FROM users WHERE phone = ?", [phone]);

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid phone number or password" });
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid phone number or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, firstName: user.firstName, lastName: user.lastName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set HTTP-only cookie
    res.setHeader(
      "Set-Cookie",
      `authToken=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Strict`
    );

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
