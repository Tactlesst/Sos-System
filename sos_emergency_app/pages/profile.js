import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout';


export default function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dob: '',
  });
  const router = useRouter();

  const formatDateForInput = (dob) => {
    if (!dob) {
      return ''; // Return an empty string if dob is missing or invalid
    }

    const date = new Date(dob);
    if (isNaN(date.getTime())) {
      return ''; // Return an empty string if the date is invalid
    }

    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
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
        console.log('API Response:', data); // Log the API response

        setUser(data);
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          dob: formatDateForInput(data.dob), // Use the formatted date
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data');
        router.push('/auth');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const data = await response.json();
      setUser(data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
      toast.error('Failed to update profile');
    }
  };

  if (!user) {
    return
  }

  return (
    <Layout>
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
    </Layout>
  );
}