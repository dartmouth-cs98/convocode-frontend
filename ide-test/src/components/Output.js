import React, { useState } from "react";
import "./output.css";

const Output = ({ output }) => {
    return (
        <div className="box">
            {output}
        </div>
    );
};
export default Output;