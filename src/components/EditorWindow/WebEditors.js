// RECORDER: https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10

import React, { useState, useEffect, useRef } from 'react';
import protect from '@freecodecamp/loop-protect';
import * as Babel from '@babel/standalone';
import CodeEditor from './CodeEditor';
import { connect } from 'react-redux';
import { addCode } from '../../state/actions';
import { addJavascriptCode, insertJavascriptCode } from '../../state/actions';
import { addHTMLCode, insertHTMLCode } from '../../state/actions';
import { addCSSCode, insertCSSCode } from '../../state/actions';
import { addProjectId, addProjectTitle } from '../../state/actions';
import { addCleanedJavascript } from '../../state/actions';
import WebOutput from './WebOutput';
import settings from '../../resources/settings.png';
import singleTab from '../../resources/SingleTab.svg';
import multiTab from '../../resources/MultiTab.svg';
import axios from 'axios';
import './webEditor.css';
import HeaderBar from '../HeaderBar/HeaderBar';

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
  const [errorLine, setErrorLine] = useState(0);
  
  const jsRef = useRef(null);
  const monacoRef = useRef(null);

  useEffect(() => {
    try {
        // rewrite the user's JavaScript to protect loops
        var processed = transform(props.javascriptCode);
        console.log(processed);
        props.addCleanedJavascript(processed.code);
        /* if (monacoRef.current) {
            var line = jsRef.current.getPosition().lineNumber;
            console.log(line);
            var markers = [{
                severity: monacoRef.current.MarkerSeverity.Warning,
                message: `Possible infinite loop near line ${line}!`,
                startLineNumber: line,
                startColumn: 1,
                endLineNumber: line,
                endColumn: jsRef.current.getModel().getLineLength(line) + 1
            }];
            monacoRef.current.editor.setModelMarkers(jsRef.current.getModel(), "owner", markers);
        } */
    } catch {
        console.log("code incomplete, can't transform");
    }

  }, [props.javascriptCode]);


  // TODO: handle delete, handle paste
  function handleJSDidMount(editor, monaco) {
    jsRef.current = editor;
    console.log(jsRef);
    monacoRef.current = monaco;
  }


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
        if (props.javascriptCode.length === 0) {
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


  const callback = line => {
    alert(`Possible infinite loop near line ${line}`);
  }

  const timeout = 100;
  Babel.registerPlugin('loopProtection', protect(timeout, callback));
  const transform = source => Babel.transform(source, {
    plugins: ['loopProtection'],
  });


  //const transform = source => Babel.transform(source, {plugins: ['loopProtection'], }).code;


  function saveCode() {

    // TO DO: get username, title, description, and tags

    // get java, html, css code, and title from ide page
    const java_code = props.javascriptCode;
    const html_code = props.htmlCode;
    const css_code = props.cssCode;
    const projectTitle = props.projectTitle;

    // check if project id
    const projectId = props.projectId;
    console.log(projectId);

    if (projectId == "") {
      // no project id yet, create new project

      // send post information to the backend 
      axios.request({
        method: "POST",
        url: `http://localhost:8000/api/project`,
        data: {
          user: "fakeusernameslay",
          title: projectTitle,
          description: "fakedescription",
          tags: "medium",
          java_code: java_code,
          html_code: html_code,
          css_code: css_code,
      }
      }).then((res) => {
        // have some sort of popup or change the button to like "code saved!" or something
        console.log("code saved!")
        console.log(res.data);
        props.addProjectId(res.data);
      });
      
    } else {
          // project already exists, update in database instead

          // send post information to the backend 
          const requestUrl = "http://localhost:8000/api/project/:id";
          axios.request({
            method: "PUT",
            url: requestUrl,
            data: {
              projectId: projectId,
              title: projectTitle,
              description: "fakedescription",
              tags: "medium",
              java_code: java_code,
              html_code: html_code,
              css_code: css_code,
          }
          }).then((res) => {
            // have some sort of popup or change the button to like "code saved!" or something
            console.log("code saved!")
          });
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
          <input placeholder="My Project Title" value={title} onChange={handleTitleChange}></input>
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
          <ProjectModal></ProjectModal>
          <button className="heather-grey"><img src={settings} alt="settings icon" /></button>
          {view === "multi" ?  <button className="heather-grey"><img src={multiTab} alt="settings icon" /></button> :
          <button className="heather-grey"><img src={singleTab} alt="settings icon" /></button> 
          }
        </div>
        <div className="web-editor-container">
          <div className="editor">
            <CodeEditor
                language={"javascript"}
                theme={theme}
                width="100%"
                mount={handleJSDidMount}
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
        </div>
        <WebOutput theme={theme}/>
    </div>
  );
};

const mapStateToProps = (reduxstate) => {
  return { 
    code: reduxstate.code.string, 
    javascriptCode: reduxstate.project.javascript,
    htmlCode: reduxstate.project.html,
    cssCode: reduxstate.project.css,
    projectId: reduxstate.project.projectId,
    projectTitle: reduxstate.project.projectTitle,
    cleanedCode: reduxstate.project.cleanedCode,
 };
};

export default connect(mapStateToProps, { addCode, addJavascriptCode, insertJavascriptCode, addCSSCode, insertCSSCode, addHTMLCode, insertHTMLCode, addProjectId, addProjectTitle, addCleanedJavascript })(WebEditors);
