import React, { useState } from "react";

import './index.css'

const Output = ({ output, theme }) => {

  var newText;
  if (output != null) {
    newText = output.split('\n').map(output => <p>{output}</p>);
  } else {
    newText = null;
  }


  return (
    <div className="code-output-window" data-theme={theme}>
      <div >
        Output
      </div>
      <div className="box">
        <div className="out-text">
          {newText}
        </div>
      </div>
    </div>
  );
};
export default Output;