import React from 'react';
import ReactModal from 'react-modal';

import './error.css';

const ErrorModal = (props) => {
  return (
    <ReactModal className="error-modal" isOpen={props.isOpen} onRequestClose={props.handleModalToggle} ariaHideApp={false} onAfterClose={props.onClose ? props.onClose : () => { }}>
      <div className='error-header'>
        <span>🚨</span>
        <span>{props.status}</span>
        <span>🚨</span>
      </div>
      <div className="error-content">
        <div className='error-text'>
          <p>Oops, seems like something went wrong.</p>
          <p>{props.error}</p>
        </div>
        <button onClick={() => {
          props.handleModalToggle()
          props.onClose()
        }}>Close</button>
      </div>
    </ReactModal >
  )
};

export default ErrorModal;