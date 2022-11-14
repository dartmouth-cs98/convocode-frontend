// BASED OFF OF: https://www.freecodecamp.org/news/how-to-build-react-based-code-editor/
// monaco-editor package for Editor component

import React from "react";
import Editor from "@monaco-editor/react";
import { connect } from 'react-redux';
import { addCode } from "../../state/actions";

import './index.css'


const CodeEditor = (props) => {

  const handleEditorChange = (value) => {
    props.addCode(value);
  };


  return (
    <div className="overlay rounded-md w-full h-full shadow-4xl">
      <Editor
        height="78vh"
        width='100%'
        language={props.language || "python"}
        value={props.code}
        theme={props.theme}
        defaultValue="# Python Editor"
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
  };
};

export default connect(mapStateToProps, { addCode })(CodeEditor);