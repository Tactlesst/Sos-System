import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  // Function to format the date of birth
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
        window.location.href = '/';
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
        alert('Failed to fetch user data');
        window.location.href = '/auth';
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      toast.success('Logged out successfully!');
      setTimeout(() => {
        window.location.href = '/auth';
      }, 2000); // Redirect after 2 seconds
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.firstName} {user.lastName}!</p>
      <p>Phone: {user.phone}</p>
      <p>Date of Birth: {formatDateOfBirth(user.dob)}</p>

      <button onClick={handleLogout}>Logout</button>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}