// pages/api/users/[userId].js
import pool from '../../lib/db';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method === 'PUT') {
    const { firstName, lastName, email, userType } = req.body;

    try {
      await pool.query(
        'UPDATE users SET firstName = ?, lastName = ?, email = ?, userType = ? WHERE id = ?',
        [firstName, lastName, email, userType, userId]
      );
      const [updatedUser] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
      res.status(200).json(updatedUser[0]);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}