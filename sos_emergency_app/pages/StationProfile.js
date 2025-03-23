// components/StationProfile.js
import styles from '../styles/StationProfile.module.css';

export default function StationProfile({ station }) {
  return (
    <div className={styles.profile}>
      <h1>Station Profile</h1>
      <p>Name: {station?.name}</p>
      <p>Location: {station?.location}</p>
      <p>Contact: {station?.contact}</p>
      <p>Email: {station?.email}</p>
    </div>
  );
}