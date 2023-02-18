import React, { useState } from 'react';
import ReactModal from 'react-modal';

import error from '../../resources/error.png';
import './error.css';

const ErrorModal = (props) => {
  return (
    <ReactModal className="error-modal" isOpen={props.isOpen} onRequestClose={props.handleModalToggle} ariaHideApp={false} onAfterClose={props.onClose}>
      <h1 id="smaller">Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1>
      <div className="error-content">
        <div className="error-title">
          <img style={{ height: '30px' }} alt="error alert" src={error} />
          <h2>Error Occured on {props.title}</h2>
          <img style={{ height: '30px' }} alt="error alert" src={error} />
        </div>
        <p>{props.error}</p>
        <p>Please check your connection and try again.</p>
      </div>
    </ReactModal>
  )
};

export default ErrorModal;