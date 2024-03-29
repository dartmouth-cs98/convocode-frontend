import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { login, clearUserError } from '../../state/actions';

import HeaderBar from "../HeaderBar/HeaderBar";
import ErrorModal from "../Error/ErrorModal";
import './signin.css'


const SignIn = (props) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [modalShow, setModalShow] = useState(false);

  const handleModalToggle = () => {
    setModalShow(!modalShow);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.login(event.target[0].value, event.target[1].value);
  }

  useEffect(() => {

    setModalShow(props.error !== {})
  }, [props.error]);

  useEffect(() => {
    //once properly signed in navigate to home page
    if (props.user.username) {
      navigate("/")
    }
  }, [props.user.username]);

  return (
    <div className="sign-in" data-theme={props.lightMode ? 'light' : 'dark'}>
      <HeaderBar />
      <div className="content">
        <h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1>
        {props.error.data ?
          <ErrorModal isOpen={modalShow} handleModalToggle={handleModalToggle} title={props.error.location} error={props.error.data.error} status={props.error.status} onClose={props.clearUserError} /> :
          <></>
        }
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            <h3>Email:</h3>
            <input type="text" value={username} id="username" onChange={(e) => setUsername(e.target.data)} />
          </label>
          <label>
            <h3>Password:</h3>
            <input type="password" value={password} id="password" onChange={(e) => setPassword(e.target.data)} />
          </label>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" id="link">Forgot Password?</a>
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
  return {
    lightMode: reduxstate.settings.lightMode,
    error: reduxstate.user.error,
    user: reduxstate.user,
  };
};

export default connect(mapStateToProps, { login, clearUserError })(SignIn);