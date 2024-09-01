import React, { useEffect, useState }  from 'react';
import PicCover from '../Components/PicCover';
import Box from '@mui/material/Box';
import Loader from '../Components/Loader';

export const ActivitiesPage = () => {
  console.log(<PicCover/>)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => { //פונקציה של JS שעושה השהייה להרצה 
      setLoading(false);
    }, 300); 

    return () => clearTimeout(timer); // מבטיח שאם הקומפוננטה מתנתקת לפני סיום הזמן, הזמן שהקצבנו נמחק כדי למנוע ניסיון לעדכן את המצב של קומפוננטה לא מותקנת.
  }, []);

  return (
    <div>
      <br />
      {loading && <Loader />}
      {!loading && (
        <>
      <h1 style={{ paddingTop: '40px', color: '#378143' }}>תחומי פעילות</h1>
      <div style={{ position: 'relative', height: '100vh' }}>
      <PicCover src="./Images/activities.jpg" />
      

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
          <h2 style={{ marginBottom: '10px' }}>
          ?מה תוכלו לעשות באתר
          </h2>
          <h4 style={{ marginBottom: '10px' }}>
באתר יש לכם שתי אפשרויות: תכולו להסתכל על ההצעות הרבות ולבחור אחת מהן, או שתוכלו להעלות הצעה לאתר </h4>
<h4 style={{ marginBottom: '10px' }}>כל מה שאתם צריכים לעשות הוא להירשם לאתר, וזהו! תוכלו להציע את ההצעה החלומית שכל בעל עסק ירצה לקחת</h4>
<h4 style={{ marginBottom: '10px' }}>
תוכלו לבחור הצעה עפ"י מקום, סוג הפסולת וכמות הפסולת שתרצו. בסוף תוכלו לתקשר עם בעלי המפעל שהציעו את ההצעה ולסכם ביניכם את אפשרויות השינוע</h4>
          <h1>
            הזבל שלו הוא האוצר שלך
          </h1>
          <img src='./Images/icons-recycle.png' style={{height:"80px"}}></img>
        </Box>
      </div>
      </>
      )}
    </div>
  );
};
