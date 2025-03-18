import pool from '../../lib/db';
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { firstName, lastName, phone, password, dob, terms } = req.body;

      // Validate input (add more validation as needed)
      if (!firstName || !lastName || !phone || !password || !dob || terms === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      if (password.length < 8) { //Example password length validation
        return res.status(400).json({error: "Password must be at least 8 characters long."})
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

      const [results] = await pool.execute(
        'INSERT INTO users (firstName, lastName, phone, password, dob, terms) VALUES (?, ?, ?, ?, ?, ?)',
        [firstName, lastName, phone, hashedPassword, dob, terms]
      );

      res.status(200).json({ message: 'User registered successfully', results });
    } catch (error) {
      console.error(error);
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Phone number already exists' }); //handle duplicate entries.
      }
      res.status(500).json({ error: 'Failed to register user' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}