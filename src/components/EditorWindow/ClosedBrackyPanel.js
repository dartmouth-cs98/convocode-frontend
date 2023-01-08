import React, { useState, useRef, useEffect } from "react"

import Maximize from '../../resources/maximize-light.png'
import MicClosed from '../../resources/mic-closed.png'
import ActiveMicClosed from '../../resources/active-mic-closed.png'
import SettingsClosed from '../../resources/settings-closed.png'
import DownloadClosed from '../../resources/download-closed.png'
import { connect } from 'react-redux';
import { addSpeech } from "../../state/actions"
import { insertCode } from "../../state/actions"
import { objToString } from "../../resources/util.js"
import MicRecorder from 'mic-recorder-to-mp3';
import axios from 'axios';

import './index.css'


const ClosedBrackyPanel = (props) => {

  const ref = useRef(null);
  const [initiateDownload, setInitiateDownload] = useState(false);
  const [speakText, setSpeakText] = useState("SPEAK");
  const [Mp3Recorder] = useState(new MicRecorder({ bitRate: 128 }));
  const [blocked, setBlocked] = useState(false);

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

  // code copied from BrackyPanel.js
  function start() {
    if (blocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
        }).catch((e) => console.error(e));
    }
  };

  function stop() {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        let file = new File([blob], `chunk-${new Date().getTime().toString()}.wav`);
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);
        axios.request({
          method: "POST",
          url: `${process.env.REACT_APP_BACKEND_URL}/voicetocode`,
          data: formData,
        }).then((res) => {
          console.log(res);
          console.log(res.data.code);
          console.log(res.data.text);
          props.insertCode(res.data.code);
          props.addSpeech(res.data.text);
        });
      }).catch((e) => console.log(e));
  };

  function handleSpeakClick() {
    if (speakText === "SPEAK") {
      setSpeakText("STOP");
      start();
    } else {
      setSpeakText("SPEAK");
      stop();
    }
  };

  return (
    <div className="bracky-sidepanel-closed" data-theme={props.lightMode ? 'light' : 'dark'}>
      <button className="transparent" onClick={props.open}><img src={Maximize} alt="download" id="click" /></button>
      <div className="settings-buttons-closed">
        <a className="transparent" onClick={toggleDownload} ref={ref} id="a" href="/#"><img src={DownloadClosed} alt="download" id="click" /></a>
        <button className="transparent" onClick={props.toggleModal}><img src={SettingsClosed} alt="settings" id="click" /></button>
        <button className="transparent" onClick={handleSpeakClick}>
          {
            speakText === "SPEAK" ?
              <img src={MicClosed} alt="mic" id="click" /> :
              <img src={ActiveMicClosed} alt="active mic" id="click" />
          }
        </button>
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

export default connect(mapStateToProps, { addSpeech, insertCode })(ClosedBrackyPanel);