// RECORDER: https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10

import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import SettingsModal from "./SettingsModal"
import BrackyPanel from './BrackyPanel';
import ClosedBrackyPanel from './ClosedBrackyPanel';
import OutputWindow from './OutputWindow';
import { connect, useSelector } from 'react-redux';
import { addCode } from '../../state/actions';
import { useEffect } from 'react';
import { useLocation } from "react-router"
import axios from 'axios';

import './index.css'
import { NavLink } from 'react-router-dom';

const EditorWindow = (props) => {
  const pythonDefault = `# Python Editor`;

  // const onChange = (action, data) => {
  //   switch (action) {
  //     case "code": {
  //       if (data) {
  //         setCode(data);
  //       }
  //       break;
  //     }
  //     default: {
  //       console.warn("case not handled!", action, data);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   onChange("code", props.code.string.input);
  // }, [props.code.string]);


  // getting code from nav link props
  const location = useLocation();
  const [theme, setTheme] = useState("light");
  const [processing, setProcessing] = useState(null);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [code, setCode] = useState(pythonDefault);
  const [open, setOpen] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  const toggleSidebar = () => {
    setOpen(open => !open);
  };

  const toggleModal = () => {
    setModalShow(modalShow => !modalShow);
  };



  // Function to call the compile endpoint
  function submitCode() {
    setProcessing(true)

    // reset output if it exists
    if (outputDetails) {
      setOutputDetails(null)
    }

    if (code === ``) {
      return
    }

    // Post request to compile endpoint
    axios.post(`http://localhost:8000/api/compiler`, {
      source_code: props.code, customInput: customInput
    }).then((res) => {
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
      let response = await axios.request(`http://localhost:8000/api/compiler/${id.token}`);
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
        if (response.data.status === 3) {
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
    <div className="editor-window" data-theme={theme}>
      <div className='editor-header-bar' data-theme={theme}>
        <NavLink to="/"><h1>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1></NavLink>
      </div >
      <div className='editor-content'>
        {
          open ?
            <BrackyPanel theme={theme} open={toggleSidebar} modalShow={modalShow} toggleModal={toggleModal} />
            : <ClosedBrackyPanel theme={theme} open={toggleSidebar} modal={modalShow} setModalView={toggleModal} />
        }
        <div className="editor-container" style={open ? { width: '78vw' } : { width: '93vw' }}>
          <CodeEditor
            language={"python"}
            theme={theme}
            width="100%"
          />
          <OutputWindow theme={theme} output={outputDetails} handleRunClick={submitCode} />
        </div>
      </div>
    </div >
  );
};

const mapStateToProps = (reduxstate) => {
  return { code: reduxstate.code.string };
};


export default connect(mapStateToProps, { addCode })(EditorWindow);
