import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import ReactModal from 'react-modal';

const UploadFile = () =>{

    const [theme, setTheme] = useState('light');
    const [selectedFile, setSelectedFile] = useState();
    const [isFileChosen, setIsFileChosen] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const handleModalToggle = () =>{
        setIsFileChosen(false);
        setModalShow(!modalShow);
    }

    const changeHandler = (event) =>{
        setSelectedFile(event.target.files[0]);
        setIsFileChosen(true);
    };

    const handleUploadFile = () => {
        setIsFileChosen(true);
    };

    return(
        <div>
            <button onClick={handleModalToggle}>
                Upload Python File
            </button>
            <ReactModal className="modal-create" isOpen={modalShow} onRequestClose={handleModalToggle} contentLabel = "ConvoCode">
            <div className='landing-modal'>
                <input type="file" name="file" onChange={changeHandler}></input>
                {isFileChosen ? (
                <div>
                    <p>Filename: {selectedFile.name}</p>
                    <div className="create-buttons">
                        <button className="cancel-button" onClick={handleModalToggle}>Cancel</button>
                        <NavLink to="/editor" state={{name:selectedFile.name}}><button id="create" onClick={handleUploadFile}>Upload</button></NavLink>            
                    </div>
                </div>
                ):(
                    <p>Select a python file.</p>
                )}
            </div>
            </ReactModal>
        </div>
    )
};

export default UploadFile;