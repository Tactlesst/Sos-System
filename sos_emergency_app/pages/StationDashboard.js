// components/StationDashboard.js
import styles from '../styles/StationDashboard.module.css';

export default function StationDashboard({ station }) {
  return (
    <div className={styles.dashboard}>
      <h1>Welcome, {station?.name}</h1>
      <p>Here are your station details:</p>
      <ul>
        <li>Location: {station?.location}</li>
        <li>Total Staff: {station?.staffCount}</li>
        <li>Active Operations: {station?.activeOperations}</li>
      </ul>
    </div>
  );
}