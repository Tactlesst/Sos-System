// pages/api/login.js
import pool from '../../lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { phone, password } = req.body;
      // ... your database logic ...
      const user = await pool.execute('SELECT * FROM users WHERE phone = ?', [phone]);
      if (user[0].length === 0) {
        return res.status(401).json({error: "User not found"});
      }
      const validPass = await bcrypt.compare(password, user[0][0].password);
      if(!validPass) {
        return res.status(401).json({error: "Invalid password"});
      }

      res.status(200).json({ user: user[0][0] }); // Send user data
    } catch (error) {
      console.error('Login API error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}