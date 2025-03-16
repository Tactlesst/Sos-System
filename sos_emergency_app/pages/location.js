// pages/location.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
});

export default function Location() {
  const router = useRouter();
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState([8.8174, 124.7770]); // Fixed destination (Cagayan de Oro)

  useEffect(() => {
    const { lat, lng } = router.query;
    if (lat && lng) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      if (!isNaN(latitude) && !isNaN(longitude)) {
        setUserLocation([latitude, longitude]);
        console.log("User Location data: ", [latitude, longitude]); // Debugging
      } else {
        console.error('Invalid latitude or longitude.');
      }
    }
  }, [router.query]);

  return (
    <div>
      <h1>Location</h1>
      {userLocation && destination ? (
        <div>
          <Map userLocation={userLocation} destination={destination} />
        </div>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
}