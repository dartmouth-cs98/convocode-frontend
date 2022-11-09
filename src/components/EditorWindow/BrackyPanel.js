import React, { useState, useRef, useEffect } from "react"
import { useLocation } from "react-router"
import SettingsModal from "./SettingsModal"

import Bracky from '../../resources/bracky.png'
import Minimize from '../../resources/minimize-light.png'
import Mic from '../../resources/mic.png'
import ActiveMic from '../../resources/active-mic.png'
import Settings from '../../resources/settings.png'
import Download from '../../resources/download.png'
import Python from '../../resources/python.png'
import X from '../../resources/x.png'
import MicRecorder from 'mic-recorder-to-mp3';
import { connect } from 'react-redux';
import { addSpeech } from "../../state/actions"
import { addCode } from "../../state/actions"
import { objToString } from "../../resources/util.js"
import axios from 'axios';


import './index.css'


const BrackyPanel = (props) => {

  const ref = useRef(null);
  const [initiateDownload, setInitiateDownload] = useState(false);
  const [Mp3Recorder, setMp3Recorder] = useState(new MicRecorder({ bitRate: 128 }));
  const [recording, setRecording] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const [speakText, setSpeakText] = useState("SPEAK");


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

  navigator.getUserMedia({ audio: true },
    () => {
      setBlocked(false);
    },
    () => {
      console.log('Permission Denied');
      setBlocked(true);
    },
  );


  function start() {
    if (blocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          setRecording(true);
        }).catch((e) => console.error(e));
    }
  };

  function stop() {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        // const blobURL = URL.createObjectURL(blob)
        // setBlobURL(blobURL);
        setRecording(false);
        let file = new File([blob], 'chunk.wav');
        console.log(file);
        const formData = new FormData();
        formData.append('file', file);
        // const audioURL = window.URL.createObjectURL(blob);
        // console.log(audioURL);
        axios.request({
          method: "POST",
          url: "http://localhost:8000/api/voicetocode",
          data: formData,
        }).then((res) => {
          console.log(res);
          console.log(res.data.code);
          console.log(res.data.text);
          props.addCode(res.data.code);
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
      console.log(blobURL);
    }
  };

  return (
    <div className="sidepanel-container">
      <SettingsModal modal={props.modalShow} toggleModal={props.toggleModal} />
      <div className="filename-tab">
        <div style={{ display: 'flex' }}>
          <img src={Python} alt="Python Logo" id="click" />
          <p>{props.filename}</p>
        </div>
        <button className="transparent"><img src={X} alt="close" id="click" /></button>
      </div>
      <div className="bracky-sidepanel" data-theme={props.theme}>
        <div className="sidepanel-header">
          <form>
            <input type="search" className="submit" placeholder="Search ConvoDex" />
          </form>
          <button className="transparent" onClick={props.open}><img src={Minimize} alt="minimize" id="click" /></button>
        </div>
        <div className="chatbox">
          <div className="entry-text">
            <img src={Bracky} alt="bracky" />
            <p>Before we continue, please allow access to a microphone.</p>
          </div>
        </div>
        <div className="sidepanel-footer">
          <button className="transparent" onClick={props.toggleModal}><img src={Settings} alt="settings" id="click" /></button>
          <button className="transparent" onClick={handleSpeakClick}>
            {
              speakText === "SPEAK" ?
                <img src={Mic} alt="mic" id="click" /> :
                <img src={ActiveMic} alt="active mic" id="click" />
            }
          </button>
          <a className="transparent" onClick={toggleDownload} ref={ref} id="a" href="/#"><img src={Download} alt="download" id="click" /></a>
        </div>
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

export default connect(mapStateToProps, { addSpeech, addCode })(BrackyPanel);
