import React, { useState, useRef, useEffect } from "react"
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
import { insertCode } from "../../state/actions"
import axios from 'axios';


import './index.css'

// loads in .env file if needed
import dotenv from 'dotenv';
dotenv.config({ silent: true });


const BrackyPanel = (props) => {

  const ref = useRef(null);
  const [initiateDownload, setInitiateDownload] = useState(false);
  const [Mp3Recorder] = useState(new MicRecorder({ bitRate: 128 }));
  const [blocked, setBlocked] = useState(false);
  const [speakText, setSpeakText] = useState("SPEAK");


  // downloading file
  useEffect(() => {
    var a = ref.current;
    a = document.getElementById("a");
    var file = new Blob([props.code], { type: 'application/python' });
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

  // START OF VOICE TO CODE LOGIC
  /*
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
        const formData = new FormData();
        formData.append('my_file', file);
        const audioURL = window.URL.createObjectURL(blob);
        axios.request({
          method: "POST",
          url: `http://localhost:8000/api/getcode`,
          data: {
            testString: "my test string"
          } // need to fix this file issue
        }).then((res) => {
          console.log(res);
          console.log(res.data.code);
          console.log(res.data.text);
          props.insertCode(res.data.code);
          props.addSpeech(res.data.text);
        });
      }).catch((e) => console.log(e));
  };*/
  // END OF VOICE TO CODE LOGIC

  function handleSpeakClick() {

    // send user input to get code from openai
    axios.request({
      method: "POST",
      url: `http://localhost:8000/api/getcode`,
      data: {
        // user input hard coded here while we transition from voice to typing
        userInput: "for i in range 10 print i"
      }
    }).then((res) => {
      console.log(res);
      console.log(res.data.code);
      console.log(res.data.text);
      props.insertCode(res.data.code);
      props.addSpeech(res.data.text);
    });

    // START OF VOICE TO CODE LOGIC
    /*
    if (speakText === "SPEAK") {
      setSpeakText("STOP");
      start();
    } else {
      setSpeakText("SPEAK");
      stop();
    }*/
    // END OF VOICE TO CODE LOGIC
  };

  return (
    <div className="sidepanel-container">
      \      <div className="filename-tab">
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
            <p>Press the recording button to tell me what code you want.</p>
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

export default connect(mapStateToProps, { addSpeech, insertCode })(BrackyPanel);
