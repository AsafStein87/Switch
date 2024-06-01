import React from 'react';
import { Link } from 'react-router-dom';
import MediaCover from '../Components/MediaCover'; 



export default function HomePge() {
  return (
    <div className="home-container">
      <h1 style={{ paddingTop: "90px", color: '#378143'}}>'ברוכים הבאים לאתר סוויצ</h1>

      <MediaCover />
      
      
    </div>
  );
}
