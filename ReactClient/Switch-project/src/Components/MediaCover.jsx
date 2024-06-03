import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Btn from '../Elements/Btn';


export default function MediaCover() {
  const navigate = useNavigate();
  const factoryName = localStorage.getItem("factoryName");
  const enterClick = () => {
    if (factoryName) {
      navigate('/OffersPage', { state: {} });
    } else {
      navigate('/SignInPage', { state: {} });
    }
  };

  const enterClick1 = () => {
    if (factoryName) {
      navigate('/NewOfferPage', { state: {} });
    } else {
      navigate('/SignInPage', { state: {} });
    }
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div style={{ width: '100%',  height: "auto", aspectRatio: '16/9', position: 'relative', overflow: 'hidden' }}>
        <video
          autoPlay
          loop
          muted
          poster="/Images/homeVideo.mp4"
          style={{ width: '100%', height: '80%', objectFit: 'cover' , marginBottom: '20px' }}
        >
         
          <source
            src="/Images/homeVideo.mp4"
            type="video/mp4"
          />
           
        </video>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px' }}>
          
        <Btn onClick={enterClick}> לקנות חומר גלם</Btn>
        <Btn onClick={enterClick1}> לפנות פסולת</Btn></div>
      </div>
    </div>
  );
}
