
//src/Components/MapComponent.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getCoordinatesFromZip } from '../Services/geocodeService';

const MapComponent = ({ zipCodes = [] }) => { // Provide a default empty array
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    if (zipCodes.length > 0) { // Check if zipCodes is not empty
      const fetchCoordinates = async () => {
        const coords = await Promise.all(
          zipCodes.map(async (zipCode) => {
            const { lat, lng } = await getCoordinatesFromZip(zipCode);
            return { lat, lng };
          })
        );
        setCoordinates(coords);
      };

      fetchCoordinates();
    }
  }, [zipCodes]);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {coordinates.map((coord, index) => (
        <Marker key={index} position={[coord.lat, coord.lng]}>
          <Popup>
            <span>Factory Location {index + 1}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    
  );
};

export default MapComponent;
