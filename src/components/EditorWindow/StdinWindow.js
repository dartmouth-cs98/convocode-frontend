import React from "react";
import './index.css';

const StdinWindow = ({ stdin, setStdin }) => {
    return (
        <textarea
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            className="stdin-window"
            placeholder="stdin"
        >
        </textarea>
    );
};

export default StdinWindow;