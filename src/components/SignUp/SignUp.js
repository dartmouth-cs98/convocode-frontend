import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';

import HeaderBar from "../HeaderBar/HeaderBar";

import './signup.css'


const SignUp = (props) => {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [email2, setEmail2] = useState();
  const [password2, setPassword2] = useState();

  const handleSubmit = () => {
    console.log("user info sent")
  }

  return (
    <div className="sign-up" data-theme={props.lightMode ? 'light' : 'dark'}>
      <HeaderBar />
      <div className="content">
        <h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1>
        <form onSubmit={() => handleSubmit()}>
          <label>
            <h3>Name:</h3>
            <input type="text" value={name} id="one" onChange={(e) => setName(e.target.data)} />
          </label>
          <label>
            <h3>Username:</h3>
            <input type="text" value={username} id="two" onChange={(e) => setUsername(e.target.data)} />
          </label>
          <label>
            <h3>Email:</h3>
            <input type="text" value={email} id="three" onChange={(e) => setEmail(e.target.data)} />
          </label>
          <label>
            <h3>Confirm Email:</h3>
            <input type="text" value={email2} id="four" onChange={(e) => setEmail2(e.target.data)} />
          </label>
          <label>
            <h3>Password:</h3>
            <input type="password" value={password} id="five" onChange={(e) => setPassword(e.target.data)} />
          </label>
          <label>
            <h3>Confirm Password:</h3>
            <input type="password" value={password2} id="six" onChange={(e) => setPassword2(e.target.data)} />
          </label>
          <div className="submit-buttons">
            <input type="submit" />
            <NavLink to="/signin" id="link">Sign In</NavLink>
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