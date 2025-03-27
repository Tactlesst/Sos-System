// pages/api/station/[stationId].js
import { getStationById } from '../../lib/db'; // Replace with your database logic

export default async function handler(req, res) {
  const { stationId } = req.query;

  try {
    const station = await getStationById(stationId);
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}