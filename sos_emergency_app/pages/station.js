// pages/station.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../pages/stationSidebar';
import StationDashboard from '../pages/StationDashboard';
import StationProfile from '../pages/StationProfile';
import styles from '../styles/Station.module.css';

export default function Station() {
  const router = useRouter();
  const [station, setStation] = useState(null);
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStationData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const userType = localStorage.getItem('userType');

      // Redirect if token, userId, or userType is missing or incorrect
      if (!token || !userId || userType !== 'station') {
        toast.error('Access Denied: You do not have permission to access this page.');
        router.push('/auth');
        return;
      }

      try {
        const response = await fetch(`/api/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch station data');
        }

        const data = await response.json();
        setStation(data); // Set station data
      } catch (error) {
        console.error('Error fetching station data:', error);
        toast.error('Failed to fetch station data');
        router.push('/auth');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchStationData();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <StationDashboard station={station} />;
      case 'profile':
        return <StationProfile station={station} />;
      default:
        return <StationDashboard station={station} />;
    }
  };

  return (
    <div className={styles.stationContainer}>
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