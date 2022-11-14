import React from "react";

import Run from '../../resources/play.png'

import './index.css'


const Output = ({ output, theme, handleRunClick }) => {

  var newText;
  if (output != null) {
    newText = output.split('\n').map(output => <p>{output}</p>);
  } else {
    newText = null;
  }


  return (
    <div className="output-window" data-theme={theme}>
      <div className="output-header">
        <button onClick={handleRunClick} className="transparent">
          Run
          <img src={Run} alt="run" />
        </button>
      </div>
      <div className="out-text">
        {newText}
      </div>
    </div>
  );
};
export default Output;