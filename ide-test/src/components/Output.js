import React, { useState } from "react";
import "../styles/output.css";

const Output = ({ output }) => {
    var newText;
    if (output != null) {
        newText = output.split('\n').map(output => <p>{output}</p>);

    }
    else {
        newText=null;

    }
    

    return (
        <div>
            <div className="title">
                Output
            </div>
            <div className="box">
                <div className="out-text">
                    {newText}
                </div>
            </div>
        </div>
    );
};
export default Output;