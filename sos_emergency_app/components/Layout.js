import Sidebar from '../pages/Sidebar';
import styles from '../styles/Layout.module.css'; // Optional: Add CSS for layout

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}