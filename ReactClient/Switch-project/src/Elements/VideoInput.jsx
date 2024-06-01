import React from 'react';

export default function VideoInput({ width, height }) {
  return (
    <div>
      <video width={width} height={height} controls>
        <source src="your-video-source.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
