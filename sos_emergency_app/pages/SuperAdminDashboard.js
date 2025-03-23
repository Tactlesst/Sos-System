// components/SuperAdminDashboard.js
import styles from '../styles/SuperAdminDashboard.module.css';

export default function SuperAdminDashboard({ user }) {
  return (
    <div className={styles.dashboard}>
      <h1>Welcome, Super Admin {user?.firstName}</h1>
      <p>Here are your administrative details:</p>
      <ul>
        <li>Total Users: 100</li>
        <li>Active Stations: 10</li>
        <li>Pending Requests: 5</li>
      </ul>
    </div>
  );
}