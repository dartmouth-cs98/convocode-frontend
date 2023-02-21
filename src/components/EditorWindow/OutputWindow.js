import React from "react";
import StdinWindow from "./StdinWindow";

import Run from '../../resources/play.png'

import './index.css'


const Output = ({ output, theme, handleRunClick, stdin, setStdin }) => {

  var newText;
  if (output != null) {
    newText = output.split('\n').map(output => <p>{output}</p>);
  } else {
    newText = null;
  }


  return (
    <div>
      <div className="console-window" data-theme={theme}>
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
      <StdinWindow stdin={stdin} setStdin={setStdin} />
    </div>
  );
};
export default Output;