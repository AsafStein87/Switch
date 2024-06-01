import React from 'react';
import PicCover from '../Components/PicCover';
import Box from '@mui/material/Box';

export const WhoWeArePage = () => {
  return (
    <div>
      <br />
      <h1 style={{ paddingTop: '40px', color: '#378143' }}>מי אנחנו</h1>
      <div style={{ position: 'relative', height: '100vh' }}>
      <PicCover src="http://localhost:5174/Images/whoweare.jpg" />

        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '500px', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid grey',
            bgcolor: 'rgba(221, 236, 233, 0.8)',
            boxShadow: 3,
            borderRadius: 8,
            p: 2,
            textAlign: 'center' 
          }}
        >
          <h2 style={{ marginBottom: '20px' }}>
            ברוכים הבאים לאתר סוויצ'. האתר עוסק בכלכלה שיתופית כאשר כל עסק יכול להציע הצעה לפינוי פסולת ואתם יכולים לקנות את הפסולת ולהפוך אותה לחומר הגלם שלכם.
            אנחנו מאמינים שכל פסולת אפשר להשמיש לחומר גלם
          </h2>
          <h3 style={{ marginBottom: '20px' }}>
            האתר הוקם לאחר חשיבה מעמיקה עם חזון שאפתני: אנחנו רוצים ליצור שיתופיות בקהילה ואיזורי תעשייה, לחסוך בכמויות הפסולת וליצור ערך משותף של איכות הסביבה
          </h3>
          <h1>
            הזבל שלו הוא האוצר שלך
          </h1>
          <img src='http://localhost:5174/Images\icons-recycle.png' style={{height:"50px"}}></img>
        </Box>
      </div>
    </div>
  );
};
