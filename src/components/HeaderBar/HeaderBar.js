import React, { useState } from 'react';

import "./header.css"

const HeaderBar = () => {
  const [theme, setTheme] = useState('light');
  const [displayButtons, setDisplayButtons] = useState(true);

  return (
    <div className='header-bar' data-theme={theme}>
      <h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1>
      <div className='header-buttons' data-theme={theme} style={{ display: (displayButtons ? "flex" : "none") }} >
        <button id="documentation" data-theme={theme}>Documentation</button>
        <button id="IDE">Open IDE</button>
      </div>
    </div >
  );
};

export default HeaderBar;
