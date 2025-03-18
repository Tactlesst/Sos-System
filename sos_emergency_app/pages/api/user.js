import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const [rows] = await pool.query('SELECT * FROM users');
    res.status(200).json(rows);
  } else if (req.method === 'POST') {
    const { name, email } = req.body;
    await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.status(201).json({ message: 'User added' });
  } else if (req.method === 'PUT') {
    const { id, name, email } = req.body;
    await pool.query('UPDATE users SET name=?, email=? WHERE id=?', [name, email, id]);
    res.status(200).json({ message: 'User updated' });
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    await pool.query('DELETE FROM users WHERE id=?', [id]);
    res.status(200).json({ message: 'User deleted' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
