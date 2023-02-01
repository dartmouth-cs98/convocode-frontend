// RECORDER: https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10

import React, { useState, useRef, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import { connect } from 'react-redux';
import { addCode } from '../../state/actions';
import { addJavascriptCode, insertJavascriptCode } from '../../state/actions';
import { addHTMLCode, insertHTMLCode } from '../../state/actions';
import { addCSSCode, insertCSSCode } from '../../state/actions';
import { addProjectId, addProjectTitle } from '../../state/actions';
import { insertCodeTag, replaceCodeTag, appendCodeTag } from '../../state/actions';
import WebOutput from './WebOutput';
import settings from '../../resources/settings.png';
import singleTab from '../../resources/SingleTab.svg';
import multiTab from '../../resources/MultiTab.svg';
//import Tooltip from '@mui/material';
import axios from 'axios';
import './webEditor.css';
import HeaderBar from '../HeaderBar/HeaderBar';

import './index.css'

// loads in .env file if needed
import dotenv from 'dotenv';
import { getSuggestedQuery } from '@testing-library/react';
dotenv.config({ silent: true });

const WebEditors = (props) => {

  // getting code from nav link props
  const [theme] = useState("light");
  const [outputDetails, setOutputDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [query, setQuery] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("html");
  const [view, setView] = useState("multi");
  const [loading, setLoading] = useState(false);
  const [highlighted, setHighlighted] = useState("");
  const [editor, setEditor] = useState(null);
  const [monaco, setMonaco] = useState(null);
  //const [lastInsert, setLastInsert] = useState(1);
  //const [currentLines, setCurrentLines] = useState("");
  const [cursorLocation, setCursorLocation] = useState(1);
  const [lineStructure, setLineStructure] = useState([]);
  const [lineCount, setLineCount] = useState(1);
  const [previousLine, setPreviousLine] = useState(1);

  const jsRef = useRef(null);
  const cssRef = useRef(null);
  const htmlRef = useRef(null);
  
  // THESE ARE THE VARIABLES THAT ARE NOT IN STATE 
  // cursorLine = current position of cursor
  var cursorLine = 0;
  // totalLines = total lines in the editor
  var totalLines = 1;
  // lastLines = last line inserted
  var lastLines = 1;


  function handleJSDidMount(editor, monaco) {
    jsRef.current = editor;
    console.log(jsRef);
    //setMonaco(monaco);
    //setEditor(editor);
    totalLines = jsRef.current.getModel().getLineCount();
    //console.log(editor.getModel().getLineCount());
    //setLineCount(initialLines);
    editor.onDidChangeCursorPosition(e => {
        console.log(`cursor location state: ${cursorLine}\nreported position: ${e.position.lineNumber}`);
        cursorLine = e.position.lineNumber - 1;
        totalLines = jsRef.current.getModel().getLineCount();
        if (e.source !== "modelChange" && totalLines === jsRef.current.getModel().getLineCount()) {
            lastLines = cursorLine;
            props.replaceCodeTag({ query: -1, index: cursorLine });
        } 

        if (e.source !== "modelChange" && totalLines < cursorLine + 1 ) {
      
            totalLines = jsRef.current.getModel().getLineCount();
            lastLines = cursorLine;
            props.appendCodeTag({query: -1, index: cursorLine });
        } 
    });
  }

  


  function handleCSSDidMount(editor, monaco) {
    cssRef.current = editor;
  }

  function handleHTMLDidMount(editor, monaco) {
    htmlRef.current = editor;
  }


  // sends user input to backend and placed code in appropriate code section 
  function handleSubmitCode() {
    // send user input to get code from openai
    var queryType = null;
    // language check 
    if (currentLanguage === "javascript") {
        queryType = "// Language: javascript \n//" + query;
    } else if (currentLanguage === "html") {
        queryType = "<!-- " + query + " -->\n + <!DOCTYPE html>";
    } else {
        queryType = "/* Langauage: CSS */\n/* " + query + "*/";
    }
    setPreviousLine(cursorLine);
    axios.request({
      method: "POST",
      url: `http://localhost:8000/api/getcode`,
      data: {
        userInput: queryType
      }
    }).then((res) => {
      setLoading(false);
      //const tag = {codeOutput: res.data.code, codeInput: query}
      //props.addCodeTag(tag);
      console.log(res.data.code);
      
      if (currentLanguage === "javascript") {
        if (props.javascriptCode.length === 0) {
            props.addJavascriptCode(res.data.code);
        } else {
            props.insertJavascriptCode(res.data.code);
        }
        const lines = res.data.code.split(/\r\n|\r|\n/).length;
        console.log(lines);
        //const totalLines = editor.getModel().getLineCount();
        console.log(`current line: ${cursorLine}`);
        console.log(lastLines);
        console.log(lastLines + lines);
        for (var i = lastLines; i < lastLines + lines - 1; i++) {
            props.appendCodeTag({index: i, query: query});
        }
        cursorLine = lastLines + lines - 1;
        totalLines += lines;
    

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
          <button className="pink" onClick={() => { 
                saveCode();
                }}>Save</button>
          <button className="heather-grey"><img src={settings} alt="settings icon" /></button>
          {view === "multi" ?  <button className="heather-grey"><img src={multiTab} alt="settings icon" /></button> :
          <button className="heather-grey"><img src={singleTab} alt="settings icon" /></button> 
          }
        </div>
        <div className="web-editor-container">
          <div className="editor" id="javascript">
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
                mount={handleHTMLDidMount}
            />
          
          </div>
          <div className="editor">
            <CodeEditor
                language={"css"}
                theme={theme}
                width="100%"
                mount={handleCSSDidMount}
            />
           
          </div>
          {/* <div className="editor" onMouseUp={() => {
            setOpen(!open);
            getTextHighlight}} onMouseLeave={setOpen(false)} onClicke={setOpen(false)}>{props.htmlCode}</div> */}
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
    tags: reduxstate.project.tags,
 };
};

export default connect(mapStateToProps, { addCode, addJavascriptCode, insertJavascriptCode, addCSSCode, insertCSSCode, addHTMLCode, insertHTMLCode, addProjectId, addProjectTitle, insertCodeTag, replaceCodeTag, appendCodeTag })(WebEditors);
