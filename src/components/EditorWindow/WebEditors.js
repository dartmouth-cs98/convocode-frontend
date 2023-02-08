// RECORDER: https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10

import React, { useState, useRef, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import { connect } from 'react-redux';
import { addCode } from '../../state/actions';
import { addJavascriptCode, insertJavascriptCode } from '../../state/actions';
import { addHTMLCode, insertHTMLCode } from '../../state/actions';
import { addCSSCode, insertCSSCode } from '../../state/actions';
import { addProjectId, addProjectTitle } from '../../state/actions';
import { insertCodeTag, replaceCodeTag, appendCodeTag, deleteCodeTag } from '../../state/actions';
import { setQuery } from '../../state/actions';
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
  const [chunks, setChunks] = useState([]);
  const [added, setAdded] = useState("");
  const [decorations, setDecorations] = useState([]);
  const [show, setShow] = useState(false);

  const jsRef = useRef(null);
  const cssRef = useRef(null);
  const htmlRef = useRef(null);
  const monacoRef = useRef(null);
  
  // THESE ARE THE VARIABLES THAT ARE NOT IN STATE 
  // JScursorLine = current position of cursor
  var JScursorLine = 0;
  // JStotalLines = total lines in the editor
  var JStotalLines = 1;
  // lastLines = last line inserted
  var JSlastLines = 1;

  useEffect(() => {
    /* if (jsRef.current) {
        console.log(decorations);
        console.log("i am here");
        var d = jsRef.current.deltaDecorations(decorations, [{ range: new monacoRef.current.Range(JScursorLine,1,jsRef.current.getPosition().lineNumber,1), 
            options: { isWholeLine: true, 
            linesDecorationsClassName: 'margin-class', 
            hoverMessage: {value: props.query}, 
            glyphMarginClassName: "margin-class",
            glyphMarginHoverMessage: {value: props.query},
        stickiness: 1}}]); 
        console.log(d);
        setDecorations(d);
        return () => jsRef.current.deltaDecorations(decorations, []); */
    //document.documentElement.style.setProperty('--main-color', "aquamarine");
    /* if (jsRef.current) {
        var results = displayTags()
        var decorations = []
        for (var i = 0; i < results.length; i++) {
            if (props.tags[results[i][0]] !== -1) {
                decorations.push({range: new monacoRef.current.Range(results[i][0] + 1,1,results[i][1] + 1,1), 
                    options: { isWholeLine: true, 
                    linesDecorationsClassName: 'margin-class', 
                    hoverMessage: {value: props.tags[results[i][0]]}, 
                    glyphMarginClassName: "margin-class"}});
            }      
        }
        var d = jsRef.current.deltaDecorations([], decorations);

    } */


    
    //}


  }, [show]);
  
  var changeLog = []
  // TODO: handle delete, handle paste
  function handleJSDidMount(editor, monaco) {
    jsRef.current = editor;
    console.log(jsRef);
    monacoRef.current = monaco;

    jsRef.current.onDidChangeModelContent(e => {
        /* if (e.changes[0].forceMoveMarkers) {         
            var d = jsRef.current.deltaDecorations([], [{ range: new monacoRef.current.Range(JScursorLine,1,jsRef.current.getPosition().lineNumber,1), options: { isWholeLine: true, inlineClassName: 'test-class', hoverMessage: {value: props.query}}}]); 
        } */ /* else {
            var d = jsRef.current.getModel().getDecorationsInRange(new monacoRef.current.Range(JScursorLine,1,JScursorLine,1));
            console.log(d);
        } */
        //JScursorLine = jsRef.current.getPosition().lineNumber;
        

        JScursorLine = jsRef.current.getPosition().lineNumber - 1;
        console.log(`total lines: ${JStotalLines}`);
        console.log(`cursor lines: ${JScursorLine + 1}`);
        console.log(`reported lines: ${jsRef.current.getModel().getLineCount()}`)
        if (!e.changes[0].forceMoveMarkers && JStotalLines === jsRef.current.getModel().getLineCount())  {
            props.replaceCodeTag({ query: -1, index: JScursorLine });
        } else if (!e.changes[0].forceMoveMarkers && JStotalLines < jsRef.current.getModel().getLineCount() && JScursorLine + 1 < jsRef.current.getModel().getLineCount()) {
            props.insertCodeTag({ query: -1, index: JScursorLine });
        } else if (!e.changes[0].forceMoveMarkers && JStotalLines < jsRef.current.getModel().getLineCount() && JScursorLine + 1 === jsRef.current.getModel().getLineCount()) {
            props.appendCodeTag({query: -1, index: JScursorLine });
        } else if (!e.changes[0].forceMoveMarker && JStotalLines > jsRef.current.getModel().getLineCount()) {
            console.log(e.changes[0].range);
            for (var i = e.changes[0].range.endLineNumber - 1; i > e.changes[0].range.startLineNumber - 1; i--) {
                console.log(i);
                props.deleteCodeTag({index: i });
            }     
        }
        JStotalLines = jsRef.current.getModel().getLineCount();
        JSlastLines = JScursorLine;
    });

    
    /* editor.onDidChangeCursorSelection((e) => {
        console.log(e);
        const startLine = e.selection.startLineNumber;
        const endLine = e.selection.endLineNumber;

        var decorations = [];
        console.log(props.tags);
        var result = displayTags();
        for (var i = 0; i < result.length; i++) {
            console.log(props.tags[result[i][0]]);
            if (props.tags[result[i][0]] !== -1) {
                decorations = jsRef.current.deltaDecorations(decorations, { range: new monacoRef.current.Range(result[i][0],1,result[i][1],1), options: { isWholeLine: true, linesDecorationsClassName: 'test-class' }})
            }
        }
    });  */
  }
  


  function handleCSSDidMount(editor, monaco) {
    cssRef.current = editor;
  }

  function handleHTMLDidMount(editor, monaco) {
    htmlRef.current = editor;
  }



  function displayTags() {
    const arr = props.tags;
    console.log(props.tags);
    let result = [];
    let start = 0;
    for (let i = 1; i <= arr.length; i++) {
        if (arr[i] !== arr[i - 1]) {
            result.push([start, i - 1]);
            start = i;
        }
    }
    console.log(result);
    console.log(jsRef.current);

    return result;
  }




  // sends user input to backend and placed code in appropriate code section 
  function handleSubmitCode() {
    // send user input to get code from openai
    var queryType = null;
    // language check 
    if (currentLanguage === "javascript") {
        queryType = "// Language: javascript \n//" + props.query;
    } else if (currentLanguage === "html") {
        queryType = "<!-- " + props.query + " -->\n + <!DOCTYPE html>";
    } else {
        queryType = "/* Langauage: CSS */\n/* " + props.query + "*/";
    }
    setPreviousLine(JScursorLine);
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
      const lines = res.data.code.split(/\r\n|\r|\n/).length;
      if (currentLanguage === "javascript") {
        if (props.javascriptCode.length === 0) {
            props.addJavascriptCode(res.data.code);
        } else {
            props.insertJavascriptCode(res.data.code);
        }
        setAdded(lines);
        console.log(added);
        //const totalLines = editor.getModel().getLineCount();
        console.log(`current line: ${JScursorLine}`);
        console.log(JScursorLine);
        console.log(JScursorLine + lines - 1);
        for (var i = JScursorLine; i < JScursorLine + lines - 1; i++) {
            props.appendCodeTag({index: i, query: props.query});

        }
        JScursorLine = JScursorLine + lines - 1;
        JStotalLines = jsRef.current.getModel().getLineCount();
    

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
    props.setQuery(event.target.value);
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
          <input className="commandInput" placeholder="Type a command" value={props.query} onChange={handleQueryChange}></input>
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
        <button onClick={() => {setShow(true)}}>Display AI Input Breakdown</button>
        <div className="web-editor-container">
          <div className="editor" id="javascript" >
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
            getTextHighlight}} onMouseLeave={setOpen(false)} onClicke={setOpen(false)}>{props.htmlCode}
          </div> */}
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
    query: reduxstate.query.query,
 };
};

export default connect(mapStateToProps, { addCode, addJavascriptCode, insertJavascriptCode, addCSSCode, insertCSSCode, addHTMLCode, insertHTMLCode, addProjectId, addProjectTitle, insertCodeTag, replaceCodeTag, appendCodeTag, deleteCodeTag, setQuery })(WebEditors);
