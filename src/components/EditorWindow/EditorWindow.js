// RECORDER: https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10

import React, { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Speak from './Speak';
import BrackyPanel from './BrackyPanel';
import ClosedBrackyPanel from './ClosedBrackyPanel';
import OutputWindow from './OutputWindow';
import { useLocation } from "react-router"

import axios from 'axios';
import MicRecorder from 'mic-recorder-to-mp3';

import './index.css'

const EditorWindow = () => {

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  // getting code from nav link props
  const location = useLocation();
  const [Mp3Recorder, setMp3Recorder] = useState(new MicRecorder({ bitRate: 128 }));
  const [recording, setRecording] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const [speakText, setSpeakText] = useState("SPEAK");
  const [theme, setTheme] = useState("light");
  const [processing, setProcessing] = useState(null);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [code, setCode] = useState(location.state.content);
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(open => !open);
  };

  navigator.getUserMedia({ audio: true },
    () => {
      console.log('Permission Granted');
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
              url: "http://localhost:8000/api/recognize",
              data: formData,
            }).then((res) => {
              console.log("hey");
              console.log(res.data);
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

  // Function to call the compile endpoint
  function submitCode() {
    setProcessing(true)
    
    // reset output if it exists
    if (outputDetails) {
        setOutputDetails(null)
    }
    
    if (code === ``) {
    return
    }

    // Post request to compile endpoint
    axios.post(`http://localhost:8000/api/compiler`, {
        source_code: code, customInput: customInput}).then((res) => {
            console.log("here");
            console.log(res);
            console.log(`id of compiling: ${res.data.token}`);
            checkStatus(res.data);
        }).catch((err) => {
            let error = err.response ? err.response.data : err;
            setProcessing(false);
            console.log(error);
    })
  }
  
  const checkStatus = async (id) => {
    console.log("here");
    // Get request to compile endpoint
    console.log(id);

    try {
        let response = await axios.request(`http://localhost:8000/api/compiler/${id.token}`);
        console.log(response.data);
        let status = response.status;
        console.log(status)
        // Processed - we have a result
        if (status === 201) {
            // still processing
            console.log('still processing');
            setTimeout(() => {
            checkStatus(id)
          }, 2000)
            return
        } else {
            setProcessing(false);  
            console.log(response);
            if (response.data.status === 3) {
                console.log(response.data.description);
                setOutputDetails(response.data.stdout);
            } else {
                setOutputDetails(response.data.description + ":" + response.data.stderr);
            }
            
            return
        }
      } catch (err) {
        console.log("err", err);
        setProcessing(false);
        //showErrorToast();
      }
}



  return (
    <div className="editor-window" data-theme={theme}>
      <div className='editor-header-bar' data-theme={theme}>
        <h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1>
      </div >
      <div className='editor-content'>
        {
          open ?
            <BrackyPanel theme={theme} open={toggleSidebar} code={code} />
            : <ClosedBrackyPanel theme={theme} open={toggleSidebar} code={code} />
        }
        <div className="editor-container" style={open ? { width: '78vw' } : { width: '93vw' }}>
          <CodeEditor
            code={code}
            onChange={onChange}
            language={"python"}
            theme={theme}
            width="100%"
          />
          <OutputWindow theme={theme} output={outputDetails} handleRunClick={submitCode} />
        </div>
      </div>
    </div >
  );
};
export default EditorWindow;
