// RECORDER: https://medium.com/front-end-weekly/recording-audio-in-mp3-using-reactjs-under-5-minutes-5e960defaf10

import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import BrackyPanel from './BrackyPanel';
import ClosedBrackyPanel from './ClosedBrackyPanel';
import OutputWindow from './OutputWindow';
import { connect } from 'react-redux';
import { addCode } from '../../state/actions';
import { addJavascriptCode } from '../../state/actions';
import WebOutput from './WebOutput';
import axios from 'axios';
import './webEditor.css';

import './index.css'
import { NavLink } from 'react-router-dom';

// loads in .env file if needed
import dotenv from 'dotenv';
dotenv.config({ silent: true });

const EditorWindow = (props) => {

  // getting code from nav link props
  const [theme] = useState("light");
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

    // reset output if it exists
    if (outputDetails) {
      setOutputDetails(null)
    }


    // Post request to compile endpoint
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/compiler`, {
      source_code: props.code
    }).then((res) => {
      console.log("here");
      console.log(res);
      console.log(`id of compiling: ${res.data.token}`);
      checkStatus(res.data);
    }).catch((err) => {
      let error = err.response ? err.response.data : err;
      console.log(error);
    })
  }

  const checkStatus = async (id) => {
    console.log("here");
    // Get request to compile endpoint
    console.log(id);

    try {
      let response = await axios.request(`${process.env.REACT_APP_BACKEND_URL}/compiler/${id.token}`);
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
    }
  }


  return (
        <div className="web-editor-container">
          <div className="editor">
            <CodeEditor
                language={"javascript"}
                theme={theme}
                width="100%"
            />
          </div>
          <div className="editor">
            <CodeEditor
                language={"html"}
                theme={theme}
                width="100%"
            />
          </div>
          <div className="editor">
            <CodeEditor
                language={"css"}
                theme={theme}
                width="100%"
            />
          </div>
          <WebOutput theme={theme}/>
        </div>
  );
};

const mapStateToProps = (reduxstate) => {
  return { code: reduxstate.code.string };
};


export default connect(mapStateToProps, { addCode })(EditorWindow);
