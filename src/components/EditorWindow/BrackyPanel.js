import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import './index.css'

import Bracky from '../../resources/bracky.png'
import Minimize from '../../resources/minimize-light.png'
import Mic from '../../resources/mic.png'
import Settings from '../../resources/settings.png'
import Download from '../../resources/download.png'



const BrackyPanel = ({ theme, code }, props) => {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(open => !open);
  };

  const ref = useRef(null);
  const [initiateDownload, setInitiateDownload] = useState(false);
  console.log("first props ", props.fileName)

  useEffect((text, name, type) =>{
    var a = ref.current;
    a = document.getElementById("a");
    var file = new Blob([code], {type: 'application/python'});
    a.href = URL.createObjectURL(file);
    a.download = props.fileName;
  }, [props.fileName, code, initiateDownload]);

  const toggleDownload = () =>{
    setInitiateDownload(!initiateDownload);
  }

  return (
    <div className="bracky-sidepanel" data-theme={theme}>
      <div className="sidepanel-header">
        <form>
          <input type="search" className="submit" placeholder="Search ConvoDex" />
        </form>
        <button className="transparent" onClick={toggleSidebar}><img src={Minimize} alt="minimize" id="click" /></button>
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
          {/* <button className="transparent"><img src={Download} alt="download" id="click" /></button> */}
          <a className="transparent" onClick={toggleDownload} ref={ref} id="a" href="/#"><img src={Download} alt="download" id="click" /></a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  fileName: state.fileName,
}
);

// export default BrackyPanel;
export default connect(mapStateToProps)((BrackyPanel));
