import pool from "../../lib/db"; // Reuse the database connection
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { firstName, lastName, phone, dob, password } = req.body;

  if (!firstName || !lastName || !phone || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if phone number already exists
    const [existingUsers] = await pool.execute(
      "SELECT id FROM users WHERE phone = ?",
      [phone]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ error: "Phone number already registered" });
    }

    // Insert new user
    const [result] = await pool.execute(
      "INSERT INTO users (firstName, lastName, phone, dob, password) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, phone, dob, hashedPassword]
    );

    return res.status(201).json({ message: "User registered successfully", userId: result.insertId });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
