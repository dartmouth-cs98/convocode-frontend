// RECORDER: https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10

import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import BrackyPanel from './BrackyPanel';
import ClosedBrackyPanel from './ClosedBrackyPanel';
import OutputWindow from './OutputWindow';
import { connect } from 'react-redux';
import { addCode } from '../../state/actions';
import { objToString } from "../../resources/util.js"
import axios from 'axios';

import './index.css'
import { NavLink } from 'react-router-dom';

// loads in .env file if needed
import dotenv from 'dotenv';
dotenv.config({ silent: true });

const EditorWindow = (props) => {

  // getting code from nav link props
  const [theme, setTheme] = useState("light");
  const [processing, setProcessing] = useState(null);
  const [outputDetails, setOutputDetails] = useState(null);
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


    // Post request to compile endpoint

    axios.post(`${process.env.ROOT_URL}/compiler`, {
      source_code: code, customInput: customInput
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
      let response = await axios.request(`${process.env.ROOT_URL}/compiler/${id.token}`);
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
