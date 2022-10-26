import React, { useState } from "react";
import FileModal from "./FileModal";

import './landing.css'


const LandingPage = () => {

  const [theme, setTheme] = useState('light');
  // const [modalShow, setModalShow] = useState(false)

  return (
    <div className="landing-page" data-theme={theme}>
      <div className="title-content" data-theme={theme}>
        <h1>Welcome to Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1>
        <h2>Redefining Python Developer tools.</h2>
        <div className="file-buttons" data-theme={theme}>
          {/* <button onClick={() => setModalShow(!modalShow)}>
            Start Coding
          </button> */}
          <FileModal/>
        </div>
      </div>
      <div className="floating-text">
        <div>
          <p id="floating-cf" data-theme={theme}>"create function"</p>
        </div>
        <div>
          <p id="floating-bc" data-theme={theme}>"build class"</p>
        </div>
        <div>
          <p id="floating-dc" data-theme={theme}>"debug code"</p>
        </div>
        <div>
          <p id="floating-ar" data-theme={theme}>"analyze runtime"</p>
        </div>
        <div>
          <p id="floating-sa" data-theme={theme}>"stackoverflow analysis"</p>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;