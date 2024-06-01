import React from 'react'
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ShowOffers(props) {
const { offer } = props;

    

  return (
    <>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="http://localhost:5174/Images/pexels-pixabay-247763.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        <p>{offer.factoryAddress}</p>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <p>{offer.offerCode}</p>
        <p>{offer.offerType}</p>
        <p>{offer.quantity}</p>
        <p>{offer.factoryAddress}</p>
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
    <br></br>

    </>
  );
  
}
