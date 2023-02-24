import React, { useState } from "react";
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { toggleViewMode } from "../../state/actions";
import X from '../../resources/x.png'

import '../EditorWindow/index.css'
import '../EditorWindow/settings-modal.css'
import './profile-settings.css'


const ProfileSettingsModal = (props) => {

  const [username, setUsername] = useState(props.username);
  const [email, setEmail] = useState(props.email );


  const updateUsername= (username) => {
    setUsername(username)
    // props.createFileName(file)
  }

  const updateEmail = (email) => {
    // props.updateFontSize(font)
    setEmail(email)
  }



  return (
    <div>
      <button onClick={props.handleModalToggle}>
          Settings
        </button>
      <ReactModal className="profile-settings-modal"  overlayClassName="Overlay" isOpen={props.modalShow} onRequestClose={props.handleModalToggle} contentLabel="Settings" ariaHideApp={false} >
        <div className="settings-header profile ">
          <h2>Settings</h2>
          <button className="transparent"   onClick={props.handleModalToggle}><img src={X} alt="close" id="click" /></button>
        </div>
        <div className="settings-content">
        <div className="settings-titles">
            <h4>Username:</h4>
            <h4>Email:</h4>

          </div>
          <div className="settings-options">
            <input type="text" value={username} onChange={(event) => updateUsername(event.target.value)} />
            <input type="text" value={email} onChange={(event) => updateEmail(event.target.value)} />
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

const mapStateToProps = (reduxstate) => {
  return {
    lightMode: reduxstate.settings.lightMode,
    username: reduxstate.user.username,
    email: reduxstate.user.email

  };
};

export default connect(mapStateToProps, { toggleViewMode })(ProfileSettingsModal);
