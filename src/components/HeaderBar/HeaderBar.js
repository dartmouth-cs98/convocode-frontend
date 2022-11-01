import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import "./header.css"

const HeaderBar = () => {
  const [theme, setTheme] = useState('light');
  const [displayButtons, setDisplayButtons] = useState(true);

  return (
    <div className='header-bar' data-theme={theme}>
      <h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1>
      <div className='header-buttons' data-theme={theme} style={{ display: (displayButtons ? "flex" : "none") }} >
        <NavLink to="/documentation"><button id="documentation" data-theme={theme}>Documentation</button></NavLink>
        <NavLink to="/editor" state={{name:"new-file"}}><button id="IDE">Open IDE</button></NavLink>
      </div>
    </div>
  );
};

export default HeaderBar;
