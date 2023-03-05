// BASED OFF OF: https://www.freecodecamp.org/news/how-to-build-react-based-code-editor/
// monaco-editor package for Editor component

import React from "react";
import CodeEditor from "../EditorWindow/CodeEditor";
import { connect } from 'react-redux';
import { addCode } from "../../state/actions";
import { addJavascriptCode, addHTMLCode, addCSSCode } from "../../state/actions";

import '../EditorWindow/index.css'


const CodePreview = (props) => {

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



  return (
    <div className="overlay rounded-md w-full h-full shadow-4xl">
      <CodeEditor
        className="bottom-rounded"
        height={props.height}
        width="100%"
        language={props.language || "python"}
        value={editor_state}
        theme={props.lightMode ? 'vs-light' : 'vs-dark'}
        defaultValue={defaults[props.language]}
        mount={props.handleDidMount}
        toggleDisplay={props.toggleDisplay}
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

  };
};

export default connect(mapStateToProps, { addCode, addJavascriptCode, addHTMLCode, addCSSCode })(CodePreview);