import pool from '../../../lib/db';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { userId } = req.query;
  const token = req.headers.authorization?.split(' ')[1];

  console.log('Fetching user data for userId:', userId);
  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    // Check if the token's userId matches the requested userId
    if (decoded.userId !== parseInt(userId)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Fetch user data from the database
    const [users] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId]);
    console.log('Users from database:', users);

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user data (excluding sensitive fields like password)
    const user = users[0];
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      dob: user.dob,
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
}