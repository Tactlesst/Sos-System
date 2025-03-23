// components/SuperAdminProfile.js
import styles from '../styles/SuperAdminProfile.module.css';

export default function SuperAdminProfile({ user }) {
  return (
    <div className={styles.profile}>
      <h1>Super Admin Profile</h1>
      <p>Name: {user?.firstName} {user?.lastName}</p>
      <p>Email: {user?.email}</p>
      <p>Phone: {user?.phone}</p>
    </div>
  );
}