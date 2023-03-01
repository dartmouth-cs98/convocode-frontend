// RECORDER: https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10

import React, { useState, useEffect, useRef } from 'react';
import protect from '@freecodecamp/loop-protect';
import * as Babel from '@babel/standalone';
import { connect } from 'react-redux';
import { addCode } from '../../state/actions';
import { addJavascriptCode, insertJavascriptCode } from '../../state/actions';
import { addHTMLCode, insertHTMLCode } from '../../state/actions';
import { addCSSCode, insertCSSCode } from '../../state/actions';
import { addProjectId, addProjectTitle } from '../../state/actions';
import { addCleanedJavascript } from '../../state/actions';
import { addJavaCodeHistory, addCSSCodeHistory, addHTMLCodeHistory } from '../../state/actions';
import { setJavaDisplay, setCSSDisplay, setHTMLDisplay } from '../../state/actions';
import { getOpenAICode } from '../../services/getCode';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import axios from 'axios';
import WebOutput from './WebOutput';
import HeaderBar from '../HeaderBar/HeaderBar';
import Tour from '../EditorWindow/Onboarding/Tour.js'
import OutputWindow from './OutputWindow';
import ProjectModalForm from '../Projects/ProjectModalForm';
import CodeEditor from './CodeEditor';
import ErrorModal from '../Error/ErrorModal';
import settings from '../../resources/settings.png';
import './index.css';
import './webEditor.css';
import { decorationDict } from '../../utils/decorationDict';


// loads in .env file if needed
import dotenv from 'dotenv';
dotenv.config({ silent: true });

const WebEditors = (props) => {

  // getting code from nav link props
  const [theme] = useState("light");
  // const [stdin, setStdin] = useState("");
  // const [outputDetails, setOutputDetails] = useState(null);
  const [modalShow, setModalShow] = useState(false);
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
  const [error, setError] = useState(null);

  const jsRef = useRef(null);
  const monacoRef = useRef(null);
  const cssRef = useRef(null);
  const htmlRef = useRef(null);

  const handleInputKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      e.preventDefault();
      setLoading(!loading);
      handleSubmitCode();
    }
  };

  useEffect(() => {
    console.log("current state of ", error, modalShow)
    setModalShow(error !== null)
  }, [error]);

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
      var decId = (i + 1) % 7;
      const start = ranges[i][0];
      const end = ranges[i][1];

      dList.push({
        range: new monacoRef.current.Range(start + 1, 1, end + 1, 1),
        options: {
          isWholeLine: true,
          className: decorationDict[decId],
          hoverMessage: { value: currTags[start] }
        }
      });
    }
    editor.updateOptions({ readOnly: true });
    var d = editor.deltaDecorations([], dList);
    setDecorations(codeType, d);
    setDisplay(codeType, true);
  }

  function endTagView(codeType) {
    var editorRef = getEditor(codeType);
    editorRef.deltaDecorations(getDecorations(codeType), []);
    editorRef.updateOptions({ readOnly: false });
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

  useEffect(() => {
    try {

        // rewrite the user's JavaScript to protect loops
        var processed = transform(props.javaCode);
        props.addCleanedJavascript(processed.code);

    } catch {
      console.log("code incomplete, can't transform");
    } try {
      if (remoteAdd) {
        const newTags = getNewTags(query, props.javaCode.split(/\r\n|\r|\n/), "javascript");
        props.addJavaCodeHistory({ query: query, updatedCode: props.javaCode.split(/\r\n|\r|\n/), tags: newTags });
        setRemoteAdd(false);

      } else {
        const newTags = getNewTags(-1, props.javaCode.split(/\r\n|\r|\n/), "javascript");
        props.addJavaCodeHistory({ query: -1, updatedCode: props.javaCode.split(/\r\n|\r|\n/), tags: newTags });

      }

    } catch {
      console.log("couldn't add code history");

    }
    setQuery("");

  }, [props.javaCode]);

  useEffect(() => {
    try {

      if (remoteAdd) {
        const newTags = getNewTags(query, props.cssCode.split(/\r\n|\r|\n/), "css");
        props.addCSSCodeHistory({ query: query, updatedCode: props.cssCode.split(/\r\n|\r|\n/), tags: newTags });
        setRemoteAdd(false);

      } else {
        const newTags = getNewTags(-1, props.cssCode.split(/\r\n|\r|\n/), "css");
        props.addCSSCodeHistory({ query: -1, updatedCode: props.cssCode.split(/\r\n|\r|\n/), tags: newTags });
      }
    } catch {
      console.log("couldn't add code history");
    }
    setQuery("");

  }, [props.cssCode]);

  useEffect(() => {
    try {

      if (remoteAdd) {
        const newTags = getNewTags(query, props.htmlCode.split(/\r\n|\r|\n/), "html");
        props.addHTMLCodeHistory({ query: query, updatedCode: props.htmlCode.split(/\r\n|\r|\n/), tags: newTags });
        setRemoteAdd(false);

      } else {
        const newTags = getNewTags(-1, props.htmlCode.split(/\r\n|\r|\n/), "html");
        props.addHTMLCodeHistory({query: -1, updatedCode: props.htmlCode.split(/\r\n|\r|\n/), tags: newTags});
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
    
    getOpenAICode(query, currentLanguage).then((res) => {
      setLoading(false);
     
      if (currentLanguage === "javascript") {
        if (props.javaCode.length === 0) {
          props.addJavascriptCode(res.code);
        } else {
          props.insertJavascriptCode({ index: jsRef.current.getPosition().lineNumber, code: res.code });
        }
      } else if (currentLanguage === "html") {
        if (props.htmlCode.length === 0) {
          props.addHTMLCode(res.code);
        } else {
          props.insertHTMLCode({ index: htmlRef.current.getPosition().lineNumber, code: res.code });
        }
      } else {
        if (props.cssCode.length === 0) {
          props.addCSSCode(res.code);
        } else {
          props.insertCSSCode({ index: cssRef.current.getPosition().lineNumber, code: res.code });
        }
      }
    }).catch((error) => {
      console.log(error)
      const e = {
        location: "OpenAI Codex",
        data: "Cannot Access OpenAI Codex Model at this time.",
        status: 452,
      }
      setError(e);
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

  // // Function to call the compile endpoint
  // // this is for python: keep in case we want to add back in
  // function submitCode() {
  //   // reset output if it exists
  //   if (outputDetails) {
  //     setOutputDetails(null)
  //   }
  //   // Post request to compile endpoint
  //   axios.post(`${process.env.REACT_APP_ROOT_URL}/compiler`, {
  //     source_code: props.javaCode,
  //     customInput: stdin
  //   }).then((res) => {

  //     checkStatus(res.data);
  //   }).catch((error) => {
  //     console.log(error)
  //     const e = {
  //       location: "Compiler",
  //       data: "Cannot Access Compiler at this time.",
  //       status: 451,
  //     }
  //     setError(e);
  //   });
  // }

  // const checkStatus = async (id) => {
  //   // Get request to compile endpoint

  //   try {
  //     let response = await axios.request(`${process.env.REACT_APP_ROOT_URL}/compiler/${id.token}`);
  //     let status = response.status;
  //     // Processed - we have a result
  //     if (status === 201) {
  //       // still processing
  //       setTimeout(() => {
  //         checkStatus(id)
  //       }, 2000)
  //       return
  //     } else {
  //       if (response.data.status === 3) {
  //         setOutputDetails(response.data.stdout);
  //         setStdin("");
  //       } else {
  //         setOutputDetails(response.data.description + ":" + response.data.stderr);
  //         setStdin("");
  //       }
  //       return
  //     }
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // }

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
      <HeaderBar />
      <Tour />
      {modalShow ?
        <ErrorModal isOpen={modalShow} handleModalToggle={() => setModalShow(!modalShow)} title={error.location} error={error.data} status={error.status} onClose={() => setError(null)} /> :
        <></>
      }
      <div className='ide-page'>
        <h4 className="ide-project-title">{props.id === "" ? "" : props.title}</h4>
        <div className='commandBar'>
          <div>
          <div className='command-text-container'>
            <form className='languageSelect'>
              <select onChange={handleLangSwitch}>
                <option value="html" >HTML</option>
                <option value="css" >CSS</option>
                <option value="javascript">JavaScript</option>
              </select>
            </form>
            <textarea className="stop2 commandInput" rows="1" placeholder="Type a command" value={query} onChange={handleQueryChange} onKeyDown={handleInputKeypress}></textarea>
          </div>
          </div>
          <div>
          <div className="ide-buttons-1">
            <button className="pink" id="ask-cc-button" onClick={() => {
              setLoading(!loading);
              handleSubmitCode();
            }} disabled={loading}>{loading ? 'Loading...' : 'Ask ConvoCode'}</button>
            <button className="heather-grey"><img src={settings} alt="settings icon" /></button>
          </div>
          </div>
          <div className="ide-buttons-2">
            <ProjectModalForm className="web-editor-modal"></ProjectModalForm>
          </div>
        </div>
        <div className="web-editor-container">
          <div className="stop3 editor">
            <CodeEditor
              language={"javascript"}
              theme={theme}
              height="45vh"
              width="53vh"
              toggleDisplay={toggleDisplay}
              mount={handleJSDidMount}
            />
          </div>
          <div className="editor">
            <CodeEditor
              language={"html"}
              theme={theme}
              height="45vh"
              width="53vh"
              toggleDisplay={toggleDisplay}
              mount={handleHTMLDidMount}
            />
          </div>
          <div className="editor">
            <CodeEditor
              language={"css"}
              theme={theme}
              height="45vh"
              width="53vh"
              toggleDisplay={toggleDisplay}
              mount={handleCSSDidMount}
            />
          </div>
        </div>
        <div className="web-editors-tabs">
          <Tabs id="output-console-tabs">
            <TabList>
              <Tab id="ide-output">output</Tab>
              <Tab id="ide-console">console</Tab>
            </TabList>
            <TabPanel>
              <WebOutput theme={theme} height="auto"/>
            </TabPanel>
            <TabPanel>
              {/* <OutputWindow theme={theme} output={outputDetails} handleRunClick={submitCode} stdin={stdin} setStdin={setStdin} /> */}
              <OutputWindow theme={theme}/>
            </TabPanel>
          </Tabs>
        </div>
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
