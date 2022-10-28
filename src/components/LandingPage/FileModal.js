import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { createFileName } from '../../state/actions/fileManagement';

import './file-modal.css';
import { scryRenderedComponentsWithType } from "react-dom/test-utils";

const FileModal = (props) => {

  const [theme, setTheme] = useState('light');
  const [newFile, setNewFile] = useState(false);
  const [fileName, setFileName] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const handleModalToggle = () =>{
    setNewFile(false);
    setModalShow(!modalShow);
  }

  const handleNewFile = () =>{
    setNewFile(!newFile);
  }

  const handleCreateFile = () => {
    props.createFileName(fileName);
  }

  return(
    <div>
      <button onClick={handleModalToggle}>
        Start Coding
      </button>
      <div className="landing-modal">
      <ReactModal className="file-modal" isOpen={modalShow} onRequestClose={handleModalToggle} contentLabel = "ConvoCode">
        {  newFile ? (
          <div>
            <div className="modal-input">
              <p>New File Name</p> 
                <div className="file-name">
                  <input type ="text" name="filename" value = {fileName} onChange={event => setFileName(event.target.value)}/>
                  <p>.py</p>
                </div>
            </div>
            <div className="create-buttons">
              <button className="cancel-button" onClick={handleModalToggle}>Cancel</button>
              <NavLink to ="/editor"><button id="create" onClick={handleCreateFile}>Create</button></NavLink>
            </div>
          </div>
          ):
          (<div className="modal-content"> 
            <h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1>
            <div className="modal-buttons" data-theme={theme}>
              <button onClick={handleNewFile}>Create New Python File </button> 
              <button onClick={handleNewFile}>Upload Python File </button> 
            {/* <button className="cancel-button" onClick={handleModalToggle}>Cancel</button> */}
            </div>
          </div>)
        }
      </ReactModal> 
      </div>
    </div>
)};

const mapStateToProps = (reduxstate) => {
  return {fileName: reduxstate.fileName};
};

export default connect(mapStateToProps, { createFileName })(FileModal);