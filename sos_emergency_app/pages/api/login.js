import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: 'Missing phone or password' });
  }

  try {
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE phone = ? LIMIT 1',
      [phone]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid phone or password' });
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid phone or password' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables');
      return res.status(500).json({ message: 'Internal server error' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.setHeader('Set-Cookie', cookie.serialize('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    }));

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
