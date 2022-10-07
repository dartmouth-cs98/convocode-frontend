import React from 'react';
import './run.css';

function Run(props) {
  return (
    <div className="button-contatiner">
        <div className="run-button">{props.text}</div>
    </div>
  );
};

export default Run;