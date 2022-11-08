// BASED OFF OF: https://www.freecodecamp.org/news/how-to-build-react-based-code-editor/
// monaco-editor package for Editor component

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { connect } from 'react-redux';

import './index.css'


const CodeEditor = ({ onChange, language, code, theme, props }) => {
  const [value, setValue] = useState(code || "");



  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  // 
  useEffect(() => {
    // console.log(props.code.string);
    handleEditorChange(value + props.code.string.input);
  }, [props.code.string]);


  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="78vh"
        width='100%'
        language={language || "python"}
        value={value}
        theme={theme}
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
  return { fontSize: reduxstate.settings.fontSize };
};

export default connect(mapStateToProps, {})(CodeEditor);