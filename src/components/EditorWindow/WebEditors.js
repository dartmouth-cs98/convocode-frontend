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
  const [JSquery, setJSQuery] = useState("");
  const [CSSquery, setCSSQuery] = useState("");
  const [HTMLquery, setHTMLQuery] = useState("");
  const [loading, setLoading] = useState(false);


  function handleSubmitCode(code_type) {
    console.log("here");
    // send user input to get code from openai
    var queryType = null;
    if (code_type === "javascript") {
        queryType = "// Language: javascript \n//" + JSquery;
    } else if (code_type === "html") {
        queryType = "<!-- " + HTMLquery + "-->";
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
        setLoading(false);
      console.log(res);
      console.log(res.data.code);
      console.log(res.data.text);
      if (code_type === "javascript") {
        props.addJavascriptCode(res.data.code);
        props.insertJavascriptCode(res.data.code);
      } else if (code_type === "html") {
        props.addHTMLCode(res.data.code);
        //props.insertHTMLCode(res.data.code);
      } else {
        props.addCSSCode(res.data.code);
        props.insertCSSCode(res.data.code);
      }
      
      //props.addSpeech(res.data.text);
    });
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
            <button onClick={() => { 
                setLoading(!loading); 
                submitJavascript();
                }} disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
          </div>
          <div className="editor">
            <CodeEditor
                language={"html"}
                theme={theme}
                width="100%"
            />
            <input placeholder="Get HTML code" value={HTMLquery} onChange={handleHTMLChange}></input>
            <button onClick={() => { 
                setLoading(!loading); 
                submitHTML();
                }} disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
          </div>
          <div className="editor">
            <CodeEditor
                language={"css"}
                theme={theme}
                width="100%"
            />
            <input placeholder="Get CSS code" value={CSSquery} onChange={handleCSSChange}></input>
            <button onClick={() => { 
                setLoading(!loading); 
                submitCSS();
                }} disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
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
