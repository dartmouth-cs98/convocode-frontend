import React from 'react';
import '../styles/run.css';

const Run = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick} className="run-button">{text}</button>
  );
};

export default Run;