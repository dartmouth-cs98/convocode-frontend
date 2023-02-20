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
import axios from 'axios';
import './webEditor.css';
import HeaderBar from '../HeaderBar/HeaderBar';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import './index.css'
import Tour from '../EditorWindow/Onboarding/Tour.js'

// loads in .env file if needed
import dotenv from 'dotenv';
import ProjectModal from '../Projects/ProjectModal';
import { getOpenAICode } from '../../services/getCode';
dotenv.config({ silent: true });




const WebEditors = (props) => {

  // getting code from nav link props
  const [theme] = useState("light");
  const [outputDetails, setOutputDetails] = useState(null);
  const [_modalShow, setModalShow] = useState(false);
  const [_title, setTitle] = useState("");
  const [query, setQuery] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("html");
  const [loading, setLoading] = useState(false);

  const jsRef = useRef(null);
  const monacoRef = useRef(null);
  const cssRef = useRef(null);
  const htmlRef = useRef(null);

  function handleJSDidMount(editor, monaco) {
    jsRef.current = editor;
    console.log(jsRef);
    monacoRef.current = monaco;

    editor.onDidChangeModelContent(e => {
      console.log(editor.getModel());

    });
  }

  function handleCSSDidMount(editor, _monaco) {
    cssRef.current = editor;
    console.log(cssRef);

    editor.onDidChangeModelContent(e => {
      console.log(editor.getModel());

    });
  }

  function handleHTMLDidMount(editor, _monaco) {
    htmlRef.current = editor;
    console.log(htmlRef);

    editor.onDidChangeModelContent(e => {
      console.log(editor.getModel());

    });
  }

  useEffect(() => {
    try {
      // rewrite the user's JavaScript to protect loops
      var processed = transform(props.javaCode);
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

  }, [props.javaCode]);




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
    getOpenAICode(queryType).then((res) => {
      setLoading(false);
      console.log(res);
      console.log(res.code);
      console.log(res.text);
      const line_list = res.code.split(/\r\n|\r|\n/);
      console.log(line_list);
      const last_line = line_list[line_list.length - 1];
      const line_num = res.code.split(/\r\n|\r|\n/).length;
      const last_column = last_line.length;

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
        <ProjectModal></ProjectModal>
      </div>

      <div className="web-editor-container">
        <div className="stop3 editor">
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
  };
};

export default connect(mapStateToProps, { addCode, addJavascriptCode, insertJavascriptCode, addCSSCode, insertCSSCode, addHTMLCode, insertHTMLCode, addProjectId, addProjectTitle, addCleanedJavascript })(WebEditors);
