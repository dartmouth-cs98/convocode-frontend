import React, { useState } from "react";
import HeaderBar from "../HeaderBar/HeaderBar";

import './documentation.css'

const DocumentationPage = () => {
  const [theme, setTheme] = useState('light');

  return (
    <div className="docu-page" data-theme={theme}>
      <HeaderBar />
      <div className="docu-section" data-theme={theme}>
        <h1>What is Convo<span id="sage">D</span><span id="pumpkin-spice">e</span><span id="grape">x</span></h1>
        <p>ConvoDex is a dictionary of all the possible terms and templates that are avaliable for users when engaging with our coding environment. With the help of OpenAI, Whisper, Watson IBM and more we are able to bring a new method of coding in Python. </p>
      </div>
      <div className="convo-dex">
        <table className="table">
          <tr className="row-title">
            <th>Command</th>
            <th>Action</th>
          </tr>
          <tr className="row-grey">
            <td>“class”</td>
            <td>Class Templates require a class name, parameters, and an __init__ and __str__ methods in order to be standarized.</td>
          </tr>
          <tr className="row-white">
            <td>“function”</td>
            <td>Function Templates require parameters, and stating global and local variables</td>
          </tr>
          <tr className="row-grey">
            <td>"for loop" </td>
            <td>For Loops must be defined with range and number or variable name</td>
          </tr>
        </table>
      </div>
      <div className="tutorial-section">
        <h2>Tutorials </h2>
        <div className="Grid">
          <div className="video">
            <div>
              <iframe title="intro"></iframe>
              <p>Getting Started</p>
            </div>
          </div>
          <div className="video">
            <div>
              <iframe title="documentation"></iframe>
              <p>Documentation Features</p>
            </div>
          </div>
          <div className="video">
            <div>
              <iframe title="functions"></iframe>
              <p>Functions</p>
            </div>
          </div>
          <div className="video">
            <div>
              <iframe title="Runtime"></iframe>
              <p>Runtime Analysis</p>
            </div>
          </div>
        </div>
      </div>
      <div className="brackey-section">
        <h2>Who is Brackey?</h2>
        <p>Brackey is our interactive AI revolutionizing the way developer's code. They are there to guide you through our ConvoCode IDE.</p>
      </div>
    </div>

  );

}
export default DocumentationPage