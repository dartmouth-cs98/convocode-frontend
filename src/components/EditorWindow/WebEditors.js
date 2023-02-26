// RECORDER: https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10

import React, { useState, useEffect, useRef } from 'react';
import protect from '@freecodecamp/loop-protect';
import * as Babel from '@babel/standalone';
import CodeEditor from './CodeEditor';
import StdinWindow from './StdinWindow';
import { connect } from 'react-redux';
import { addCode } from '../../state/actions';
import { addJavascriptCode, insertJavascriptCode } from '../../state/actions';
import { addHTMLCode, insertHTMLCode } from '../../state/actions';
import { addCSSCode, insertCSSCode } from '../../state/actions';
import { addProjectId, addProjectTitle } from '../../state/actions';
import { addCleanedJavascript } from '../../state/actions';
import { addJavaCodeHistory, addCSSCodeHistory, addHTMLCodeHistory } from '../../state/actions';
import { setJavaDisplay, setCSSDisplay, setHTMLDisplay } from '../../state/actions';
import { setJavaEditor, setCssEditor, setHtmlEditor, setMonaco } from '../../state/actions';
import WebOutput from './WebOutput';
import settings from '../../resources/settings.png';
import axios from 'axios';
import './webEditor.css';
import HeaderBar from '../HeaderBar/HeaderBar';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import './index.css'
import Tour from '../EditorWindow/Onboarding/Tour.js'
import OutputWindow from './OutputWindow'
import {toggleDisplay} from '../../utils/tagUtils';

// import { lazy } from 'react';

// loads in .env file if needed
import dotenv from 'dotenv';
import ProjectModal from '../Projects/ProjectModal';
import ProjectModalForm from '../Projects/ProjectModalForm';
import { getOpenAICode } from '../../services/getCode';
dotenv.config({ silent: true });




const WebEditors = (props) => {

  // getting code from nav link props
  const [theme] = useState("light");
  const [stdin, setStdin] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [_modalShow, setModalShow] = useState(false);
  const [_title, setTitle] = useState("");
  const [query, setQuery] = useState("");
  const [remoteAdd, setRemoteAdd] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("html");
  const [changedLines, setChangedLines] = useState([])
  const [view, setView] = useState("multi");
  const [loading, setLoading] = useState(false);
  const [jsDecorations, setJsDecorations] = useState([]);
  const [cssDecorations, setCssDecorations] = useState([]);
  const [htmlDecorations, setHtmlDecorations] = useState([]);

  const jsRef = useRef(null);
  const monacoRef = useRef(null);
  const cssRef = useRef(null);
  const htmlRef = useRef(null);

  function getHistory(codeType) {
    var history;
    if (codeType === "javascript") {
      history = props.javaCodeHistory;
    } else if (codeType === "css") {
      history = props.cssCodeHistory;
    } else {
      history = props.htmlCodeHistory;
    }
    return history;

  }


 function getNewTags(q, newCode, codeType) {
    var history = getHistory(codeType);
    var tags = []
    if (history.length === 0) {
      for (var i = 0; i < newCode.length; i++) {
        tags.push(q);
      }
    }
    else {
      const oldCode = history.slice(-1)[0].code;
      console.log(oldCode);
      if (oldCode.length === 1) {
        for (var i = 0; i < newCode.length; i++) {
          tags.push(q);
        }

      } else {
        // if the new code is larger in line count than the old code
        // pointer for location in old code
        var oP = 0;
        // pointer for location in new code
        var nP = 0;
        const oldTags = history.slice(-1)[0].tags;
        if (oldCode.length <= newCode.length) {
          while (oP < oldCode.length || nP < newCode.length) {
            if (oldCode[oP] === newCode[nP]) {
              tags.push(oldTags[oP]);
              nP++;
              oP++;
            }
            else {
              tags.push(q);
              nP++;
              if (oldCode.length === newCode.length) {
                oP++;
              }
            }
          }
        } else {
          while (oP < oldCode.length || nP < newCode.length) {
            if (oldCode[oP] === newCode[nP]) {
              tags.push(oldTags[oP]);
              nP++;
              oP++;
            }
            else {
              oP++;
              }
            }
          }
      }       
    }
    console.log(tags);
    return tags;
  }  


  function handleJSDidMount(editor, monaco) {
    props.setJavaEditor(editor);
    props.setMonaco(monaco);
    //jsRef.current = editor;
    //monacoRef.current = monaco;
  }

  function handleCSSDidMount(editor, monaco) {
    props.setCssEditor(editor);
  }

  function handleHTMLDidMount(editor, monaco) {
    props.setHtmlEditor(editor);
  }
  // const Tour = lazy(() => import('/Users/williamperez/Documents/GitHub/convocode-frontend/src/components/EditorWindow/Onboarding/Tour.js'));
  
  useEffect(() => {
    try {
        // rewrite the user's JavaScript to protect loops
        var processed = transform(props.javaCode);
        console.log(processed);
        props.addCleanedJavascript(processed.code);
    } catch {
        console.log("code incomplete, can't transform");
    } try {
      console.log(remoteAdd);
      if (remoteAdd) {
        const newTags = getNewTags(query, props.javaCode.split(/\r\n|\r|\n/), "javascript");
        props.addJavaCodeHistory({query: query, updatedCode: props.javaCode.split(/\r\n|\r|\n/), tags: newTags});
        setRemoteAdd(false);

      } else {
        const newTags = getNewTags(-1, props.javaCode.split(/\r\n|\r|\n/), "javascript");
        props.addJavaCodeHistory({query: -1, updatedCode: props.javaCode.split(/\r\n|\r|\n/), tags: newTags});

      }

    } catch {
      console.log("couldn't add code history");

    }
    setQuery("");

  }, [props.javaCode]);

  useEffect(() => {
    try {
      console.log(remoteAdd);
      if (remoteAdd) {
        const newTags = getNewTags(query, props.cssCode.split(/\r\n|\r|\n/), "css");
        props.addCSSCodeHistory({query: query, updatedCode: props.cssCode.split(/\r\n|\r|\n/), tags: newTags});
        setRemoteAdd(false);

      } else {
        const newTags = getNewTags(-1, props.cssCode.split(/\r\n|\r|\n/), "css");
        props.addCSSCodeHistory({query: -1, updatedCode: props.cssCode.split(/\r\n|\r|\n/), tags: newTags});
      }
    } catch {
      console.log("couldn't add code history");
    }
    setQuery("");

  }, [props.cssCode]);

  useEffect(() => {
    try {
      console.log(remoteAdd);
      if (remoteAdd) {
        const newTags = getNewTags(query, props.htmlCode.split(/\r\n|\r|\n/), "html");
        props.addHTMLCodeHistory({query: query, updatedCode: props.htmlCode.split(/\r\n|\r|\n/), tags: newTags});
        setRemoteAdd(false);
        console.log(newTags);

      } else {
        const newTags = getNewTags(-1, props.htmlCode.split(/\r\n|\r|\n/), "html");
        props.addHTMLCodeHistory({query: -1, updatedCode: props.htmlCode.split(/\r\n|\r|\n/), tags: newTags});
        console.log(newTags);
      }
    } catch {
      console.log("couldn't add code history");
    }
    setQuery("");
  }, [props.htmlCode]);


  // sends user input to backend and placed code in appropriate code section 
  function handleSubmitCode() {
    // send user input to get code from openai
    setRemoteAdd(true);
    console.log(remoteAdd);
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
    getOpenAICode(queryType).then((res) => {
      setLoading(false);
      
      console.log(res);


      if (currentLanguage === "javascript") {
        if (props.javaCode.length === 0) {
          props.addJavascriptCode(res.code);
        } else {
            props.insertJavascriptCode({index: props.jsRef.getPosition().lineNumber, code: res.code});
        }    
      } else if (currentLanguage === "html") {
        if (props.htmlCode.length === 0) {
          props.addHTMLCode(res.code);
        } else {
          props.insertHTMLCode({ index: props.htmlRef.getPosition().lineNumber, code: res.code });
        }
      } else {
        if (props.cssCode.length === 0) {
          props.addCSSCode(res.code);
        } else {
          props.insertCSSCode({ index: props.cssRef.getPosition().lineNumber, code: res.code });
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
    axios.post(`${process.env.REACT_APP_ROOT_URL}/compiler`, {
      source_code: props.javaCode,
      customInput: stdin
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
    // Get request to compile endpoint
    console.log(id);

    try {
      let response = await axios.request(`${process.env.REACT_APP_ROOT_URL}/compiler/${id.token}`);
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
          setStdin("");
        } else {
          setOutputDetails(response.data.description + ":" + response.data.stderr);
          setStdin("");
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
  const handleLangSwitch = (event) => {
    setCurrentLanguage(event.target.value);
  }

  return (
    <div className='stop1 WebEditorApp'>
      {console.log(currentLanguage)}
      <HeaderBar />
      <Tour />
      <div className='commandBar'>
        <textarea className="stop2 commandInput" placeholder="Type a command" value={query} onChange={handleQueryChange}></textarea>
        <form className='languageSelect'>
          <select onChange={handleLangSwitch}>
            <option value="html" > HTML
            </option>
            <option value="css" > CSS
            </option>
            <option value="javascript"> JavaScript
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
         {/* <ProjectModal></ProjectModal> */}
         <ProjectModalForm toggleDisplay={toggleDisplay}></ProjectModalForm>
        </div>

        <div className="web-editor-container">
          <div className="stop3 editor">
            <CodeEditor
                language={"javascript"}
                theme={theme}
                width="100%"
                toggleDisplay={toggleDisplay}
                mount={handleJSDidMount}
                displayRef={props.javaDisplay}
                editor={props.jsRef}
                decorationRef={jsDecorations}
                decorationSetter={setJsDecorations}
                displaySetter={props.setJavaDisplay}
                monaco={props.monacoRef}
                history={props.javaCodeHistory}
            />
          </div>
          <div className="editor">
            <CodeEditor
                language={"html"}
                theme={theme}
                width="100%"
                toggleDisplay={toggleDisplay}
                mount={handleHTMLDidMount}
                displayRef={props.htmlDisplay}
                editor={props.htmlRef}
                decorationRef={htmlDecorations}
                decorationSetter={setHtmlDecorations}
                displaySetter={props.setHTMLDisplay}
                monaco={props.monacoRef}
                history={props.htmlCodeHistory}
            />
          
          </div>
          <div className="editor">
            <CodeEditor
                language={"css"}
                theme={theme}
                width="100%"
                toggleDisplay={toggleDisplay}
                mount={handleCSSDidMount}
                displayRef={props.cssDisplay}
                editor={props.cssRef}
                decorationRef={cssDecorations}
                decorationSetter={setCssDecorations}
                displaySetter={props.setCSSDisplay}
                monaco={props.monacoRef}
                history={props.cssCodeHistory}
            />  
          </div>
          
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
            <TabPanel>
              <div className='tab-output'>
              <OutputWindow theme={theme} output={outputDetails} handleRunClick={submitCode} stdin={stdin} setStdin={setStdin}/>
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
    cleanedCode: reduxstate.project.cleanedCode,
    javaCodeHistory: reduxstate.project.javaCodeHistory,
    cssCodeHistory: reduxstate.project.cssCodeHistory,
    htmlCodeHistory: reduxstate.project.htmlCodeHistory,
    javaDisplay: reduxstate.tagDisplay.javaDisplay,
    cssDisplay: reduxstate.tagDisplay.cssDisplay,
    htmlDisplay: reduxstate.tagDisplay.htmlDisplay,
    jsRef: reduxstate.editors.jsRef,
    cssRef: reduxstate.editors.cssRef,
    htmlRef: reduxstate.editors.htmlRef,
    monacoRef: reduxstate.editors.monacoRef,
 };
};

export default connect(mapStateToProps, { addCode, addJavascriptCode, insertJavascriptCode, addCSSCode, insertCSSCode, addHTMLCode, insertHTMLCode, addProjectId, addProjectTitle, addCleanedJavascript, addJavaCodeHistory, addCSSCodeHistory, addHTMLCodeHistory, setJavaDisplay, setCSSDisplay, setHTMLDisplay, setJavaEditor, setCssEditor, setHtmlEditor, setMonaco })(WebEditors);
