import React from "react";
import StdinWindow from "./StdinWindow";
import Run from '../../resources/play.png'
import './index.css';
import './webEditor.css';


const Output = ({ output, theme, handleRunClick, stdin, setStdin }) => {
  // heyyyyyyyy
  var newText;
  if (output != null) {
    newText = output.split('\n').map(output => <p>{output}</p>);
  } else {
    newText = null;
  }


  return (
    <div className="console-window" data-theme={theme}>
        <StdinWindow rows="1" stdin={stdin} setStdin={setStdin} />
        <div className="console-window-button">
          <button onClick={handleRunClick} className="console-run-button">Run</button>
        </div>
        <div className="output-text">{newText}</div>
    </div>
  );
};
export default Output;