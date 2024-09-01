import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, CardMedia, Typography, Button } from '@mui/material';
import Loader from '../Components/Loader';
import '../StyleSheets/FavoritesPage.css'; // For custom styling

const wasteTypeImages = {
  'Plastic': [
    './Images/wasteTypes/plastic1.jpg',
    './Images/wasteTypes/plastic2.jpg',
    './Images/wasteTypes/plastic3.jpg',
    './Images/wasteTypes/plastic4.jpg',
    './Images/wasteTypes/plastic5.jpg',
    './Images/wasteTypes/plastic6.jpg',
    './Images/wasteTypes/plastic7.jpg',
    './Images/wasteTypes/plastic8.jpg',
  ],
  'Cardboard': [
    './Images/wasteTypes/cardboard1.jpg',
    './Images/wasteTypes/cardboard2.jpg',
    './Images/wasteTypes/cardboard3.jpg',
    './Images/wasteTypes/cardboard4.jpg',
    './Images/wasteTypes/cardboard5.jpg',
    './Images/wasteTypes/cardboard6.jpg',
    './Images/wasteTypes/cardboard7.jpg',
  ],
  'Paper': [
    './Images/wasteTypes/paper1.jpg',
    './Images/wasteTypes/paper2.jpg',
    './Images/wasteTypes/paper3.jpg',
    './Images/wasteTypes/paper4.jpg',
    './Images/wasteTypes/paper5.jpg',
    './Images/wasteTypes/paper6.jpg',
    './Images/wasteTypes/paper7.jpg',
    './Images/wasteTypes/paper8.jpg',
    './Images/wasteTypes/paper9.jpg',
    './Images/wasteTypes/paper10.jpg',
  ],
  'Wood': [
    './Images/wasteTypes/wood1.jpg',
    './Images/wasteTypes/wood2.jpg',
    './Images/wasteTypes/wood3.jpg',
    './Images/wasteTypes/wood4.jpg',
    './Images/wasteTypes/wood5.jpg',
    './Images/wasteTypes/wood6.jpg',
    './Images/wasteTypes/wood7.jpg',
    './Images/wasteTypes/wood8.jpg',
  ]
};

const wasteTypeMap = {
  'Plastic': 'פלסטיק',
  'Cardboard': 'קרטון',
  'Paper': 'נייר',
  'Wood': 'עץ'
};

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    setLoading(true);

    const userLogIn = localStorage.getItem('factoryName');
    if (!userLogIn) {
      console.error('User is not logged in');
      setLoading(false);
      return;
    }

    const favoritesKey = `favorites_${userLogIn}`;
    const storedFavorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
    console.log('Stored Favorites:', storedFavorites); // Debug log

    setFavorites(storedFavorites);
    setLoading(false);
  };

  const removeFavorite = (offerCode) => {
    const userLogIn = localStorage.getItem('factoryName');
    if (!userLogIn) {
      console.error('User is not logged in');
      return;
    }

    const favoritesKey = `favorites_${userLogIn}`;
    const updatedFavorites = favorites.filter(favorite => favorite.offerCode !== offerCode);
    setFavorites(updatedFavorites);
    localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
  };

  const getRandomImage = (wasteType) => {
    const images = wasteTypeImages[wasteType];
    if (!images) {
      return './Images/wasteTypes/defaultPic.jpg'; // Use a default image if wasteType is not found
    }
    return images[Math.floor(Math.random() * images.length)];
  };

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">המועדפים שלי</h1>
      {loading && <Loader />}
      <div className="card-container">
        {favorites.map((favorite, index) => (
          <Card key={index} className="card">
            <CardMedia
              className="card-media"
              component="img"
              height="140"
              image={getRandomImage(favorite.offerType)}
              alt="Offer Image"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {favorite.factoryName || 'מפעל'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              סוג הצעה: {wasteTypeMap[favorite.offerType] || favorite.offerType}<br />
              כמות: {favorite.quantity}<br />
              כתובת: {favorite.factoryAddress}<br />
              תאריך התחלה: {new Date(favorite.startDate).toLocaleDateString()}<br />
              תאריך סיום: {new Date(favorite.endDate).toLocaleDateString()}<br />
              תיאור: {favorite.description}<br />
              המלצת קבלן: {favorite.contractorRecommend}
            </Typography>
          </CardContent>
            <CardActions className="card-actions">
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => removeFavorite(favorite.offerCode)}
              >
                הסר מהמועדפים
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
