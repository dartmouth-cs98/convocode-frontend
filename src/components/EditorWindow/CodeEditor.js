// BASED OFF OF: https://www.freecodecamp.org/news/how-to-build-react-based-code-editor/
// monaco-editor package for Editor component

import React from "react";
import Editor from "@monaco-editor/react";
import { connect } from 'react-redux';
import { addCode } from "../../state/actions";
import { addJavascriptCode, addHTMLCode, addCSSCode } from "../../state/actions";
import { setJavaDisplay, setCSSDisplay, setHTMLDisplay } from "../../state/actions";

import './index.css'


const CodeEditor = (props) => {
  const defaults = {
    javascript: "// Javascript Editor",
    css: "/* CSS Editor */",
    html: "<! -- HTML Editor -->"
  };

  var editor_state = null;
  if (props.language == "javascript") {
    editor_state = props.javaCode;
  } else if (props.language == "html") {
    editor_state = props.htmlCode;
  } else {
    editor_state = props.cssCode;
  }

  var tagState;
  if (props.language === "javascript") {
    tagState = props.javaDisplay;
  } else if (props.language === "html") {
    tagState = props.htmlDisplay;
  } else {
    tagState = props.cssDisplay;
  }


  const handleEditorChange = (value) => {
    if (props.language === "javascript") {
      props.addJavascriptCode(value);
    } else if (props.language === "html") {
      props.addHTMLCode(value);
    } else if (props.language === "css") {
      props.addCSSCode(value);
    } else {
      props.addCode(value);
    }
  };


  return (
  
    <div className="overlay rounded-md w-full h-full shadow-4xl">
       {console.log("code editor", props)}
      <div className="html-header">
      <div>{props.language}</div>
      {/* <button onClick={() => props.toggleDisplay(props.language)}>{tagState ? 'Back to Editing' : 'Command History'}</button> */}
      <button className="stop4" type="button" onClick={() => props.toggleDisplay(props.language)} onKeyDown={(e)=>{e.which === 13 && e.preventDefault()}}>{tagState ? 'Back to Editing' : 'Command History'}</button>
      </div>
      <Editor
        className="bottom-rounded"
        height="45vh"
        width={props.width}
        language={props.language || "python"}
        value={editor_state}
        theme={props.lightMode ? 'vs-light' : 'vs-dark'}
        defaultValue={defaults[props.language]}
        onChange={handleEditorChange}
        onMount={props.mount}
        options={{
          fontSize: props.fontSize
        }}
      />
    </div>
  );
};

const mapStateToProps = (reduxstate) => {
  return {
    fontSize: reduxstate.settings.fontSize,
    code: reduxstate.code.string,
    javaCode: reduxstate.project.javaCode,
    htmlCode: reduxstate.project.htmlCode,
    cssCode: reduxstate.project.cssCode,
    lightMode: reduxstate.settings.lightMode,
    javaDisplay: reduxstate.tagDisplay.javaDisplay,
    cssDisplay: reduxstate.tagDisplay.cssDisplay,
    htmlDisplay: reduxstate.tagDisplay.htmlDisplay,

  };
};

export default connect(mapStateToProps, { addCode, addJavascriptCode, addHTMLCode, addCSSCode, setJavaDisplay, setCSSDisplay, setHTMLDisplay })(CodeEditor);