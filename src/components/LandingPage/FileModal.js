import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ReactModal from 'react-modal';

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
            <NavLink to ="/editor"><button>Create</button></NavLink>
            </div>
            {console.log(fileName)}
            </div>)
        }
      </ReactModal> 
      </div>
  // function transition (props) { 

  // }

  // return (
  //     <ReactModal 
  //       isOpen={this.state.showModal}
  //       contentLabel="Minimal Modal Example">

  //     { upload ? (
  //       <div> 
  //         <h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1>
  //         <NavLink to="/editor"><button type="button">Create New Python File</button></NavLink>
  //         <button onClick={() => setUpload(!upload)}>Upload Python File </button> 
  //       </div>
  //       ):
  //       <div>
  //         <p>New File Name:</p> 
  //         <input type ="text" name="filename"/>
  //         <div>
  //           {/* send to redux and redirect */}
  //           <NavLink to ="/editor"><button onClick={() => this.FileModal}> </button></NavLink>
  //         </div>
  //       </div>
  //       }
  // </ReactModal>
  // ) 
)};
export default FileModal;