// components/Sidebar.js
import styles from '../styles/Sidebar.module.css';

export default function Sidebar({ onNavigate }) {
  return (
    <div className={styles.sidebar}>
      <h2>Station Dashboard</h2>
      <ul>
        <li>
          <button onClick={() => onNavigate('dashboard')}>Dashboard</button>
        </li>
        <li>
          <button onClick={() => onNavigate('profile')}>Profile</button>
        </li>
        <li>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('stationId');
              localStorage.removeItem('userType');
              window.location.href = '/auth'; // Redirect to login page
            }}
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
}