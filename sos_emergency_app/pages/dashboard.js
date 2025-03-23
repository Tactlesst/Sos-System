import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard({ user: initialUser }) {
  const router = useRouter(); // Initialize router
  const [user, setUser] = useState(initialUser); // Use state to manage user data
  const [loading, setLoading] = useState(!initialUser); // Set loading based on initialUser

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    // If no token or userId, redirect to /auth and stop further execution
    if (!token || !userId) {
      router.push('/auth');
      return; // Stop here if not authenticated
    }

    // If authenticated and initialUser is not provided, fetch user data
    if (!initialUser) {
      fetchUserData(token, userId);
    }
  }, [router, initialUser]);

  // Fetch user data
  const fetchUserData = async (token, userId) => {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load user data');
      router.push('/auth'); // Redirect to auth if fetching fails
    } finally {
      setLoading(false); // Stop loading after fetch completes
    }
  };

  const formatDateOfBirth = (dob) => {
    const date = new Date(dob);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Show loading state if user data is not yet available
  if (loading) {
    return <p>Loading...</p>;
  }

  // If no user data, show nothing (or a message)
  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.firstName} {user.lastName}!</p>
      <p>Phone: {user.phone}</p>
      <p>Date of Birth: {formatDateOfBirth(user.dob)}</p>
      <ToastContainer />
    </div>
  );
}