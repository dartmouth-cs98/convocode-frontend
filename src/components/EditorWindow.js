// RECORDER: https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10

import React, {useState} from 'react';
import CodeEditor from './CodeEditor';
import Output from './Output';
import Run from "./Run";
import Speak from './Speak';
import '../styles/run.css';
import '../styles/window.css';
import '../styles/header.css';
import axios from 'axios';
// import MicRecorder from 'mic-recorder-to-mp3'; //remove
// import MicrophoneStream from 'microphone-stream'; //remove
import socketIoStream from 'socket.io-stream';
// import { listen, socket } from '../api';
import RecordRTC, { StereoAudioRecorder } from 'recordrtc';
import openSocket from 'socket.io-client';


export const EditorWindow = () => {
  
  
  
  const pythonDefault = `# Python Editor`;
  const socket = openSocket("http://localhost:8080", { transports : ['websocket'] });

  function listen(audio) {
      socket.on('ready', console.log("recieved from server"));
      socket.emit('audio', audio);

  }

  // Post request to compile endpoint
  axios.get(`http://localhost:8000/api/`).then((res) => {
        console.log("here");
        console.log(res);
        console.log(`convodex: ${res.data}`);
    }).catch((err) => {
        console.log(err);
});
  
  let recordAudio;
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
    // const [Mp3Recorder, setMp3Recorder] = useState(new MicRecorder({ bitRate: 128 }));
    const [recording, setRecording] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const [blobURL, setBlobURL] = useState("");
    const [speakText, setSpeakText] = useState("SPEAK");
    const [theme, setTheme] = useState("vs-dark");
    const [processing, setProcessing] = useState(null);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [code, setCode] = useState(pythonDefault);
    

    const stt = async() => {
      let res = await axios.get(`http://localhost:8000/api/watson_auth`);
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

      navigator.mediaDevices.getUserMedia({ video: false, audio: true })
      .then(function(stream) {
          recordAudio = RecordRTC(stream, {
            type: 'audio',
            mimeType: 'audio/webm',
            sampleRate: 44100,
            desiredSampRate: 16000,
            recorderType: StereoAudioRecorder, 
            numberOfAudioChannels: 1,
            timeSlice: 4000, 
            ondataavailable: function(blob) {
              var stream = socketIoStream.createStream();
              
              console.log(stream);
              socket.emit('audio', stream, {
                name: 'stream.wav', 
                size: blob.size
              });
              socketIoStream.createBlobReadStream(blob).pipe(stream);
              
            }

          });
          recordAudio.startRecording();
      }, function(error) {
          console.error(JSON.stringify(error));
      });
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
        axios.post(`http://localhost:8000/api/judge_submit`, {
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
            let response = await axios.request(`http://localhost:8000/api/compile_judge/${id.token}`);
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
        <div>  
            <div className="header-container">
                <Run handleClick={submitCode} text="RUN" type="button"/>
                <Speak handleClick={stt} text={speakText} type="button"/>
            </div>
            <div className="editor-container">
                <CodeEditor 
                    code={code}
                    onChange={onChange}
                    language={"python"}
                    theme={theme}
                />
            </div>
            <Output output={outputDetails} />
        </div>
    );
}
