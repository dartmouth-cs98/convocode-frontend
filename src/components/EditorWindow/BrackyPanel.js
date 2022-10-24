import React, { useState } from "react";

import './index.css'


const BrackyPanel = ({ theme }) => {
  const [open, setOpen] = useState(true);

  const minimize = "../../resources/minimize-" + theme + ".png";

  const toggleSidebar = () => {
    setOpen(open => !open);
  };

  return (
    <div className="bracky-sidepanel" data-theme={theme}>
      <div className="sidepanel-header">
        <h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1>
        <img src={minimize} alt="minimize" onClick={toggleSidebar} />
      </div>
      <div className="chatbox">

      </div>
    </div>
  );
};
export default BrackyPanel;