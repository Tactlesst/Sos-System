// pages/api/stationedit.js
import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id, newName } = req.body;

  if (!id || !newName) {
    return res.status(400).json({ message: 'Station ID and new name are required' });
  }

  let connection;
  try {
    connection = await pool.getConnection();

    // Check if the station exists
    const [stationCheck] = await connection.query(
      'SELECT id FROM stations WHERE id = ?',
      [id]
    );

    if (stationCheck.length === 0) {
      return res.status(404).json({ message: 'Station not found' });
    }

    // Check if the new name already exists
    const [nameCheck] = await connection.query(
      'SELECT id FROM stations WHERE name = ? AND id != ?',
      [newName, id]
    );

    if (nameCheck.length > 0) {
      return res.status(400).json({ message: 'Station name already exists' });
    }

    // Update the station name
    const [result] = await connection.query(
      'UPDATE stations SET name = ? WHERE id = ?',
      [newName, id]
    );

    return res.status(200).json({ message: 'Station name updated successfully' });
  } catch (error) {
    console.error('Error updating station:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (connection) connection.release();
  }
}