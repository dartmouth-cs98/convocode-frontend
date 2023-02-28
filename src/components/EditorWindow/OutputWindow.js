import React, { useState, useEffect} from "react";
import { connect } from 'react-redux';
import StdinWindow from "./StdinWindow";
import ErrorModal from '../Error/ErrorModal';
import Run from '../../resources/play.png'
import './index.css';
import './webEditor.css';
import axios from 'axios';


const Output = (props, { theme }) => {

  const [loading, setLoading] = useState(false);
  const [outputDetails, setOutputDetails] = useState(null);
  const [error, setError] = useState(null);
  const [stdin, setStdin] = useState("");
  const [modalShow, setModalShow] = useState(false);

  var newText;
  if (outputDetails != null) {
    console.log(outputDetails);
    newText = outputDetails.split('\n').map(outputDetails => <p>{outputDetails}</p>);
  } else {
    newText = null;
  }

  useEffect(() => {
    console.log("current state of ", error, modalShow)
    setModalShow(error !== null)
  }, [error]);

    // Function to call the compile endpoint
  // this is for python: keep in case we want to add back in
  function submitCode() {
    // reset output if it exists
    if (outputDetails) {
      setOutputDetails(null)
    }
    // Post request to compile endpoint
    axios.post(`${process.env.REACT_APP_ROOT_URL}/compiler`, {
      source_code: props.javaCode,
      customInput: stdin
    }).then((res) => {

      checkStatus(res.data);
    }).catch((error) => {
      console.log(error)
      const e = {
        location: "Compiler",
        data: "Cannot Access Compiler at this time.",
        status: 451,
      }
      setError(e);
    });
  }

  const checkStatus = async (id) => {
    // Get request to compile endpoint

    try {
      let response = await axios.request(`${process.env.REACT_APP_ROOT_URL}/compiler/${id.token}`);
      let status = response.status;
      // Processed - we have a result
      setLoading(false);
      if (status === 201) {
        // still processing
        setTimeout(() => {
          checkStatus(id)
        }, 2000)
        return
      } else {
        if (response.data.status === 3) {
          setOutputDetails(response.data.stdout);
          console.log(response.data.stdout);
          console.log(outputDetails);
          setStdin("");
        } else {
          setOutputDetails(response.data.description + ":" + response.data.stderr);
          setStdin("");
        }
        return
      }
    } catch (err) {
      console.log("err", err);
    }
  }


  return (
    <div className="console-window" data-theme={theme}>
        {modalShow ?
        <ErrorModal isOpen={modalShow} handleModalToggle={() => setModalShow(!modalShow)} title={error.location} error={error.data} status={error.status} onClose={() => setError(null)} /> :
        <></>
        }
        <div className="console-window-container">
          <StdinWindow rows="1" stdin={stdin} setStdin={setStdin} />
          <div className="console-window-button">
            <button className="console-run-button" onClick={() => {
              setLoading(!loading);
              submitCode();
            }} disabled={loading}>{loading ? 'Loading...' : 'Run JavaScript Code'}</button>
          {/* <button onClick={handleRunClick} className="console-run-button">Run</button> */}
          </div>
        </div>
        <div className="output-text">{newText}</div>
    </div>
  );
};

const mapStateToProps = (reduxstate) => {
  return {
    javaCode: reduxstate.project.javaCode,
  };
};

export default connect(mapStateToProps)(Output);