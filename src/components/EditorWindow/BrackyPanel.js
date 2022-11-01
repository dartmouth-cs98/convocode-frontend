import React, { useState } from "react"

import './index.css'

import Bracky from '../../resources/bracky.png'
import Minimize from '../../resources/minimize-light.png'
import Mic from '../../resources/mic.png'
import Settings from '../../resources/settings.png'
import Download from '../../resources/download.png'



const BrackyPanel = ({ theme, open }) => {

  return (
    <div className="bracky-sidepanel" data-theme={theme}>
      <div className="sidepanel-header">
        <form>
          <input type="search" className="submit" placeholder="Search ConvoDex" />
        </form>
        <button className="transparent" onClick={open}><img src={Minimize} alt="minimize" id="click" /></button>
      </div>
      <div className="chatbox">
        <div className="entry-text">
          <img src={Bracky} alt="bracky" />
          <p>Before we continue, please allow access to a microphone.</p>
        </div>
      </div>
      <div className="sidepanel-footer">
        <div className="mode-settings">
          <div className="toggle-buttons">
            <input id="toggle-on" class="toggle toggle-left" name="toggle" value="false" type="radio" checked />
            <label for="toggle-on" class="btn">Voice</label>
            <input id="toggle-off" class="toggle toggle-right" name="toggle" value="true" type="radio" />
            <label for="toggle-off" class="btn">Text</label>
          </div>
        </div>
        <div className="settings-buttons">
          <button className="transparent"><img src={Settings} alt="settings" id="click" /></button>
          <button className="transparent"><img src={Mic} alt="mic" id="click" /></button>
          <button className="transparent"><img src={Download} alt="download" id="click" /></button>
        </div>
      </div>
    </div>
  );
};
export default BrackyPanel;