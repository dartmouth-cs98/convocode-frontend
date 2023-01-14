// RECORDER: https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10

import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import BrackyPanel from './BrackyPanel';
import ClosedBrackyPanel from './ClosedBrackyPanel';
import OutputWindow from './OutputWindow';
import { connect } from 'react-redux';
import { addCode } from '../../state/actions';
import { addJavascriptCode, insertJavascriptCode } from '../../state/actions';
import { addCSSCode, insertCSSCode } from '../../state/actions';
import { addHTMLCode, insertHTMLCode } from '../../state/actions';
import WebOutput from './WebOutput';
import axios from 'axios';
import './webEditor.css';

import './index.css'
import { NavLink } from 'react-router-dom';

// loads in .env file if needed
import dotenv from 'dotenv';
import { getSuggestedQuery } from '@testing-library/react';
dotenv.config({ silent: true });

const WebEditors = (props) => {

  // getting code from nav link props
  const [theme] = useState("light");
  const [outputDetails, setOutputDetails] = useState(null);
  const [open, setOpen] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [JSquery, setJSQuery] = useState("");
  const [CSSquery, setCSSQuery] = useState("");
  const [HTMLquery, setHTMLQuery] = useState("");

  const toggleSidebar = () => {
    setOpen(open => !open);
  };

  function handleSubmitCode(code_type) {
    console.log("here");
    // send user input to get code from openai
    var queryType = null;
    if (code_type === "javascript") {
        queryType = "// Language: javascript \n//" + JSquery;
    } else if (code_type === "html") {
        queryType = "<!-- " + HTMLquery + " -->\n + <!DOCTYPE html>";
    } else {
        queryType = "/* Langauage: CSS */\n/* " + CSSquery + "*/";
    }
    axios.request({
      method: "POST",
      url: `http://localhost:8000/api/getcode`,
      data: {
        // user input hard coded here while we transition from voice to typing
        userInput: queryType
      }
    }).then((res) => {
      console.log(res);
      console.log(res.data.code);
      console.log(res.data.text);
      if (code_type === "javascript") {
        props.addJavascriptCode(res.data.code);
        props.insertJavascriptCode(res.data.code);
      } else if (code_type === "html") {
        props.addHTMLCode(res.data.code);
        props.insertHTMLCode(res.data.code);
      } else {
        props.addCSSCode(res.data.code);
        props.insertCSSCode(res.data.code);
      }
      
      //props.addSpeech(res.data.text);
    });
  }

  const toggleModal = () => {
    setModalShow(modalShow => !modalShow);
  };

  // Function to call the compile endpoint
  function submitCode() {

    // reset output if it exists
    if (outputDetails) {
      setOutputDetails(null)
    }


    // Post request to compile endpoint
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/compiler`, {
      source_code: props.code
    }).then((res) => {
      console.log("here");
      console.log(res);
      console.log(`id of compiling: ${res.data.token}`);
      checkStatus(res.data);
    }).catch((err) => {
      let error = err.response ? err.response.data : err;
      console.log(error);
    })
  }

  const checkStatus = async (id) => {
    console.log("here");
    // Get request to compile endpoint
    console.log(id);

    try {
      let response = await axios.request(`${process.env.REACT_APP_BACKEND_URL}/compiler/${id.token}`);
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
    }
  }
  const handleJSChange = (event) => {
    // 👇 Get input value from "event"
    setJSQuery(event.target.value);
  };

  const handleCSSChange = (event) => {
    // 👇 Get input value from "event"
    setCSSQuery(event.target.value);
  };

  const handleHTMLChange = (event) => {
    // 👇 Get input value from "event"
    setHTMLQuery(event.target.value);
  };

  const submitJavascript = () => {
    handleSubmitCode("javascript");
    setJSQuery("");

  };

  const submitCSS = () => {
    handleSubmitCode("css");
    setCSSQuery("");
  };

  const submitHTML = () => {
    handleSubmitCode("html");
    setHTMLQuery("");
  }

  return (
        <div className="web-editor-container">
          <div className="editor">
            <CodeEditor
                language={"javascript"}
                theme={theme}
                width="100%"
            />
            <input placeholder="Get javascript code" value={JSquery} onChange={handleJSChange}></input>
            <button onClick={submitJavascript}>Submit</button>
          </div>
          <div className="editor">
            <CodeEditor
                language={"html"}
                theme={theme}
                width="100%"
            />
            <input placeholder="Get HTML code" value={HTMLquery} onChange={handleHTMLChange}></input>
            <button onClick={submitHTML}>Submit</button>
          </div>
          <div className="editor">
            <CodeEditor
                language={"css"}
                theme={theme}
                width="100%"
            />
            <input placeholder="Get CSS code" value={CSSquery} onChange={handleCSSChange}></input>
            <button onClick={submitCSS}>Submit</button>
          </div>
          <WebOutput theme={theme}/>
        </div>
  );
};

const mapStateToProps = (reduxstate) => {
  return { 
    code: reduxstate.code.string, 
    javascriptCode: reduxstate.javascriptCode.string,
    htmlCode: reduxstate.htmlCode.string,
    cssCode: reduxstate.cssCode.string,
 };
};


export default connect(mapStateToProps, { addCode, addJavascriptCode, insertJavascriptCode, addCSSCode, insertCSSCode, addHTMLCode, insertHTMLCode })(WebEditors);
