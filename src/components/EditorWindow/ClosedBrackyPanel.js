import React, { useState, useRef, useEffect } from "react"


import Maximize from '../../resources/maximize-light.png'
import MicClosed from '../../resources/mic-closed.png'
import SettingsClosed from '../../resources/settings-closed.png'
import DownloadClosed from '../../resources/download-closed.png'
import { connect } from 'react-redux';
import { addSpeech } from "../../state/actions"
import { addCode } from "../../state/actions"
import { objToString } from "../../resources/util.js"

import './index.css'


const ClosedBrackyPanel = (props) => {

  const ref = useRef(null);
  const [initiateDownload, setInitiateDownload] = useState(false);

  // downloading file
  useEffect(() => {
    var a = ref.current;
    a = document.getElementById("a");
    var file = new Blob([objToString(props.code)], { type: 'application/python' });
    a.href = URL.createObjectURL(file);
    a.download = props.filename;
  }, [props.filename, props.code, initiateDownload]);

  const toggleDownload = () => {
    setInitiateDownload(!initiateDownload);
  }

  return (
    <div className="bracky-sidepanel-closed" data-theme={props.theme}>
      <button className="transparent" onClick={props.open}><img src={Maximize} alt="download" id="click" /></button>
      <div className="settings-buttons-closed">
        <a className="transparent" onClick={toggleDownload} ref={ref} id="a" href="/#"><img src={DownloadClosed} alt="download" id="click" /></a>
        <button className="transparent"><img src={SettingsClosed} alt="settings" id="click" /></button>
        <button className="transparent"><img src={MicClosed} alt="mic" id="click" /></button>
      </div>
    </div>
  );
};
const mapStateToProps = (reduxstate) => {
  return {
    speech: reduxstate.speech,
    filename: reduxstate.fileManagement.fileName,
    code: reduxstate.code.string,
  };
};

export default connect(mapStateToProps, { addSpeech, addCode })(ClosedBrackyPanel);