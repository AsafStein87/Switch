import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, Autocomplete, LoadScript } from '@react-google-maps/api';

const GoogleMapCom = () => {
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: "AIzaSyBV8Cub4EtWCry2Rkh6GDS04oKmpSlpa2w",
  //   async: true,
  // });

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 32.146611,
    lng: 34.8519761,
  };

  // Use state to manage location data (replace with your actual data source)
  const [location, setLocation] = useState({ lat: 32.3248357, lng: 34.852296 }); // Initial state
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Default center (San Francisco)
  const [markerPosition, setMarkerPosition] =   useState(null);
  const mapRef = useRef(null);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();

      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setCenter(location);
        setMarkerPosition(location);
        map.panTo(location);
      } else {
        console.error("No details available for input: '" + place.name + "'");
      }
    } else {
      console.error('Autocomplete is not loaded yet!');
    }
  };

  // useEffect(() => {
  //   if (mapRef.current && location.lat && location.lng) { // Check for valid location data
  //     const map = mapRef.current;

  //     // Clear any existing markers (if needed)
  //     map.markers?.forEach(marker => marker.remove());
  //     map.markers = [];

  //     const marker = new google.maps.marker.AdvancedMarkerElement({
  //       position: location, // Use state variable for location
  //       map: map,
  //     });

  //     map.markers.push(marker);
  //   }
  // }, [isLoaded, location]); // Re-render on load and location change

  const onLoad = (mapInstance) => {   
    setMap(mapInstance);
  };
  console.log(markerPosition)
  return (
    <div style={{ height: "600px", width: "600px" }}>
      <LoadScript
      googleMapsApiKey={"AIzaSyBV8Cub4EtWCry2Rkh6GDS04oKmpSlpa2w"}
      libraries={['places']}
    >
        <Autocomplete
        onLoad={(autoC) => setAutocomplete(autoC)}
        onPlaceChanged={onPlaceChanged}
      >
        <input className='searchBar'
          type="text"
          placeholder="Search for a place"
          style={{
            boxSizing: "border-box",
            border: "1px solid transparent",
            width: "240px",
            height: "32px",
            padding: "0 12px",
            borderRadius: "3px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
            fontSize: "14px",
            outline: "none",
            textOverflow: "ellipses",
            position: "absolute",
            left: "50%",
            marginLeft: "-120px",
            top: "180px",
            zIndex: "10"
          }}
        />
      </Autocomplete>
      
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
        onLoad={onLoad}
      >
        {/* {markerPosition && (
          new google.maps.marker.AdvancedMarkerElement({
            position: markerPosition,
            
            map: map,
          })
        )} */}

      </GoogleMap>
      </LoadScript>
      
    </div>
  );
};

export default GoogleMapCom;
