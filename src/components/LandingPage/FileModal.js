import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { createFileName } from '../../state/actions/fileManagement';


import './file-modal.css';
import { scryRenderedComponentsWithType } from "react-dom/test-utils";

const FileModal = ({props}) => {

  const [theme, setTheme] = useState('light');
  const [newFile, setNewFile] = useState(false);
  const [fileName, setFileName] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleModalOpen = () =>{
    setIsOpen(!modalIsOpen);
  };
  const handleModalClose = () =>{
    setIsOpen(modalIsOpen);
  }
  const handleCreateFile = () => {
    props.createFileName(fileName);
  }

  return(
    <div>
      <button onClick={handleModalOpen}>
        Start Coding
      </button>
      <ReactModal isOpen ={modalIsOpen} onRequestClose = {handleModalClose} contentLabel = "ConvoCode">
        {  !newFile ? (
          <div> 
            <h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1>
            {/* <NavLink to="/editor"><button type="button">Create New Python File</button></NavLink> */}
            <button onClick={() => setNewFile(!newFile)}>Create New Python File </button> 
            <button onClick={() => setNewFile(!newFile)}>Upload Python File </button> 
            </div>
          ):
          (<div>
            <p>New File Name</p> 
            <input type ="text" name="filename" value = {fileName} onChange={event => setFileName(event.target.value)}/>
            <p>.py</p>
            <div>
            {/* send to redux and redirect */}
            {/* <NavLink to ="/editor"><button onClick={() => this.FileModal}>Create</button></NavLink> */}
            <NavLink to ="/editor"><button onClick={handleCreateFile}>Create</button></NavLink>
            </div>
            </div>)
        }
      </ReactModal> 
      </div>
)};

const mapStateToProps = (reduxstate) => ({
  fileName: reduxstate.fileName,
});

export default connect(mapStateToProps, { createFileName })(FileModal);