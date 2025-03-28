// pages/super_admin/index.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../pages/AdminSidebar';
import SuperAdminDashboard from '../pages/SuperAdminDashboard';
import SuperAdminProfile from '../pages/SuperAdminProfile';
import UserManagement from '../pages/UserManagement';
import styles from '../styles/SuperAdmin.module.css';

export default function SuperAdmin() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeComponent, setActiveComponent] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      return localStorage.getItem('superAdminActiveComponent') || 'dashboard';
    }
    return 'dashboard';
  });
  const [loading, setLoading] = useState(true);

  // Custom function to set active component and persist to localStorage
  const handleSetActive = (component) => {
    setActiveComponent(component);
    localStorage.setItem('superAdminActiveComponent', component);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const userType = localStorage.getItem('userType');

      if (!token || !userId || userType !== 'super_admin') {
        toast.error('Access Denied: You do not have permission to access this page.');
        router.push('/auth');
        return;
      }

      try {
        const response = await fetch(`/api/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data');
        router.push('/auth');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <SuperAdminDashboard user={user} />;
      case 'profile':
        return <SuperAdminProfile user={user} />;
      case 'users':
        return <UserManagement user={user} />;
      default:
        return <SuperAdminDashboard user={user} />;
    }
  };

  return (
    <div className={styles.superAdminContainer}>
      <div className={styles.sidebarContainer}>
        <Sidebar 
          activeComponent={activeComponent}
          onNavigate={handleSetActive}
        />
      </div>
      <div className={styles.contentContainer}>
        {renderComponent()}
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}