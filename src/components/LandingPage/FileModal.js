import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import './filemodal.css'

import ReactModal from 'react-modal';
const FileModal = () => {

  const [theme, setTheme] = useState('light');
  const [upload, setUpload] = useState(false);
  const [fileName, setFileName] = useState("");

  // function transition (props) { 

  // }

  return (

      <ReactModal 
        isOpen={this.state.showModal}
        contentLabel="Minimal Modal Example">

      { upload ? (
        <div> 
          <h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1>
          <NavLink to="/editor"><button type="button">Create New Python File</button></NavLink>
          <button onClick={() => setUpload(!upload)}>Upload Python File </button> 
        </div>
        ):
        <div>
          <p>New File Name:</p> 
          <input type ="text" name="filename"/>
          <div>
            {/* send to redux and redirect */}
            <NavLink to ="/editor"><button onClick={() => this.FileModal}> </button></NavLink>
          </div>
        </div>
        }
  </ReactModal>


  ) 


  



};
export default FileModal;