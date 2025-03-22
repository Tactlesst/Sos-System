import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Sidebar.module.css'; // Import the CSS module
import { toast } from 'react-toastify'; // Import toast for notifications

export default function Sidebar() {
  const router = useRouter();

  // Define the sidebar links
  const links = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/profile', label: 'Profile' },
    { path: '/settings', label: 'Settings' },
    { path: '/reports', label: 'Reports' },
  ];

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      toast.success('Logged out successfully!');
      setTimeout(() => {
        router.push('/auth');
      }, 2000);
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="My App Logo" className={styles.logoImage} />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {links.map((link) => (
            <li key={link.path} className={styles.navItem}>
              <Link
                href={link.path}
                className={`${styles.link} ${router.pathname === link.path ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className={styles.navItem}>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}