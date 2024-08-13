import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;  // Access environment variable correctly for Vite

export const getCoordinatesFromZip = async (zipCode) => {
  try {
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: zipCode,
        key: API_KEY,
        pretty: 1,
      },
    });
    if (response.data.results && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lng };
    } else {
      console.error('No results found for the given zip code');
      return { lat: 0, lng: 0 };  // Default values in case of no results
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return { lat: 0, lng: 0 };  // Default values in case of error
  }
};
