import React, { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Loader from './Loader';

export default function ShowOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
      <h1 style={{ color: "green" }}>הצעות לפינוי</h1>
      {loading && <Loader/>}
      {offers.map((offer, index) => (
        <Card key={index} sx={{ marginBottom: 8, maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/Images/pexels-pixabay-247763.jpg"
            title="Offer Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {offer.factoryAddress}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <p>{offer.offerCode}</p>
              <p>{offer.offerType}</p>
              <p>{offer.quantity}</p>
              <p>{offer.startDate}</p>
              <p>{offer.endDate}</p>
              <p>{offer.description}</p>
              <p>{offer.contractorRecommend}</p>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">הוספה למועדפים</Button>
            <Button size="small">שלח הודעה</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
