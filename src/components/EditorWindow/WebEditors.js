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
import { addJavaCodeHistory, addCSSCodeHistory, addHTMLCodeHistory } from '../../state/actions';
import { setJavaDisplay, setCSSDisplay, setHTMLDisplay } from '../../state/actions';
import WebOutput from './WebOutput';
import settings from '../../resources/settings.png';
import axios from 'axios';
import './webEditor.css';
import HeaderBar from '../HeaderBar/HeaderBar';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import './index.css';
import Tour from '../EditorWindow/Onboarding/Tour.js';

// loads in .env file if needed
import dotenv from 'dotenv';
import ProjectModal from '../Projects/ProjectModal';
import ProjectModalForm from '../Projects/ProjectModalForm';
import { getOpenAICode } from '../../services/getCode';
dotenv.config({ silent: true });




const WebEditors = (props) => {

  // getting code from nav link props
  const [theme] = useState("light");
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
  const [decorationDict, setDecorationDict] = useState({
    1: "unicornDecorator",
    2: "easyADecorator",
    3: "grapeDecorator",
    4: "skyDecorator",
    5: "sageDecorator",
    6: "busDecorator",
    7: "pumpkinSpiceDecorator"
  });

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

  function getEditor(codeType) {
    var editorRef;
    if (codeType === "javascript") {
      editorRef = jsRef.current;
    } else if (codeType === "css") {
      editorRef = cssRef.current;
    } else {
      editorRef = htmlRef.current;
    }
    return editorRef;

  }


  function setDisplay(codeType, bool) {
    if (codeType === "javascript") {
      props.setJavaDisplay(bool);
    } else if (codeType === "css") {
      props.setCSSDisplay(bool);
    } else {
      props.setHTMLDisplay(bool);
    }
  }

  function setDecorations(codeType, d) {
    if (codeType === "javascript") {
      setJsDecorations(d);
    } else if (codeType === "css") {
      setCssDecorations(d);
    } else {
      setHtmlDecorations(d);
    }
  }


  function getDecorations(codeType) {
    if (codeType === "javascript") {
      return jsDecorations;
    } else if (codeType === "css") {
      return cssDecorations;
    } else {
      return htmlDecorations;
    }
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


  function checkInsertion(tag) {
    return tag !== -1;
  }


  function onlyUnique(value, index, arr) {
    return arr.indexOf(value) === index;
  }

  function findTagRange(tag, arr) {
    var range = []
    var currRange = []
    var adding = false;
    for (var i = 0; i < arr.length; i++) {
      if (adding === true && arr[i] !== tag) {
        adding = false;
        range.push(currRange);
        currRange = [];
      } 
      if (arr[i] === tag) {
        if (range.length === 0) {
          adding = true
        }
        currRange.push(i);
      }
    }
    if (currRange.length !== 0) {
      range.push(currRange);
    }
    console.log(range);
    return range;
  }

  
  function getRanges(codeType) {
    var history = getHistory(codeType);
    var currTags = history.slice(-1)[0].tags;
    var insertionTags = currTags.filter(checkInsertion);
    var unique = insertionTags.filter(onlyUnique);
    var ranges = []
    for (var i = 0; i < unique.length; i++) {
      var r = findTagRange(unique[i], currTags);
      for (var j = 0; j < r.length; j++) {
        var start = r[j][0];
        var end = r[j][r[j].length - 1];
        ranges.push([start, end]);
      }
      
    }
    return ranges;

    
  }

  function displayTags(codeType) {
    var history = getHistory(codeType);
    var editor = getEditor(codeType);
    var ranges = getRanges(codeType);
    var dList = [];
    var currTags = history.slice(-1)[0].tags;
    for (var i = 0; i < ranges.length; i++) {
      var decId = (i + 1)%7;
      const start = ranges[i][0];
      const end = ranges[i][1];
      console.log(currTags[start]);
      dList.push({
        range: new monacoRef.current.Range(start + 1,1,end + 1,1),
        options: {
          isWholeLine: true,
          className: decorationDict[decId],
          hoverMessage: {value: currTags[start]}
        }
      });
    }
    editor.updateOptions({readOnly: true});
    var d = editor.deltaDecorations([], dList);
    setDecorations(codeType, d);
    setDisplay(codeType, true);
       
  }

  function endTagView(codeType) {
    var editorRef = getEditor(codeType);
    editorRef.deltaDecorations(getDecorations(codeType), []);
    editorRef.updateOptions({readOnly: false});
    setDisplay(codeType, false);
    setDecorations([], codeType);
  }

  function toggleDisplay(codeType) {
    var display;
    if (codeType === "javascript") {
      display = props.javaDisplay;
    } else if (codeType === "css") {
      display = props.cssDisplay;
    } else {
      display = props.htmlDisplay;
    }
    if (display) {
      endTagView(codeType);

    } else {
      displayTags(codeType);
    }
  }

  function handleJSDidMount(editor, monaco) {
    jsRef.current = editor;
    monacoRef.current = monaco;
  }

  function handleCSSDidMount(editor, monaco) {
    cssRef.current = editor;
  }

  function handleHTMLDidMount(editor, monaco) {
    htmlRef.current = editor;
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
      //console.log(res.data.code);
      //console.log(res.data.text);
      //setQuery(query);
      const line_list = res.data.code.split(/\r\n|\r|\n/);
      console.log(line_list);
      const last_line = line_list[line_list.length - 1];
      const line_num = res.data.code.split(/\r\n|\r|\n/).length;

      if (currentLanguage === "javascript") {
        if (props.javaCode.length === 0) {
          props.addJavascriptCode(res.code);
        } else {
            props.insertJavascriptCode({index: jsRef.current.getPosition().lineNumber, code: res.data.code});
        }    
      } else if (currentLanguage === "html") {
        if (props.htmlCode.length === 0) {
          props.addHTMLCode(res.code);
        } else {
          console.log(htmlRef.current.getPosition().lineNumber);
          props.insertHTMLCode({ index: htmlRef.current.getPosition().lineNumber, code: res.code });
        }
      } else {
        if (props.cssCode.length === 0) {
          props.addCSSCode(res.code);
        } else {
          props.insertCSSCode({ index: cssRef.current.getPosition().lineNumber, code: res.code });
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
        <input className="stop2 commandInput" placeholder="Type a command" value={query} onChange={handleQueryChange}></input>
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
<<<<<<< HEAD
         {/* <ProjectModal></ProjectModal> */}
         <ProjectModalForm></ProjectModalForm>
        </div>
=======
        <ProjectModal></ProjectModal>
      </div>

>>>>>>> c44b2c06884192bcfd41b309e5db6d788109903e
       
        <div className="web-editor-container">
          <div className="stop3 editor">
            <CodeEditor
                language={"javascript"}
                theme={theme}
                width="100%"
                toggleDisplay={toggleDisplay}
                mount={handleJSDidMount}
            />
          </div>
          <div className="editor">
            <CodeEditor
                language={"html"}
                theme={theme}
                width="100%"
                toggleDisplay={toggleDisplay}
                mount={handleHTMLDidMount}
            />
          
          </div>
          <div className="editor">
            <CodeEditor
                language={"css"}
                theme={theme}
                width="100%"
                toggleDisplay={toggleDisplay}
                mount={handleCSSDidMount}
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
              <WebOutput theme={theme} />
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
 };
};

export default connect(mapStateToProps, { addCode, addJavascriptCode, insertJavascriptCode, addCSSCode, insertCSSCode, addHTMLCode, insertHTMLCode, addProjectId, addProjectTitle, addCleanedJavascript, addJavaCodeHistory, addCSSCodeHistory, addHTMLCodeHistory, setJavaDisplay, setCSSDisplay, setHTMLDisplay })(WebEditors);
