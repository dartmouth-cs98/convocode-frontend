import React, { useState } from "react";

import './documentation.css'

const DocumentationPage = () => {
    const [theme, setTheme] = useState('light');
    
    return (
        <div className="docu-page" data-theme={theme}>
            <div className="docu-section" data-theme={theme}>
                <h1>What is Convo<span id="sage">D</span><span id="pumpkin-spice">e</span><span id="grape">x</span></h1>
                <p>ConvoDex is a dictionary of all the possible terms and templates that are avaliable for users when engaaging with our coding environment. With the help of OpenAI, Whisper, Watson IBM and more we are able to bring a new method to </p>
            </div>
            <div className="table">
                <div className="row Title"> 
                    <h2>Command</h2>
                    <h2>Action</h2>
                </div>
                <div className="row Grey">
                    <p>“class”</p>
                    <p>Class Templates require a class name, parameters, and an __init__ and __str__ methods in order to be standarized.</p>
                </div>
                <div className="row White">
                    <p>“function”</p>
                    <p>Function Templates require parameters, and stating global and local variables</p>
                </div>
                <div className="row Grey">
                    <p>"for loop" </p>
                    <p>For Loops must be defined with range and number or variable name</p>
                </div>
            </div>
            <div className="docu-section">
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
            <div className="docu-section">
                <h1>Who is Brackey?</h1>
            </div>
        </div>

    ); 
    
} 
export default DocumentationPage