// components/UserManagement.js
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/UserManagement.module.css';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStationId, setEditingStationId] = useState(null);
  const [editedStationName, setEditedStationName] = useState('');

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

  // Get user full name by ID
  const getUserNameById = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
  };

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
      const response = await fetch(`/api/stationdelete?name=${encodeURIComponent(stationName)}`, {
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

  // Handle station name edit
  const handleEditStation = (station) => {
    setEditingStationId(station.id);
    setEditedStationName(station.name);
  };

  // Handle station name update
  const handleUpdateStationName = async (stationId) => {
    if (!editedStationName.trim()) {
      toast.error('Station name cannot be empty');
      return;
    }

    try {
      const response = await fetch('/api/stationedit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: stationId,
          newName: editedStationName 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update station name');
      }

      setStations((prevStations) =>
        prevStations.map((station) =>
          station.id === stationId
            ? { ...station, name: editedStationName }
            : station
        )
      );
      setEditingStationId(null);
      toast.success('Station name updated successfully');
    } catch (error) {
      console.error('Error updating station name:', error);
      toast.error(error.message);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingStationId(null);
    setEditedStationName('');
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
            <th>Owner</th>
            <th>Staff Count</th>
            <th>Active Operations</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station) => (
            <tr key={station.id}>
              <td>{station.id}</td>
              <td>
                {editingStationId === station.id ? (
                  <input
                    type="text"
                    value={editedStationName}
                    onChange={(e) => setEditedStationName(e.target.value)}
                    className={styles.editInput}
                  />
                ) : (
                  station.name
                )}
              </td>
              <td>{station.location}</td>
              <td>{getUserNameById(station.userId)}</td>
              <td>{station.staffCount}</td>
              <td>{station.activeOperations}</td>
              <td>
                {editingStationId === station.id ? (
                  <>
                    <button 
                      onClick={() => handleUpdateStationName(station.id)}
                      className={styles.saveButton}
                    >
                      Save
                    </button>
                    <button 
                      onClick={handleCancelEdit}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => handleEditStation(station)}
                      className={styles.editButton}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteStation(station.id)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}