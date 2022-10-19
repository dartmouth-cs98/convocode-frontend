// RECORDER: https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10

import React, {useState, useEffect} from 'react';
import CodeEditor from './CodeEditor';
import Output from './Output';
import Run from "./Run";
import Speak from './Speak';
import '../styles/run.css';
import '../styles/window.css';
import '../styles/header.css';
import axios from 'axios';
import MicRecorder from 'mic-recorder-to-mp3';
import { CobraWorkerFactory } from "@picovoice/cobra-web-worker";
import { WebVoiceProcessor } from "@picovoice/web-voice-processor"
import FileReader from 'filereader';

export const EditorWindow = () => {
    const pythonDefault = `# Python Editor`;
    
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
    const [Mp3Recorder, setMp3Recorder] = useState(new MicRecorder({ bitRate: 128 }));
    const [recording, setRecording] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const [blobURL, setBlobURL] = useState("");
    const [speakText, setSpeakText] = useState("SPEAK");
    const [theme, setTheme] = useState("vs-dark");
    const [processing, setProcessing] = useState(null);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [code, setCode] = useState(pythonDefault);
    const [voiceDetected, setVoiceDetected] = useState(false);
    const [chunks, setChunks] = useState([]);

    
    useEffect(() => {
      console.log(`new chunks: ${chunks}`);
  }, [chunks]);


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
      
      

      function cobraCallback(voiceProbability) {
        // voiceProbability: Probability of voice activity. It is a floating-point number within [0, 1].
        // console.log("calling back");
        const threshold = 0.6;
        if (voiceProbability >= threshold) {
          console.log("voice done!");
          console.log(voiceProbability);
          setVoiceDetected(true);
        } else {
          console.log("nothing");
          setVoiceDetected(false);
        }
      }

      
      
      async function startCobra() {
        const accessKey = "zAe8bJQx3JiwcOMUjz0OSPlcECvTuV0RZNQ9hpmJm4lrYbFuM4NpoQ==";
        // const handle = await Cobra.create(accessKey);

        const cobraWorker = await CobraWorkerFactory.create(
          accessKey,
          cobraCallback
        );
    
        
      

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          console.log("getUserMedia supported.");
  
          navigator.mediaDevices
            .getUserMedia(
              // constraints - only audio needed for this app
              {
                audio: true,
              }
            )

            // Success callback
            .then((stream) => {
              WebVoiceProcessor.subscribe(cobraWorker);
              const mediaRecorder = new MediaRecorder(stream);
              mediaRecorder.start(1000);
              console.log(mediaRecorder.state);
              console.log("recorder started");
              mediaRecorder.ondataavailable = (e) => {
                if (voiceDetected == true) {
                  setChunks(prevChunks => {
                    console.log("HERE")
                    return ([...prevChunks, e.data])
                  });
                  // chunks.push(e.data);
                  // console.log(chunks);
                  console.log("DETECTED VOICE");
                }
              
                else if (voiceDetected == false && chunks.length != 0) {
                  console.log("hello");
                  const blob = new Blob(chunks, { type: "audio/wav"});
                  console.log(`before reset: ${chunks}`);
                  setChunks(new Array(0));
                  console.log(chunks);
                   
                  let file = new File([blob], 'chunk.wav');
                  console.log(file);
                  const formData = new FormData();
                  formData.append('file', file);
                  const audioURL = window.URL.createObjectURL(blob);
                  console.log(audioURL);
                  axios.request({
                    method: "POST",
                    url: "http://localhost:8000/api/recognize",
                    data: formData,
                    // headers: {
                      // "content-type": `multipart/form-data;`
                    // }
                  }).then((res) => {
                    console.log(res);
                  }) 

                }
    
                    
                  
              }

            }).catch((err) => {
              console.error(`The following getUserMedia error occurred: ${err}`);
            });
 
                
        }
           else {
          console.log("getUserMedia not supported on your browser!");
        }
    }
    
    
    startCobra();

      function start() {
        if (blocked) {
          console.log('Permission Denied');
        } else {
          const mediaRecorder = new MediaRecorder()
          
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
            const blobURL = URL.createObjectURL(blob)
            setBlobURL(blobURL);
            setRecording(false);
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
                <Speak handleClick={handleSpeakClick} text={speakText} type="button"/>
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
