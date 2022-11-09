import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import ReactModal from 'react-modal';
import './file-modal.css';

import { connect } from 'react-redux';
import { createFileName } from "../../state/actions"
import { addCode } from "../../state/actions"

const UploadFile = (props) => {
    const [selectedFile, setSelectedFile] = useState();
    const [isFileChosen, setIsFileChosen] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const handleModalToggle = () => {
        setIsFileChosen(false);
        setModalShow(!modalShow);
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFileChosen(true);

        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            console.log("in upload")
            console.log(file)
            props.createFileName(file.name);
            props.addCode(reader.result)
        }
        reader.onerror = () => {
            console.log("file error", reader.error)
        }
    };

    const handleUploadFile = () => {
        setIsFileChosen(true);
    };

    const handleCancelUploadFile = () => {
        setIsFileChosen(false);
    };

    return (
        <div>
            <button onClick={handleModalToggle}>
                Upload Python File
            </button>
            <ReactModal className="modal-create" isOpen={modalShow} onRequestClose={handleModalToggle} contentLabel="ConvoCode">
                <div>
                    {isFileChosen ? (
                        <div className='modal-upload'>
                            <p>Chosen Python File: {selectedFile.name}</p>
                            <div className="upload-buttons">
                                <button className="cancel-button" onClick={handleCancelUploadFile}>Cancel</button>
                                <NavLink to="/editor"><button id="create" onClick={handleUploadFile}>Upload</button></NavLink>
                            </div>
                        </div>
                    ) : (
                        <div className='modal-upload'>
                            <label htmlFor="file-upload" className="custom-file-upload">Choose Python File</label>
                            <input id="file-upload" type="file" name="file" onChange={handleFileChange}></input>
                            <button id="select-cancel" className="cancel-button" onClick={handleModalToggle}>Cancel</button>
                        </div>
                    )}
                </div>
            </ReactModal>
        </div>
    )
};

const mapStateToProps = (reduxstate) => {
    return {
        filename: reduxstate.fileManagement.fileName,
        code: reduxstate.code.string,
    };
};

export default connect(mapStateToProps, { createFileName, addCode })(UploadFile);