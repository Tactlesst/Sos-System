// components/UserManagement.js
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/UserManagement.module.css';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users and stations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, stationsResponse] = await Promise.all([
          fetch('/api/manageuser'),
          fetch('/api/stations'),
        ]);

        if (!usersResponse.ok || !stationsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const usersData = await usersResponse.json();
        const stationsData = await stationsResponse.json();

        setUsers(usersData);
        setStations(stationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle user role update
  const handleUpdateRole = async (userId, newRole) => {
    try {
      const response = await fetch(`/api/manageuser/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      const updatedUser = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? updatedUser : user))
      );
      toast.success('Role updated successfully');
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update role');
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/manageuser/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  // Handle station deletion
  const handleDeleteStation = async (stationId) => {
    try {
      const response = await fetch(`/api/stations/${stationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete station');
      }

      setStations((prevStations) =>
        prevStations.filter((station) => station.id !== stationId)
      );
      toast.success('Station deleted successfully');
    } catch (error) {
      console.error('Error deleting station:', error);
      toast.error('Failed to delete station');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.userManagement}>
      <h1>User Management</h1>
      <ToastContainer />

      <h2>Users</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.userType}
                  onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="station">Station</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Stations</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station) => (
            <tr key={station.id}>
              <td>{station.id}</td>
              <td>{station.name}</td>
              <td>{station.location}</td>
              <td>
                <button onClick={() => handleDeleteStation(station.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}