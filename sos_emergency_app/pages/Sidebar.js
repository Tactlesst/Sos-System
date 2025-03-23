import React from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import styles from '../styles/Sidebar.module.css'; // Import the CSS module
import { toast } from 'react-toastify'; // Import toast for notifications
import Swal from 'sweetalert2'; // Import SweetAlert

const Sidebar = React.memo(({ onNavigate }) => { // Memoize the component
  const router = useRouter(); // Initialize the router

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to log out. Do you want to continue?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Log out',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        toast.success('Logged out successfully!');
        setTimeout(() => {
          router.push('/auth'); // Use the router to navigate
        }, 2000);
      }
    });
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="My App Logo" className={styles.logoImage} />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <button onClick={() => onNavigate('dashboard')} className={styles.link}>
              Dashboard
            </button>
          </li>
          <li className={styles.navItem}>
            <button onClick={() => onNavigate('profile')} className={styles.link}>
              Profile
            </button>
          </li>
          <li className={styles.navItem}>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
});

export default Sidebar;