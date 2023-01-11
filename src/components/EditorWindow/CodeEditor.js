// BASED OFF OF: https://www.freecodecamp.org/news/how-to-build-react-based-code-editor/
// monaco-editor package for Editor component

import React from "react";
import Editor from "@monaco-editor/react";
import { connect } from 'react-redux';
import { addCode } from "../../state/actions";
import { addJavascriptCode, addHTMLCode, addCSSCode } from "../../state/actions";

import './index.css'


const CodeEditor = (props) => {
  const defaults = {
    javascript: "// Javascript Editor",
    css: "/* CSS Editor */",
    html: "<! -- HTML Editor -->"
  };


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
      <Editor
        height="78vh"
        width={props.width}
        language={props.language || "python"}
        value={props.code}
        theme={props.theme}
        defaultValue={defaults[props.language]}
        onChange={handleEditorChange}
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
    javascriptCode: reduxstate.javascriptCode.string,
    htmlCode: reduxstate.htmlCode.string,
    cssCode: reduxstate.cssCode.string,
  };
};

export default connect(mapStateToProps, { addCode, addJavascriptCode, addHTMLCode, addCSSCode })(CodeEditor);