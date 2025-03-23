// components/Sidebar.js
import styles from '../styles/Sidebar.module.css';

export default function Sidebar({ onNavigate }) {
  return (
    <div className={styles.sidebar}>
      <h2>Super Admin Dashboard</h2>
      <ul>
        <li>
          <button onClick={() => onNavigate('dashboard')}>Dashboard</button>
        </li>
        <li>
          <button onClick={() => onNavigate('profile')}>Profile</button>
        </li>
        <li>
          <button onClick={() => onNavigate('users')}>User Management</button>
        </li>
        <li>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('userId');
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