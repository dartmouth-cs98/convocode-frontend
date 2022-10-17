// BASED OFF OF: https://www.freecodecamp.org/news/how-to-build-react-based-code-editor/
// monaco-editor package for Editor component

import React, { useState } from "react";
import Editor from "@monaco-editor/react";

import './header.css'
import './run.css'
import './window.css'


const CodeEditor = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");
  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };


  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="50vh"
        width="100%"
        language={language || "python"}
        value={value}
        theme={theme}
        defaultValue="# Python Editor"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditor;