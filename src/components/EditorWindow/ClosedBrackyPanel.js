import React, { useState, useRef, useEffect } from "react"

import './index.css'

import Maximize from '../../resources/maximize-light.png'
import MicClosed from '../../resources/mic-closed.png'
import SettingsClosed from '../../resources/settings-closed.png'
import DownloadClosed from '../../resources/download-closed.png'
import { useLocation } from "react-router"



const ClosedBrackyPanel = ({ theme, open, code }) => {

  const ref = useRef(null);
  const [initiateDownload, setInitiateDownload] = useState(false);

  // getting file name from nav link props
  const location = useLocation();
  const pyfilename = location.state.name;
  // const pyfilename = filename + '.py';

  // downloading file
  useEffect(() =>{
    var a = ref.current;
    a = document.getElementById("a");
    var file = new Blob([code], {type: 'application/python'});
    a.href = URL.createObjectURL(file);
    a.download = pyfilename;
  }, [pyfilename, code, initiateDownload]);

  const toggleDownload = () =>{
    setInitiateDownload(!initiateDownload);
  }

  return (
    <div className="bracky-sidepanel-closed" data-theme={theme}>
      <button className="transparent" onClick={open}><img src={Maximize} alt="download" id="click" /></button>
      <div className="settings-buttons-closed">
        <a className="transparent" onClick={toggleDownload} ref={ref} id="a" href="/#"><img src={DownloadClosed} alt="download" id="click" /></a>
        <button className="transparent"><img src={SettingsClosed} alt="settings" id="click" /></button>
        <button className="transparent"><img src={MicClosed} alt="mic" id="click" /></button>
      </div>
    </div>
  );
};
export default ClosedBrackyPanel;