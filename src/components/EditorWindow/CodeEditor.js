// BASED OFF OF: https://www.freecodecamp.org/news/how-to-build-react-based-code-editor/
// monaco-editor package for Editor component

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { connect } from 'react-redux';
import { addCode } from "../../state/actions";
import { Tooltip } from 'react-tooltip'
import { addJavascriptCode, addHTMLCode, addCSSCode } from "../../state/actions";
import { setJavaDisplay, setCSSDisplay, setHTMLDisplay } from "../../state/actions";

import './index.css'
import 'react-tooltip/dist/react-tooltip.css'


const CodeEditor = (props) => {
  const [tagView, setTagView] = useState(false);

  const defaults = {
    javascript: "// Javascript Editor",
    css: "/* CSS Editor */",
    html: "<! -- HTML Editor -->"
  };

  var editor_state = null;
  if (props.language === "javascript") {
    editor_state = props.javaCode;
  } else if (props.language === "html") {
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

  const setTags = () => {
    setTagView(!tagView);
    props.toggleDisplay(props.language);
  }

  const formatPropsLanguage = () => {
    if (props.language == 'javascript') {
      return "JavaScript"
    } else if (props.language == 'html') {
      return "HTML"
    } else {
      return "CSS"
    }
  }

  return (

    <div className="overlay rounded-md w-full h-full shadow-4xl">
      <Tooltip id="my-tooltip" />
      <div className="lang-header" id={props.language}>
        <div className="lang-header-name">{formatPropsLanguage()}</div>
        <button className="stop5 command-history-button" id={props.language} type="button" onClick={setTags} onKeyDown={(e) => { e.which === 13 && e.preventDefault() }} data-tooltip-content="Hover over code to view AI prompts" data-tooltip-id="my-tooltip" >{tagState ? 'Back to Editing' : 'Command History'} </button>      </div>
      <Editor
        className="bottom-rounded"
        height={props.height}
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
