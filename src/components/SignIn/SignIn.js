import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';

import HeaderBar from "../HeaderBar/HeaderBar";

import './signin.css'


const SignUp = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = () => {
    console.log("username and password sent")
  }

  return (
    <div className="sign-in" data-theme={props.lightMode ? 'light' : 'dark'}>
      <HeaderBar />
      <div className="content">
        <h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1>
        <form onSubmit={() => handleSubmit()}>
          <label>
            <h3>Username:</h3>
            <input type="text" value={username} id="username" onChange={(e) => setUsername(e.target.data)} />
          </label>
          <label>
            <h3>Password:</h3>
            <input type="password" value={password} id="password" onChange={(e) => setPassword(e.target.data)} />
          </label>
          <a id="link">Forgot Password?</a>
          <div className="submit-buttons">
            <input type="submit" />
            <NavLink to="/signup" id="link">Create Account</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (reduxstate) => {
  return { lightMode: reduxstate.settings.lightMode };
};

export default connect(mapStateToProps, {})(SignUp);