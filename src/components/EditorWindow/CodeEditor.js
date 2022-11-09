// BASED OFF OF: https://www.freecodecamp.org/news/how-to-build-react-based-code-editor/
// monaco-editor package for Editor component

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { connect } from 'react-redux';
import { addCode } from "../../state/actions";
import { objToString } from "../../resources/util.js"

import './index.css'


const CodeEditor = (props) => {


  const [value, setValue] = useState(objToString(props.code));


  console.log("font size", props.fontSize)
  console.log("code in code editor", props.code)

  const handleEditorChange = (value) => {
    setValue(objToString(value));
    props.addCode(value);
    console.log("value", value)
  };

  // // 
  // useEffect(() => {
  //   // console.log(props.code.string);
  //   handleEditorChange(value + props.code);
  // }, [props.code]);


  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="78vh"
        width='100%'
        language={props.language || "python"}
        value={value}
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