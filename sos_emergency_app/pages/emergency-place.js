// pages/EmergencyPlace.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '../styles/EmergencyPlace.module.css'; // Keep your existing styles
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
});

const emergencyPlaces = {
  hospital: [8.8174, 124.7770],
  fireStation: [8.8160, 124.7765],
  policeStation: [8.8155, 124.7760],
};

export default function EmergencyPlace() {
  const [userLocation, setUserLocation] = useState(null);
  const [emergencyType, setEmergencyType] = useState('hospital');
  const [objective, setObjective] = useState('');
  const [sosLog, setSosLog] = useState([]);
  const [rescuerLocation, setRescuerLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          updateObjective(latitude, longitude, emergencyType);
          simulateRescuer(latitude, longitude, emergencyType);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [emergencyType]);

  const updateObjective = (latitude, longitude, type) => {
    const destination = emergencyPlaces[type];
    if (destination) {
      setObjective(
        `Rescuer is en route to ${
          type === 'hospital'
            ? 'Hospital'
            : type === 'fireStation'
            ? 'Fire Station'
            : 'Police Station'
        } at [${destination[0].toFixed(4)}, ${destination[1].toFixed(4)}]`
      );
    } else {
      setObjective('Destination not found.');
    }
  };

  const handleEmergencyTypeChange = (e) => {
    setEmergencyType(e.target.value);
  };

  const generateLocationLink = (latitude, longitude) => {
    return `${window.location.origin}/location?lat=${latitude}&lng=${longitude}`;
  };

  const handleSosButtonClick = () => {
    if (userLocation) {
      const timestamp = new Date().toISOString();
      const sosData = {
        timestamp,
        latitude: userLocation[0],
        longitude: userLocation[1],
        emergencyType,
        locationLink: generateLocationLink(userLocation[0], userLocation[1]),
      };

      console.log('SOS Data:', sosData);

      setSosLog((prevLogs) => [...prevLogs, sosData]);
    } else {
      console.error('User location not available.');
    }
  };

  const simulateRescuer = (latitude, longitude, type) => {
    const destination = emergencyPlaces[type];
    if (destination) {
      const rescuerStart = [destination[0] + 0.005, destination[1] - 0.005];
      setRescuerLocation(rescuerStart);
    } else {
      setRescuerLocation(null);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Smart SOS - Emergency Place</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.contentArea}>
          <div className={styles.mapContainer}>
            {userLocation && rescuerLocation ? (
              <Map
                userLocation={userLocation}
                destination={emergencyPlaces[emergencyType]}
                rescuerLocation={rescuerLocation}
              />
            ) : (
              <p>Loading map...</p>
            )}

            {userLocation && (
              <p className={styles.location}>
                Current Location: {userLocation[0].toFixed(6)}, {userLocation[1].toFixed(6)}
              </p>
            )}
          </div>

          <div className={styles.controls}>
            <div className={styles.emergencyType}>
              <label htmlFor="emergencyType">Emergency Type:</label>
              <select id="emergencyType" value={emergencyType} onChange={handleEmergencyTypeChange}>
                <option value="hospital">Hospital</option>
                <option value="fireStation">Fire Station</option>
                <option value="policeStation">Police Station</option>
              </select>
            </div>

            {objective && <p className={styles.objective}>{objective}</p>}

            <button className={styles.sosButton} onClick={handleSosButtonClick}>
              SOS
            </button>
          </div>
        </div>

        <div className={styles.sosConsole}>
          <h3>SOS Log</h3>
          {sosLog.map((log, index) => (
            <div key={index} className={styles.sosLogItem}>
              <p>Timestamp: {log.timestamp}</p>
              <p>Latitude: {log.latitude.toFixed(6)}</p>
              <p>Longitude: {log.longitude.toFixed(6)}</p>
              <p>Emergency: {log.emergencyType}</p>
              {log.locationLink && (
                <p>
                  Location Link: <a href={log.locationLink} target="_blank" rel="noopener noreferrer">{log.locationLink}</a>
                </p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}