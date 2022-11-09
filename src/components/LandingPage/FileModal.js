import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { createFileName } from '../../state/actions/fileManagement';
import UploadFile from "./UploadFile";

import './file-modal.css';

const FileModal = (props) => {

  const [theme, setTheme] = useState('light');
  const [newFile, setNewFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const handleModalToggle = () => {
    setNewFile(false);
    setModalShow(!modalShow);
  }

  const handleNewFile = () => {
    setNewFile(true);
  }

  const handleCreateFile = () => {
    props.createFileName(fileName + ".py");
  }

  return (
    <div>
      <button onClick={handleModalToggle}>
        Start Coding
      </button>
      <div className="landing-modal">
        {newFile ? (
          <ReactModal className="modal-create" isOpen={modalShow} onRequestClose={handleModalToggle} contentLabel="ConvoCode">
            <div>
              <div className="modal-input">
                <p>New File Name</p>
                <div className="file-name">
                  <input type="text" name="filename" value={fileName} onChange={event => setFileName(event.target.value)} />
                  <p>.py</p>
                </div>
              </div>
              <div className="create-buttons">
                <button className="cancel-button" onClick={handleModalToggle}>Cancel</button>
                <NavLink to="/editor"><button id="create" onClick={handleCreateFile}>Create</button></NavLink>
              </div>
            </div>
          </ReactModal>
        ) :
          (
            <ReactModal className="modal-landing" isOpen={modalShow} onRequestClose={handleModalToggle} contentLabel="ConvoCode">
              <div className="modal-content">
                <h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1>
                <div className="modal-buttons" data-theme={theme}>
                  <button onClick={handleNewFile}>Create New Python File </button>
                  <UploadFile />
                </div>
              </div>
            </ReactModal>)
        }
      </div>
    </div>
  )
};

const mapStateToProps = (reduxstate) => {
  return { fileName: reduxstate.fileName };
};

export default connect(mapStateToProps, { createFileName })(FileModal);
