import React, { useState } from "react";

import './landing.css'


const LandingPage = () => {

  const [theme, setTheme] = useState('light');

  return (
    <div className="landing-page" data-theme={theme}>
      <div className="title-content" data-theme={theme}>
        <h1>Welcome to ConvoCode</h1>
        <h2>Redefining Python Developer tools.</h2>
        <div className="file-buttons" data-theme={theme}>
          <button>
            Upload Python File
          </button>
          <button>
            New Python File
          </button>
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