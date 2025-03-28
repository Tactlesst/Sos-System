// components/LocationPicker.js
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function LocationPicker({ onLocationSelect, initialPosition }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const mapInstance = L.map('map').setView(
      [initialPosition?.lat || 0, initialPosition?.lng || 0], 
      13
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapInstance);

    const newMarker = L.marker(
      [initialPosition?.lat || 0, initialPosition?.lng || 0],
      { draggable: true }
    ).addTo(mapInstance);

    newMarker.on('dragend', (e) => {
      const { lat, lng } = e.target.getLatLng();
      onLocationSelect({ lat, lng });
    });

    mapInstance.on('click', (e) => {
      const { lat, lng } = e.latlng;
      newMarker.setLatLng([lat, lng]);
      onLocationSelect({ lat, lng });
    });

    setMap(mapInstance);
    setMarker(newMarker);

    return () => {
      mapInstance.remove();
    };
  }, []);

  return <div id="map" style={{ height: '400px', width: '100%' }} />;
}