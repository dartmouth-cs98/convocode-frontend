import React, { useState } from "react";
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { toggleViewMode, updateFontSize, createFileName } from "../../state/actions";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import X from '../../resources/x.png'

import './index.css'
import './settings-modal.css'


const SettingsModal = (props) => {

  const [fontSize, setFontSize] = useState(props.fontSize);
  const [fileName, setFileName] = useState(props.fileName);

  const updateFileName = (file) => {
    setFileName(file)
    props.createFileName(file)
  }

  const updateFontSize = (font) => {
    props.updateFontSize(font)
    setFontSize(font)
  }

  return (
    <ReactModal className="settings-modal" data-theme={props.lightMode ? 'light' : 'dark'} isOpen={props.modal} onRequestClose={props.toggleModal} contentLabel="Settings" ariaHideApp={false} >
      <div className="settings-header">
        <h2>Settings</h2>
        <button className="transparent" onClick={props.toggleModal}><img src={X} alt="close" id="click" /></button>
      </div>
      <div className="settings-content">
        <div className="settings-titles">
          <h4>Editor Mode:</h4>
          <h4>File Name:</h4>
          <h4>Font Size:</h4>
        </div>
        <div className="settings-options">
          <div className="toggle-buttons">
            <input id="toggle-on" className="toggle toggle-left" name="toggle" value="true" type="radio" onChange={() => props.toggleViewMode(true)} defaultChecked />
            <label htmlFor="toggle-on" className="btn">Light Mode</label>
            <input id="toggle-off" className="toggle toggle-right" name="toggle" value="false" type="radio" onChange={() => props.toggleViewMode(false)} />
            <label htmlFor="toggle-off" className="btn">Dark Mode</label>
          </div>
          <input type="text" value={fileName} onChange={(event) => updateFileName(event.target.value)} />
          <DropdownButton id="dropdown-basic-button" title={fontSize} onSelect={(eventKey, _event) => updateFontSize(eventKey)}>
            <Dropdown.Item eventKey="10px">10 px</Dropdown.Item>
            <Dropdown.Item eventKey="12px">12 px</Dropdown.Item>
            <Dropdown.Item eventKey="14px">14 px</Dropdown.Item>
            <Dropdown.Item eventKey="16px">16 px</Dropdown.Item>
            <Dropdown.Item eventKey="18px">18 px</Dropdown.Item>
            <Dropdown.Item eventKey="20px">20 px</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </ReactModal>
  );
};

const mapStateToProps = (reduxstate) => {
  return {
    lightMode: reduxstate.settings.lightMode,
    fontSize: reduxstate.settings.fontSize,
    fileName: reduxstate.fileManagement.fileName,
  };
};

export default connect(mapStateToProps, { toggleViewMode, updateFontSize, createFileName })(SettingsModal);
