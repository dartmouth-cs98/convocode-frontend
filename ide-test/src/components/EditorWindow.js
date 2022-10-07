import React, {useState} from 'react';
import CodeEditor from './CodeEditor';
import Output from './Output';
import Run from "./Run"
import './run.css'
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

    const [processing, setProcessing] = useState(null);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [theme, setTheme] = useState("xcode-default");
    const [code, setCode] = useState(pythonDefault);
 

      // Function to call the compile endpoint
    function submitCode() {
        setProcessing(true)
        if (code === ``) {
        return
        }
    
        // Post request to compile endpoint
        axios.post(`http://localhost:8000/submit`, {
            code: code}).then((res) => {
                console.log(res);
                console.log(`id of compiling: ${res.data.id}`);
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
            let response = await axios.request(`http://localhost:8000/compile/${id.id}`);
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
                
                let raw = await axios.request(`http://localhost:8000/result/${id.id}`)
                console.log(raw.data);
                setOutputDetails(raw.data)
                // showSuccessToast(`Compiled Successfully!`)
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
            <CodeEditor 
                code={code}
                onChange={onChange}
                language={"Python"} />
            <Output output={outputDetails} />
        </div>

    );
}
