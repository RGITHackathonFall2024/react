import React from 'react';
import './LoadingEllipsis.css';

const LoadingEllipsis = ({ color = '#1c4c5b' }) => {
  return (
    <div className="lds-ellipsis" style={{ color }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingEllipsis;