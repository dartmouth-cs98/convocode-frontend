import React from "react"

import './index.css'

import Maximize from '../../resources/maximize-light.png'
import MicClosed from '../../resources/mic-closed.png'
import SettingsClosed from '../../resources/settings-closed.png'
import DownloadClosed from '../../resources/download-closed.png'



const ClosedBrackyPanel = ({ theme, open }) => {

  return (
    <div className="bracky-sidepanel-closed" data-theme={theme}>
      <button className="transparent" onClick={open}><img src={Maximize} alt="download" id="click" /></button>
      <div className="settings-buttons-closed">
        <button className="transparent"><img src={DownloadClosed} alt="download" id="click" /></button>
        <button className="transparent"><img src={SettingsClosed} alt="settings" id="click" /></button>
        <button className="transparent"><img src={MicClosed} alt="mic" id="click" /></button>
      </div>
    </div>
  );
};
export default ClosedBrackyPanel;