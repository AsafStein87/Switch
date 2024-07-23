import React from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Favorites = ({ favorite, removeFavorite }) => {
  return (
    <Card className="card">
      <CardMedia
        className="card-media"
        component="img"
        height="140"
        image={favorite.imageUrl || "https://cdn.pixabay.com/photo/2016/12/03/17/38/building-1880261_1280.jpg"} 
        alt="Favorite Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {favorite.companyName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          חומר גלם: {favorite.offerType}<br />
          תיאור: {favorite.description}<br />
          כמות: {favorite.quantity}
        </Typography>
      </CardContent>
      <CardActions className="card-actions">
        <Button size="small" color="error" onClick={() => removeFavorite(favorite.id)}>הסר מהמועדפים</Button>
      </CardActions>
    </Card>
  );
};

export default Favorites;
