import React, {useState} from 'react';
import CodeEditor from './CodeEditor';
import Output from './Output';
import Run from "./Run";
import '../styles/run.css';
import '../styles/window.css';
import axios from 'axios';

export const EditorWindow = () => {
    const pythonDefault = `# Python Editor`;
    const onChange = (action, data) => {
        switch (action) {
          case "code": {
            setCode(data);
            break;
          }
          default: {
            console.warn("case not handled!", action, data);
          }
        }
      };

    const [theme, setTheme] = useState("vs-dark");
    const [processing, setProcessing] = useState(null);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [code, setCode] = useState(pythonDefault);
 

      // Function to call the compile endpoint
    function submitCode() {
        setProcessing(true)
        if (code === ``) {
        return
        }
    
        // Post request to compile endpoint
        axios.post(`http://localhost:8000/judge_submit`, {
            source_code: code, customInput: customInput}).then((res) => {
                console.log("here");
                console.log(res);
                console.log(`id of compiling: ${res.data.token}`);
                checkStatus(res.data);
            }).catch((err) => {
                let error = err.response ? err.response.data : err;
                setProcessing(false);
                console.log(error);
        })
    }

    const checkStatus = async (id) => {
        console.log("here");
        // Get request to compile endpoint
        console.log(id);

        try {
            let response = await axios.request(`http://localhost:8000/compile_judge/${id.token}`);
            console.log(response.data);
            let status = response.status;
            console.log(status)
            // Processed - we have a result
            if (status === 201) {
                // still processing
                console.log('still processing');
                setTimeout(() => {
                checkStatus(id)
              }, 2000)
                return
            } else {
                setProcessing(false);  
                console.log(response);
                if (response.data.status == 3) {
                    console.log(response.data.description);
                    setOutputDetails(response.data.stdout);
                } else {
                    setOutputDetails(response.data.description + ":" + response.data.stderr);
                }
                
                return
            }
          } catch (err) {
            console.log("err", err);
            setProcessing(false);
            //showErrorToast();
          }
    }
      

  
    return (
        <div>
            <button className="button-container" onClick={submitCode}>
                <Run text="Run"/>
            </button>
            <div className="editor-container">
                <CodeEditor 
                    code={code}
                    onChange={onChange}
                    language={"python"}
                    theme={theme}
                />
            </div>
            <Output output={outputDetails} />
        </div>
    );
}
