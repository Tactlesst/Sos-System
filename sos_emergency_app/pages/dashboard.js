import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout'; // Import the Layout component
import styles from '../styles/Sidebar.module.css'; // Import the CSS module
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const formatDateOfBirth = (dob) => {
    const date = new Date(dob);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

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
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data');
        router.push('/auth');
      }
    };

    fetchUserData();
  }, []);



  if (!user) {
    return
  }

  return (
    <Layout>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome, {user.firstName} {user.lastName}!</p>
        <p>Phone: {user.phone}</p>
        <p>Date of Birth: {formatDateOfBirth(user.dob)}</p>


        {/* Toast Container */}
        <ToastContainer />
      </div>
    </Layout>
  );
}