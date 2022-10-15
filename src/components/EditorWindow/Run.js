import React from 'react';


const Run = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick} className="run-button">{text}</button>
  );
};

export default Run;