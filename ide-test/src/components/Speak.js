import React from 'react';
import '../styles/speak.css';

const Speak = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick} className="speak-button">{text}</button>
  );
};

export default Speak;