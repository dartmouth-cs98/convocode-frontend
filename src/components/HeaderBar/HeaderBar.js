import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import "./header.css"

const HeaderBar = (props) => {
  return (
    <div className='header-bar' data-theme={props.lightMode ? 'light' : 'dark'}>
      <NavLink to="/"><h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1></NavLink>
      <div className='header-buttons'>
        <NavLink to="/documentation"><button id="documentation">Documentation</button></NavLink>
        <NavLink to="/editor" state={{ name: "newfile.py" }}><button id="IDE">Open IDE</button></NavLink>
      </div>
    </div>
  );
};
const mapStateToProps = (reduxstate) => {
  return { lightMode: reduxstate.settings.lightMode };
};

export default connect(mapStateToProps, {})(HeaderBar);
