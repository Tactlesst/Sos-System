// pages/api/register.js

import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { firstName, lastName, phone, dob, password } = req.body;

  // Check if all required fields are provided
  if (!firstName || !lastName || !phone || !password) { // dob is optional
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if phone number already exists
    const [existingUsers] = await pool.execute(
      'SELECT * FROM users WHERE phone = ?',
      [phone]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'Phone number already registered' }); // 409 Conflict
    }

    await pool.execute(
      'INSERT INTO users (firstName, lastName, phone, dob, password) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, phone, dob, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}