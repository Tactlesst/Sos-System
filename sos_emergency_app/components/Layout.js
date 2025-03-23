import Sidebar from '../pages/Sidebar';
import React from 'react';
import styles from '../styles/Layout.module.css'; // Import the CSS module

// Define the sidebar links outside the component
const links = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/profile', label: 'Profile' },
  { path: '/settings', label: 'Settings' },
  { path: '/reports', label: 'Reports' },
];

const Layout = React.memo(({ children, hideSidebar = false }) => { // Memoize the parent component
  return (
    <div className={styles.container}>
      {!hideSidebar && <Sidebar />} {/* Conditionally render the Sidebar */}
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
});
export default Layout;