import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Loader from '../Components/Loader';  
import Favorites from '../Components/Favorites';  
import '../StyleSheets/ShowOffers.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const factoryCode = localStorage.getItem('FactoryCode');
  const offerCode = localStorage.getItem('offerCode');

  useEffect(() => {
    console.log("FactoryCode from localStorage:", factoryCode);
    if (factoryCode) {
      fetchFavorites(factoryCode);
    } else {
      console.error("FactoryCode is not found in localStorage.");
    }
  }, [factoryCode]);

  const fetchFavorites = (factoryCode) => {
    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const url = `http://localhost:5116/api/ShowFavorites/GetFavorites?FactoryCode=${factoryCode}`;
    
    fetch(url, requestOptions)
      .then(response => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        console.log("API result:", result);
        if (Array.isArray(result)) {
          setFavorites(result);
        } else {
          setFavorites([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  };

  const removeFavorite = (offerCode) => {
    const updatedFavorites = favorites.filter(favorite => favorite.offerCode !== offerCode);
    setFavorites(updatedFavorites);
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };

    const url = `http://localhost:5116/api/ShowFavorites/DeleteFavorite?FactoryCode=${factoryCode}&OfferCode=${offerCode}`;
  
    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Favorite successfully deleted from database.");
      })
      .catch(error => {
        console.error("Error deleting favorite from database:", error);
      });
  };

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">המועדפים שלי</h1>
      {loading && <Loader />}
      <div className="card-container">
        {favorites.map((favorite, index) => (
          <Favorites key={index} favorite={favorite} removeFavorite={() => removeFavorite(favorite.offerCode)} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
