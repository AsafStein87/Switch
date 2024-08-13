import React, { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import dayjs from 'dayjs';
import Btn from '../Elements/Btn';
import '../StyleSheets/ShowOffers.css';
import Loader from './Loader';
import Chat from './Chat';
import { getCoordinatesFromZip } from '../Services/geocodeService';  // Import from services
import MapComponent from '../Components/MapComponent';


const wasteTypeImages = {
  'Plastic': [
    '/Images/wasteTypes/plastic1.jpg',
    '/Images/wasteTypes/plastic2.jpg',
    '/Images/wasteTypes/plastic3.jpg',
    '/Images/wasteTypes/plastic4.jpg',
    '/Images/wasteTypes/plastic5.jpg',
    '/Images/wasteTypes/plastic6.jpg',
    '/Images/wasteTypes/plastic7.jpg',
    '/Images/wasteTypes/plastic8.jpg',
  ],
  'Cardboard': [
    '/Images/wasteTypes/cardboard1.jpg',
    '/Images/wasteTypes/cardboard2.jpg',
    '/Images/wasteTypes/cardboard3.jpg',
    '/Images/wasteTypes/cardboard4.jpg',
    '/Images/wasteTypes/cardboard5.jpg',
    '/Images/wasteTypes/cardboard6.jpg',
    '/Images/wasteTypes/cardboard7.jpg',
  ],
  'Paper': [
    '/Images/wasteTypes/paper1.jpg',
    '/Images/wasteTypes/paper2.jpg',
    '/Images/wasteTypes/paper3.jpg',
    '/Images/wasteTypes/paper4.jpg',
    '/Images/wasteTypes/paper5.jpg',
    '/Images/wasteTypes/paper6.jpg',
    '/Images/wasteTypes/paper7.jpg',
    '/Images/wasteTypes/paper8.jpg',
    '/Images/wasteTypes/paper9.jpg',
    '/Images/wasteTypes/paper10.jpg',
  ],
  'Wood': [
    '/Images/wasteTypes/wood1.jpg',
    '/Images/wasteTypes/wood2.jpg',
    '/Images/wasteTypes/wood3.jpg',
    '/Images/wasteTypes/wood4.jpg',
    '/Images/wasteTypes/wood5.jpg',
    '/Images/wasteTypes/wood6.jpg',
    '/Images/wasteTypes/wood7.jpg',
    '/Images/wasteTypes/wood8.jpg',
  ]
};

const wasteTypeMap = {
  'Plastic': 'פלסטיק',
  'Cardboard': 'קרטון',
  'Paper': 'נייר',
  'Wood': 'עץ'
};

const reverseWasteTypeMap = {
  'פלסטיק': 'Plastic',
  'קרטון': 'Cardboard',
  'נייר': 'Paper',
  'עץ': 'Wood'
};

const citiesInIsrael = [
  'Tel Aviv', 'Jerusalem', 'Haifa', 'Beersheba', 'Netanya', 'Ashdod', 'Rishon LeZion', 'Petah Tikva', 'Holon', 'Bnei Brak'
  // Add more cities as needed
];

export default function ShowOffers() {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatOfferId, setChatOfferId] = useState(null);
  const [factoryAddress, setChatFactoryAddress] = useState(null);
  const [wasteTypeFilter, setWasteTypeFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [offerImages, setOfferImages] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [factoryNames, setFactoryNames] = useState({});



  const getAllOffers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5116/api/ViewAllOffers/GetAllOffers");
      const result = await response.json();
      const filtered = result.filter(offer => dayjs(offer.endDate).isAfter(dayjs()));
      console.log(filtered, result);
  
      // Fetch factory names concurrently for valid factory codes
      await Promise.all(filtered
        .filter(offer => offer.factoryCode) // Ensure factoryCode is not null
        .map(offer => fetchFactoryName(offer.factoryCode)));
  
      // Set images
      const initialOfferImages = {};
      filtered.forEach(offer => {
        initialOfferImages[offer.offerCode] = getRandomImage(offer.offerType);
      });
      setOffers(filtered);
      setFilteredOffers(filtered);
      setOfferImages(initialOfferImages);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const fetchFactoryName = async (factoryCode) => {
    if (!factoryCode) {
      console.error('Factory code is null or undefined');
      return;
    }
  
    console.log(`Fetching factory name for code: ${factoryCode}`); // Debug log
    try {
      const response = await fetch(`http://localhost:5116/api/ViewAllOffers/GetFactoryName?factoryCode=${factoryCode}`);
      if (response.ok) {
        const factoryName = await response.text();
        console.log(`Factory Code: ${factoryCode}, Factory Name: ${factoryName}`); // Log the response
        setFactoryNames(prevNames => ({
          ...prevNames,
          [factoryCode]: factoryName
        }));
      } else {
        console.error(`Failed to fetch factory name for code: ${factoryCode}`);
      }
    } catch (error) {
      console.error(`Error fetching factory name for code: ${factoryCode}`, error);
    }
  };
  

  const loadFavorites = () => {
    const userLogIn = localStorage.getItem("factoryName");
    if (!userLogIn) {
      console.error('User is not logged in');
      return;
    }
    
    const favoritesKey = `favorites ${userLogIn}`;
    const storedFavorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
    setFavorites(storedFavorites);
  };

  
  useEffect(() => {
    getAllOffers();
    loadFavorites();
  }, []);



  const handleFilter = () => {
    const filtered = offers.filter(offer => {
      const matchesWasteType = wasteTypeFilter ? offer.offerType === reverseWasteTypeMap[wasteTypeFilter] : true;
      const matchesAmount = amountFilter ? parseFloat(offer.quantity.replace(/[^\d.-]/g, '')) >= parseFloat(amountFilter) : true;
      const matchesLocation = locationFilter ? offer.factoryAddress.includes(locationFilter) : true;
      return matchesWasteType && matchesAmount && matchesLocation;
    });
    setFilteredOffers(filtered);
  };

  const addToFavorites = (offer) => {
    const userLogIn = localStorage.getItem('factoryName');
    if (!userLogIn) {
      console.error('User is not logged in');
      return;
    }
  
    const favoritesKey = `favorites_${userLogIn}`;
    const currentFavorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
    
    // Use the factoryNames state to get the factory name
    const factoryName = factoryNames[offer.factoryCode] || 'מפעל';
  
    const offerWithFactoryName = { ...offer, factoryName };
  
    const offerExists = currentFavorites.some(fav => fav.offerCode === offer.offerCode);
  
    if (!offerExists) {
      const updatedFavorites = [...currentFavorites, offerWithFactoryName];
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      setDialogMessage("!נוסף בהצלחה למועדפים");
      setDialogOpen(true);
    } else {
      console.log("Offer already in favorites.");
      setDialogMessage("ההצעה כבר במועדפים");
      setDialogOpen(true);
    }
  };
  

  const openChat = (offerId, factoryAddress) => {
    setChatOfferId(offerId);
    setChatFactoryAddress(factoryAddress);
  };

  const closeChat = () => {
    setChatOfferId(null);
    setChatFactoryAddress(null);
  };

  const getRandomImage = (wasteType) => {
    const images = wasteTypeImages[wasteType];
    if (!images) {
      return '/images/wasteTypes/defaultPic.jpg'; // Use a default image if wasteType is not found
    }
    return images[Math.floor(Math.random() * images.length)];
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };


  return (
    <div className="offer-container">
      <h1 className="offer-title">הצעות לפינוי</h1>
      <div className="filter-container">
        <div className="filter-form">
          <Btn variant="contained" onClick={handleFilter}>סנן</Btn>
          <FormControl sx={{ minWidth: 200, marginRight: '10px' }}>
            <InputLabel id="waste-type-label"></InputLabel>
            <Select
              labelId="waste-type-label"
              value={wasteTypeFilter}
              onChange={(e) => setWasteTypeFilter(e.target.value)}
              displayEmpty
              sx={{ bgcolor: '#f5f5f5', marginLeft: '10px' }}
            >
              <MenuItem value=""><em>הכל</em></MenuItem>
              {Object.keys(wasteTypeMap).map(key => (
                <MenuItem key={key} value={wasteTypeMap[key]}>
                  {wasteTypeMap[key]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="כמות מינימלית (kg)"
            type="number"
            value={amountFilter}
            onChange={(e) => setAmountFilter(e.target.value)}
            sx={{ marginRight: '10px' }}
          />
          <FormControl sx={{ minWidth: 200, marginRight: '10px' }}>
            <InputLabel id="location-label"></InputLabel>
            <Select
              labelId="location-label"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              displayEmpty
              sx={{ bgcolor: '#f5f5f5', marginLeft: '10px' }}
            >
              <MenuItem value=""><em>הכל</em></MenuItem>
              {citiesInIsrael.map(city => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      {loading && <Loader />}
      <div className="card-container">
        {filteredOffers.map((offer, index) => (
          <Card key={index} className="card">
            <CardMedia
              className="card-media"
              component="img"
              height="140"
              image={offerImages[offer.offerCode] || getRandomImage(offer.offerType)}
              alt="Offer Image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {factoryNames[offer.factoryCode] || 'מפעל'}
                 </Typography>
              <Typography variant="body2" color="text.secondary">
                סוג הצעה: {wasteTypeMap[offer.offerType] || offer.offerType}<br />
                כמות: {offer.quantity}<br />
                כתובת: {offer.factoryAddress}<br />
                תאריך התחלה: {dayjs(offer.startDate).format('YYYY-MM-DD')}<br />
                תאריך סיום: {dayjs(offer.endDate).format('YYYY-MM-DD')}<br />
                תיאור: {offer.description}<br />
                המלצת קבלן: {offer.contractorRecommend}
              </Typography>
            </CardContent>
            <CardActions className="card-actions">
              <Btn size="small" onClick={() => addToFavorites(offer)}>הוספה למועדפים</Btn>
              <Btn size="small" onClick={() => openChat(offer.offerCode, offer.factoryAddress)}>שלח הודעה</Btn>
            </CardActions>
          </Card>
        ))}
      </div>
      {chatOfferId !== null && (
        <Chat offerId={chatOfferId} factoryAddress={factoryAddress} closeChat={closeChat} />
      )}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ direction: 'rtl' }}>הודעה</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>סגור</Button>
        </DialogActions>
      </Dialog>
      {/* <MapComponent zipCodes={filteredOffers.map(offer => offer.zipCode)} /> */}

    </div>
  );
}
