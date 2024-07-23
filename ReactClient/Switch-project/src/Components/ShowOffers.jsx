import React, { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ref, remove } from 'firebase/database';
import { database } from './Firebase';
import Loader from './Loader';
import Chat from './Chat';
import '../StyleSheets/ShowOffers.css';

export default function ShowOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatOfferId, setChatOfferId] = useState(null);
  const [factoryAddress, setChatFactoryAddress] = useState(null);

  const getAllOffers = () => {
    setLoading(true);
    const requestOptions = {
      method: "GET",
    };

    fetch("http://localhost:5116/api/ViewAllOffers/GetAllOffers", requestOptions)
      .then(response => response.json())
      .then(result => {
        setOffers(result);
        setLoading(false);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    getAllOffers();
  }, []);

  const addToFavorites = (offerId) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ offerId: offerId }),
    };

    fetch("http://localhost:5116/api/ShowFavorites/AddToFavorite", requestOptions)
      .then(response => {
        if (response.ok) {
          console.log("Offer added to favorites!");
        } else {
          console.error("Failed to add offer to favorites");
        }
      })
      .catch(error => console.error(error));
  };

  const openChat = (offerId, factoryAddress) => {
    setChatOfferId(offerId); // Set the specific offerId for the chat
    setChatFactoryAddress(factoryAddress);
  };

  const closeChat = () => {
    if (chatOfferId) {
      const messagesRef = ref(database, `chats/${chatOfferId}`);
      remove(messagesRef)
        .then(() => {
          console.log(`Messages for offer ${chatOfferId} deleted.`);
          setChatOfferId(null); // Close the chat
        })
        .catch((error) => {
          console.error("Error deleting messages:", error);
          setChatOfferId(null); // Ensure chat still closes even if error occurs
        });
    } else {
      setChatOfferId(null);
    }
  };

  return (
    <div className="offer-container">
      <h1 className="offer-title">הצעות לפינוי</h1>
      {loading && <Loader />}
      <div className="card-container">
        {offers.map((offer, index) => (
          <Card key={index} className="card">
            <CardMedia
              className="card-media"
              component="img"
              height="140"
              image="/Images/pexels-pixabay-247763.jpg"
              alt="Offer Image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {offer.factoryAddress}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                סוג הצעה: {offer.offerType}<br />
                כמות: {offer.quantity}<br />
                תאריך התחלה: {offer.startDate}<br />
                תאריך סיום: {offer.endDate}<br />
                תיאור: {offer.description}<br />
                המלצת קבלן: {offer.contractorRecommend}
              </Typography>
            </CardContent>
            <CardActions className="card-actions">
              <Button size="small" onClick={() => addToFavorites(offer.offerId)}>הוספה למועדפים</Button>
              <Button size="small" onClick={() => openChat(offer.offerId, offer.factoryAddress)}>שלח הודעה</Button>
            </CardActions>
          </Card>
        ))}
      </div>
      {chatOfferId !== null && (
        <Chat offerId={chatOfferId} factoryAddress={factoryAddress} closeChat={closeChat} /> // Pass the specific offerId to Chat component
      )}
    </div>
  );
}
