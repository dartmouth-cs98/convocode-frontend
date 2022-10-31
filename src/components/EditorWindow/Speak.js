import React from 'react';

const Speak = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick} className="speak-button">{text}</button>
  );
};

export default Speak;