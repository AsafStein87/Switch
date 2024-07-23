import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chat from './Chat'; // Assuming you have Chat component defined
import '../StyleSheets/CustomCard.css'; // Adjust the path as per your file structure

export default function CustomCard({ offer, openChat, chatOfferId }) {
  return (
    <div className="card wallet">
      <div className="overlay"></div>
      <div className="circle">
        <svg
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="23 29 78 60"
          height="60px"
          width="78px"
        >
          <defs></defs>
          <g
            transform="translate(23.000000, 29.500000)"
            fill-rule="evenodd"
            fill="none"
            stroke-width="1"
            stroke="none"
            id="icon"
          >
            {/* Your SVG elements */}
          </g>
        </svg>
      </div>
      <p>{offer.factoryAddress}</p>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {offer.factoryAddress}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            קוד הצעה: {offer.offerCode}<br />
            סוג הצעה: {offer.offerType}<br />
            כמות: {offer.quantity}<br />
            תאריך התחלה: {offer.startDate}<br />
            תאריך סיום: {offer.endDate}<br />
            תיאור: {offer.description}<br />
            המלצת קבלן: {offer.contractorRecommend}<br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">הוספה למועדפים</Button>
          <Button size="small" onClick={() => openChat(offer.offerId, offer.offerCode)}>
            שלח הודעה
          </Button>
        </CardActions>
      </Card>
      {chatOfferId === offer.offerId && (
        <Chat offerId={offer.offerId} closeChat={() => setChatOfferId(null)} />
      )}
    </div>
  );
}
