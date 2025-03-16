// components/Map.js
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Map({ userLocation, destination }) {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (
      userLocation &&
      destination &&
      Array.isArray(userLocation) &&
      userLocation.length === 2 &&
      Array.isArray(destination) &&
      destination.length === 2 &&
      !isNaN(userLocation[0]) &&
      !isNaN(userLocation[1]) &&
      !isNaN(destination[0]) &&
      !isNaN(destination[1])
    ) {
      try {
        const map = L.map('map').setView(userLocation, 13);
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Add markers
        L.marker(userLocation).addTo(map).bindPopup('Your current location');
        L.marker(destination).addTo(map).bindPopup('Destination');

        // Simplified Routing
        const routingControl = L.Routing.control({
          waypoints: [L.latLng(userLocation), L.latLng(destination)],
        }).addTo(map);
        routingControlRef.current = routingControl;

        return () => {
          if (mapRef.current) {
            if (routingControlRef.current) {
              mapRef.current.removeControl(routingControlRef.current);
              routingControlRef.current = null;
            }
            mapRef.current.remove();
            mapRef.current = null;
          }
        };
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    } else {
      console.error('Invalid userLocation or destination:', userLocation, destination);
    }
  }, [userLocation, destination]);

  return <div id="map" style={{ height: '400px', width: '100%' }} />;
}