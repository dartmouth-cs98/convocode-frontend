import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../state/actions/user';
import { clearProject } from '../../state/actions/project';

import "./header.css"

const HeaderBar = (props) => {
  let location = useLocation();


  return (
    <div className='header-bar' data-theme={props.lightMode ? 'light' : 'dark'}>
      {
        props.user.username ?
          (
            location.pathname === "/profile" ?
              <>
                <NavLink to="/"><h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1></NavLink>
                <div className='header-buttons'>
                  <NavLink to="/community"><button id="community">Community</button></NavLink>
                  <NavLink to="/editor" state={{ name: "newfile.py" }} onClick={props.clearProject}><button id="IDE">Open IDE</button></NavLink>
                  <NavLink to="/"><button id="signin" onClick={props.signOut}>Sign Out</button></NavLink>
                </div>
              </>
              :
              <>
                <NavLink to="/"><h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1></NavLink>
                <div className='header-buttons'>
                  <NavLink to="/community"><button id="community" onClick={props.clearProject}>Community</button></NavLink>
                  <NavLink to="/editor" state={{ name: "newfile.py" }}><button id="IDE" onClick={props.clearProject}>Open IDE</button></NavLink>
                  <NavLink to="/profile"><button id="profile">@{props.user.username}</button></NavLink>
                </div>
              </>

          )
          :
          <>
            <NavLink to="/"><h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1></NavLink>
            <div className='header-buttons'>
              <NavLink to="/community"><button id="community">Community</button></NavLink>
              <NavLink to="/editor" state={{ name: "newfile.py" }}><button id="IDE">Open IDE</button></NavLink>
              <NavLink to="/signin"><button id="signin">Sign In</button></NavLink>
            </div>
          </>
      }
    </div >
  );
};
const mapStateToProps = (reduxstate) => {
  return {
    lightMode: reduxstate.settings.lightMode,
    user: reduxstate.user,
  };
};

export default connect(mapStateToProps, { signOut, clearProject })(HeaderBar);
