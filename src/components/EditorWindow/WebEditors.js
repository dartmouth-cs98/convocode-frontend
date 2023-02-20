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
import { addCodeHistory } from '../../state/actions';
import { setDisplay } from '../../state/actions';
import WebOutput from './WebOutput';
import settings from '../../resources/settings.png';
import singleTab from '../../resources/SingleTab.svg';
import multiTab from '../../resources/MultiTab.svg';
import axios from 'axios';
import './webEditor.css';
import HeaderBar from '../HeaderBar/HeaderBar';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import './index.css';
import Tour from '../EditorWindow/Onboarding/Tour.js';

// import { lazy } from 'react';



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
  const [remoteAdd, setRemoteAdd] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("html");
  const [changedLines, setChangedLines] = useState([])
  const [view, setView] = useState("multi");
  const [loading, setLoading] = useState(false);
  const [decorations, setDecorations] = useState([]);
  const [decorationDict, setDecorationDict] = useState({
    1: "unicornDecorator",
    2: "easyADecorator",
    3: "grapeDecorator",
    4: "skyDecorator",
    5: "sageDecorator",
    6: "busDecorator",
    7: "pumpkinSpiceDecorator"
  });

  const [outputSelection, setOutputSelection] = useState("output");

  const jsRef = useRef(null);
  const monacoRef = useRef(null);
  const cssRef = useRef(null);
  const htmlRef = useRef(null);
  
  // code 1: shorter
  // code 2: longer


 function getNewTags(q, newCode) {
    console.log("hello");
    var tags = []
    if (props.codeHistory.length === 0) {
      for (var i = 0; i < newCode.length; i++) {
        tags.push(q);
      }
    }
    else {
      const oldCode = props.codeHistory.slice(-1)[0].code;
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
        const oldTags = props.codeHistory.slice(-1)[0].tags;
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
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === tag) {
        range.push(i);
      }
    }
    return range;
  }
  
  function getRanges() {
    var currTags = props.codeHistory.slice(-1)[0].tags;
    var insertionTags = currTags.filter(checkInsertion);
    var unique = insertionTags.filter(onlyUnique);
    var ranges = []
    for (var i = 0; i < unique.length; i++) {
      var r = findTagRange(unique[i], currTags);
      var start = r[0];
      var end = r[r.length - 1];
      ranges.push([start, end]);
    }
    return ranges;
  }

  function displayJSTags() {
    var ranges = getRanges();
    console.log(ranges);
    var dList = [];
    var currTags = props.codeHistory.slice(-1)[0].tags;
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
    console.log(dList);
    jsRef.current.updateOptions({readOnly: true});
    var d = jsRef.current.deltaDecorations([], dList);
    setDecorations(d);
    console.log(decorations);
    props.setDisplay(true);
  }

  function endTagView() {
    //console.log(decorations);
    console.log("is this firing?");
    jsRef.current.deltaDecorations(decorations, []);
    jsRef.current.updateOptions({readOnly: false});
    props.setDisplay(false);
    setDecorations([]);
  }

  function toggleDisplay() {
    if (props.tagDisplay) {
      endTagView();

    } else {
      displayJSTags();
    }
  }

  function handleJSDidMount(editor, monaco) {
    jsRef.current = editor;
    monacoRef.current = monaco;
    jsRef.current.onDidChangeModelContent (e => {
    



    });

  }


  function handleCSSDidMount(editor, monaco) {
    cssRef.current = editor;
    console.log(cssRef);

    editor.onDidChangeModelContent ( e => {
        console.log(editor.getModel());
    });
  }

  function handleHTMLDidMount(editor, monaco) {
    htmlRef.current = editor;
    console.log(htmlRef);

    editor.onDidChangeModelContent ( e => {
        console.log(editor.getModel());

    });
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
        const newTags = getNewTags(query, props.javaCode.split(/\r\n|\r|\n/));
        props.addCodeHistory({query: query, updatedCode: props.javaCode.split(/\r\n|\r|\n/), tags: newTags});
        setRemoteAdd(false);

      } else {
        const newTags = getNewTags(-1, props.javaCode.split(/\r\n|\r|\n/));
        props.addCodeHistory({query: -1, updatedCode: props.javaCode.split(/\r\n|\r|\n/), tags: newTags});

      }

    } catch {
      console.log("couldn't add code history");
    }

  }, [props.javaCode]);




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
    axios.request({
      method: "POST",
      url: `http://localhost:8000/api/getcode`,
      data: {
        userInput: queryType
      }
    }).then((res) => {
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
        console.log(jsRef.current.getPosition().lineNumber);
        const startEdits = jsRef.current.getPosition().lineNumber;
        const endEdits = jsRef.current.getPosition().lineNumber + line_num;
        console.log(`start edits: ${startEdits}`);
        console.log(`end edits: ${endEdits}`);
        setChangedLines([startEdits, endEdits]);
        console.log(changedLines);
        if (props.javaCode.length === 0) {
            props.addJavascriptCode(res.data.code);
        } else {
            props.insertJavascriptCode({index: jsRef.current.getPosition().lineNumber, code: res.data.code});
        }
        
        /* const newLine = jsRef.current.getPosition().lineNumber + line_num - 1;
        console.log(`new positon set: ${newLine} ${last_line.length}`);
        jsRef.current.setPosition({
          lineNumber: newLine,
          column: last_line.length,
        }); 
        console.log(`new position: ${jsRef.current.getPosition()}`); */
        
      } else if (currentLanguage === "html") {
        if (props.htmlCode.length === 0) {
            props.addHTMLCode(res.data.code);
        } else {
            console.log(htmlRef.current.getPosition().lineNumber);
            props.insertHTMLCode({index: htmlRef.current.getPosition().lineNumber, code: res.data.code});
        } 
      } else {
        if (props.cssCode.length === 0) {
            props.addCSSCode(res.data.code);
        } else {
            props.insertCSSCode({index: cssRef.current.getPosition().lineNumber, code: res.data.code});
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
    <div className='stop1 WebEditorApp'>
        {console.log(currentLanguage)}
        <HeaderBar />
        <Tour />
        <div className='commandBar'>
          {/* <input placeholder="My Project Title" value={title} onChange={handleTitleChange}></input> */}
          <input className="stop2 commandInput" placeholder="Type a command" value={query} onChange={handleQueryChange}></input>
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
    cleanedCode: reduxstate.project.cleanedCode,
    codeHistory: reduxstate.project.codeHistory,
    previousFrame: reduxstate.project.previousFrame,
    tagDisplay: reduxstate.tagDisplay.tagDisplay
 };
};

export default connect(mapStateToProps, { addCode, addJavascriptCode, insertJavascriptCode, addCSSCode, insertCSSCode, addHTMLCode, insertHTMLCode, addProjectId, addProjectTitle, addCleanedJavascript, addCodeHistory, setDisplay })(WebEditors);
