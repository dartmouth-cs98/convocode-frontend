// RECORDER: https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10

import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import { connect } from 'react-redux';
import { addCode } from '../../state/actions';
import { addJavascriptCode, insertJavascriptCode } from '../../state/actions';
import { addHTMLCode, insertHTMLCode } from '../../state/actions';
import { addCSSCode, insertCSSCode } from '../../state/actions';
import { addProjectId, addProjectTitle } from '../../state/actions';
import WebOutput from './WebOutput';
import settings from '../../resources/settings.png';
import singleTab from '../../resources/SingleTab.svg';
import multiTab from '../../resources/MultiTab.svg';
import axios from 'axios';
import './webEditor.css';
import HeaderBar from '../HeaderBar/HeaderBar';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import './index.css'

// loads in .env file if needed
import dotenv from 'dotenv';
import { getSuggestedQuery } from '@testing-library/react';
import ProjectModal from '../Projects/ProjectModal';
dotenv.config({ silent: true });

const WebEditors = (props) => {

  // getting code from nav link props
  const [theme] = useState("light");
  const [outputDetails, setOutputDetails] = useState(null);
  const [open, setOpen] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [title, setTitle] = useState("");
  const [JSquery, setJSQuery] = useState("");
  const [CSSquery, setCSSQuery] = useState("");
  const [HTMLquery, setHTMLQuery] = useState("");
  const [query, setQuery] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("html");
  const [view, setView] = useState("multi");
  const [loading, setLoading] = useState(false);
  const [outputSelection, setOutputSelection] = useState("output");
  
  // sends user input to backend and placed code in appropriate code section 
  function handleSubmitCode() {
    // send user input to get code from openai
    var queryType = null;
    // language check 
    if (currentLanguage === "javascript") {
        queryType = "// Language: javascript \n//" + query;
        console.log(queryType)
    } else if (currentLanguage === "html") {
        queryType = "<!-- " + query + " -->\n + <!DOCTYPE html>";
        console.log(queryType)
    } else {
        queryType = "/* Langauage: CSS */\n/* " + query + "*/";
        console.log(queryType)
    }
    axios.request({
      method: "POST",
      url: `http://localhost:8000/api/getcode`,
      data: {
        userInput: queryType
      }
    }).then((res) => {
      setLoading(false);
      console.log(res);
      console.log(res.data.code);
      console.log(res.data.text);

      if (currentLanguage === "javascript") {
        if (props.javaCode.length === 0) {
            props.addJavascriptCode(res.data.code);
        } else {
            props.insertJavascriptCode(res.data.code);
        } 
      } else if (currentLanguage === "html") {
        if (props.htmlCode.length === 0) {
            props.addHTMLCode(res.data.code);
        } else {
            props.insertHTMLCode(res.data.code);
        } 
      } else {
        if (props.cssCode.length === 0) {
            props.addCSSCode(res.data.code);
        } else {
            props.insertCSSCode(res.data.code);
        } 
      }
    });
  }

  const toggleModal = () => {
    setModalShow(modalShow => !modalShow);
  };

  // Function to call the compile endpoint
  // this is for python: keep in case we want to add back in
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
  // 
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

  const handleTitleChange = (event) => {
    // get new title from event
    const newTitle = event.target.value;
    // set new title
    setTitle(newTitle);
    console.log("Hey")
    console.log("New title! Yay!")
    props.addProjectTitle(newTitle);
  };

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

  // handles input text changes
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  }

  // updates language based on user input
  const handleLangSwitch  = (event) => { 
    setCurrentLanguage(event.target.value);
  }

  return (
    <div className='WebEditorApp'>
        {console.log(currentLanguage)}
        <HeaderBar/>
        <div className='commandBar'>
          {/* <input placeholder="My Project Title" value={title} onChange={handleTitleChange}></input> */}
          <input className="commandInput" placeholder="Type a command" value={query} onChange={handleQueryChange}></input>
          <form className='languageSelect'> 
            <select onChange={handleLangSwitch}>  
              <option value = "html" > HTML   
              </option>  
              <option value = "css" > CSS   
              </option>  
              <option value = "javascript"> JavaScript  
              </option>  
            </select>  
          </form>  
          <button className="pink" onClick={() => { 
             setLoading(!loading);
             handleSubmitCode();
          }} disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button> 
          {/* <button className="pink" onClick={() => { 
                saveCode();
                }}>Save</button> */}
          {/* <ProjectModal></ProjectModal> */}
          <button className="heather-grey"><img src={settings} alt="settings icon" /></button>
          {/* {view === "multi" ?  <button className="heather-grey"><img src={multiTab} alt="settings icon" /></button> : 
          // <button className="heather-grey"><img src={singleTab} alt="settings icon" /></button> */}
         <ProjectModal></ProjectModal>
        </div>
       
        <div className="web-editor-container">
          <div className="editor">
            <CodeEditor
                language={"javascript"}
                theme={theme}
                width="100%"
            />
          </div>
          <div className="editor">
            <CodeEditor
                language={"html"}
                theme={theme}
                width="100%"
            />
          
          </div>
          <div className="editor">
            <CodeEditor
                language={"css"}
                theme={theme}
                width="100%"
            />
           
          </div>
          {/* <WebOutput theme={theme}/> */}
        </div>
        <div>
          <Tabs id="tabs">
            <TabList>
              <Tab id="output">output</Tab>
              <Tab id="console">console</Tab>
            </TabList>
            <TabPanel>
              <div className='tab-output'>
              <WebOutput theme={theme}/>
              </div>
            </TabPanel>
          </Tabs>
        
        </div>
 
 
    </div>
  );
};

const mapStateToProps = (reduxstate) => {
  return { 
    code: reduxstate.code.string, 
    javaCode: reduxstate.project.javaCode,
    htmlCode: reduxstate.project.htmlCode,
    cssCode: reduxstate.project.cssCode,
    id: reduxstate.project.id,
    title: reduxstate.project.title,
 };
};

export default connect(mapStateToProps, { addCode, addJavascriptCode, insertJavascriptCode, addCSSCode, insertCSSCode, addHTMLCode, insertHTMLCode, addProjectId, addProjectTitle })(WebEditors);
