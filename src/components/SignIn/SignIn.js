import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';

import HeaderBar from "../HeaderBar/HeaderBar";

import '../../index.css'


const SignIn = (props) => {
  return (
    <div className="sign-in" data-theme={props.lightMode ? 'light' : 'dark'}>
      <HeaderBar />

    </div>
  );
};
const mapStateToProps = (reduxstate) => {
  return { lightMode: reduxstate.settings.lightMode };
};

export default connect(mapStateToProps, {})(SignIn);