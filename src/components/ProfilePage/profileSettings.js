import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import X from '../../resources/x.png'; 
import './profile-settings.css'
// import updateUser from 'src/services/user.js'
const ProfileSettings = (props) => {

    const [email, setEmail] = useState(props.email); 
    const [username, setUsername] = useState(props.username);

    const updateEmail = (email) => {
        setEmail(email);
    }
    const updateUsername = (username) => { 
        setUsername(username)
    }

    return (
        <div>
            <button onClick={props.handleModalToggle} className="bus" style={{ width: "fit-content" }}>Profile Settings </button>

                <ReactModal className="project-modal" isOpen={props.modalShow} onRequestClose={props.handleModalToggle} contentLabel="ConvoCode" ariaHideApp={false}>
                    <div className="profile-settings-header">
                        <h2>Settings</h2>
                        <button className="transparent" onClick={props.handleModalToggle}><img src={X} alt="close" id="click" /></button>
                    </div>
                    <div className="settings-content">
                        <div className="settings-titles">
                            <h4>Email:</h4>
                            <h4>Username:</h4>
                        </div>
                        <div className="settings-options">
                        <input type="text" value={email} onChange={(event) => updateEmail(event.target.value)} />
                        <input type="text" value={username} onChange={(event) => updateUsername(event.target.value)} />
                        </div>
                    </div>

                    <div className="updateProfile">
                     <button className="pink">Update Profile</button>
                    </div>

              
                    
                </ReactModal>
        
        </div>

    )
}


const mapStateToProps = (reduxstate) => {
    return {
        username: reduxstate.user.username,
        email: reduxstate.user.email

    }
}
export default connect(mapStateToProps, {})(ProfileSettings);
