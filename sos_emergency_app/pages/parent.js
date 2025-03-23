import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../pages/Sidebar';
import Profile from '../pages/profile';
import Dashboard from '../pages/dashboard';
import styles from '../styles/Parent.module.css';

export default function Parent() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      // Redirect if token or userId is missing
      if (!token || !userId) {
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
        setUser(data); // Set user data
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data');
        router.push('/auth');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'profile':
        return <Profile user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.sidebarContainer}>
        <Sidebar onNavigate={setActiveComponent} />
      </div>
      <div className={styles.contentContainer}>
        {renderComponent()}
      </div>
      <ToastContainer />
    </div>
  );
}