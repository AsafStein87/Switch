import React, { useState } from 'react';
import RoundedImage from 'react-rounded-image';

const ImageButtons = ({ onImageClick }) => {
  const images = [
    { src: '/Images/Paper.jpg', alt: 'Paper' },
    { src: '/Images/Cardboard.jpg', alt: 'Cardboard' },
    { src: '/Images/Plastic.jpg', alt: 'Plastic' },
    { src: '/Images/Wood.jpg', alt: 'Wood' }
  ];

  const hebrewWaste = ['נייר', 'קרטון', 'פלסטיק', 'עץ'];

  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (alt) => {
    setSelectedOption(alt);
    onImageClick(alt);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => handleClick(image.alt)}
          style={{
            border: 'none',
            background: 'none',
            outline: 'none', 
          }}
        >
          <RoundedImage
            image={image.src}
            roundedColor="#378143"
            imageWidth={selectedOption === image.alt ? "135" : "100"} // מגדיל את הכפתור בהתאם לבחירת המשתמש
            imageHeight={selectedOption === image.alt ? "135" : "100"} 
            roundedSize="5"
            borderRadius="70"
          />
          <h5 style={{ color: '#378143' }}>{hebrewWaste[index]}</h5>
        </button>
      ))}
    </div>
  );
};

export default ImageButtons;
