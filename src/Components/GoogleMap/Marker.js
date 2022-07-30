import React from 'react';

const Marker = ({ text, ...props }) => (
  <div
    {...props}
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '48px',
      height: '48px',
      backgroundColor: '#730000',
      border: '2px solid #FFFFFF',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#FFFFFF',
      fontSize: '14px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '6px 4px 30px 7px rgba(0,0,0,0.57)',
    }}
  >
    {text}
  </div>
);

export default Marker;
