import * as React from 'react';

const PicCover = ({ src }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div style={{ width: '100%', height: 'auto', aspectRatio: '16/9', position: 'relative' , overflow: 'hidden'}}>
        <img
          src={src}
          alt={src}
          style={{ width: '100%', height: '50%', objectFit: 'cover' }}
        /> 
      </div>
    </div>
  );
}

export default PicCover;
