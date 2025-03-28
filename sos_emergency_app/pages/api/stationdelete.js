// pages/api/stationdelete.js
import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: 'Station name is required' });
  }

  try {
    // First, get the station ID by name to verify it exists
    const stationCheck = await query(
      'SELECT id FROM stations WHERE name = ?',
      [name]
    );

    if (stationCheck.length === 0) {
      return res.status(404).json({ message: 'Station not found' });
    }

    // Delete the station
    const result = await query(
      'DELETE FROM stations WHERE name = ?',
      [name]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Station not found or already deleted' });
    }

    return res.status(200).json({ message: 'Station deleted successfully' });
  } catch (error) {
    console.error('Error deleting station:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}