import React, { useState } from 'react';
import ReactModal from 'react-modal';
import './error.css';

const ErrorModal = (props) => {
  return (
    <ReactModal className="error-modal" isOpen={props.isOpen} onRequestClose={props.handleModalToggle} ariaHideApp={false}>
      <div>
        <h1>Error Occured on {props.title}</h1>
        <p>{props.error}</p>
        <p>Please check your connection and try again.</p>
      </div>
    </ReactModal>
  )
};

export default ErrorModal;