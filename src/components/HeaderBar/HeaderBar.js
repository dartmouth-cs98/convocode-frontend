import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import "./header.css"

const HeaderBar = (props) => {
  return (
    <div className='header-bar' data-theme={props.lightMode ? 'light' : 'dark'}>
      <NavLink to="/"><h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1></NavLink>
      <div className='header-buttons'>
        <NavLink to="/community"><button id="documentation">Community</button></NavLink>
        <NavLink to="/editor" state={{ name: "newfile.py" }}><button id="IDE">Open IDE</button></NavLink>
        <NavLink to="/signin"><button id="signin">Sign In</button></NavLink>
      </div>
    </div>
  );
};
const mapStateToProps = (reduxstate) => {
  return { lightMode: reduxstate.settings.lightMode };
};

export default connect(mapStateToProps, {})(HeaderBar);
