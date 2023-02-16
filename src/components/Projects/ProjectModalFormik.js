import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import CodeEditor from '../EditorWindow/CodeEditor';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { addProjectId, addProjectTitle, addProjectDescription, addProjectTag, addProjectStatus } from '../../state/actions';
import axios from 'axios';
import { getAuthTokenFromStorage } from '../../services/utils.js';
import { Formik, Form, Field } from 'formik';
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import 'react-tabs/style/react-tabs.css';
import './projectModal.css';
import { dark } from "@mui/material/styles/createPalette";

const ProjectModal = (props) => {
    const [theme] = useState('light');
    const [modalShow, setModalShow] = useState(false);
    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectTags, setProjectTags] = useState([]);
    const { register, handleSubmit } = useForm();

    const ProjectSchema = Yup.object().shape({
        tags: Yup.array().of(Yup.string())
            .required('Required'),
        title: Yup.string()
            .required('Required'),
        description: Yup.string()
            .required('Required'),
        code: Yup.string()
            .required('Required'),
    });

    const handleModalToggle = () => {
        setModalShow(!modalShow);
    };

    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        setProjectTitle(newTitle);
        props.addProjectTitle(newTitle);
    };

    const handleDescriptionChange = (event) => {
        const newDescription = event.target.value;
        setProjectDescription(newDescription);
        props.addProjectDescription(newDescription);
    };

    const handleAddTags = (event) => {
        if (projectTags.length === 4) {
            return;
        }
        if (event.key === "Enter" && event.target.value !== ""){
            const newTag = event.target.value;
            setProjectTags([...projectTags, newTag]);
            event.target.value = "";
        }
    };

    const handleRemoveTags = (index) => {
        setProjectTags([...projectTags.filter(tag => projectTags.indexOf(tag) !== index)]);
    };

    function handleKeyDown(event) {
        if (projectTags.length === 4) {
            return;
        }
        if (event.key !== 'Enter') return
        const value = event.target.value
        if (!value.trim()) return
        setProjectTags([...projectTags, value])
        event.target.value = ''
    }

    const onSubmit = (event) => {
        event.preventdefault();
    };

    function saveCode(buttonType) {

        if (buttonType === "post") {
            props.addProjectStatus(true);
        } else {
            props.addProjectStatus(false);
        }
    
        // get java, html, css code, and title from ide page
        const title = props.title;
        const description = props.description;
        const tags = props.tags;
        const javaCode = props.javaCode;
        const htmlCode = props.htmlCode;
        const cssCode = props.cssCode;
        const status = props.status;
        const userToken = getAuthTokenFromStorage();
        const cleanedCode = props.cleanedCode;

        // check if project id
        const id = props.id;
    
        if (id == "") {
          // no project id yet, create new project
          // send post information to the backend 
          axios.post(
             `http://localhost:8000/api/project`,
            {
              title: title,
              description: description,
              tags: tags,
              javaCode: javaCode,
              htmlCode: htmlCode,
              cssCode: cssCode,
              status: status,
              cleanedCode: cleanedCode,
          },
          { headers: { authorization: userToken } }
          ).then((res) => {
            // have some sort of popup or change the button to like "code saved!" or something
            console.log("code saved!")
            console.log(res.data);
            props.addProjectId(res.data);
          });
          
        } else {
              // project already exists, update in database instead
              // send post information to the backend 
              const requestUrl = `http://localhost:8000/api/project/${id}`;
              axios.put(
                requestUrl,
                {
                  title: title,
                  description: description,
                  tags: tags,
                  javaCode: javaCode,
                  htmlCode: htmlCode,
                  cssCode: cssCode,
                  status: status,
                  cleanedCode: cleanedCode,
              },
              { headers: { authorization: userToken } }
              ).then((res) => {
                // have some sort of popup or change the button to like "code saved!" or something
                console.log("code saved!")
              });
        }
        
    }

    return (
        <div>
            <button onClick={handleModalToggle} className="stop4 pink">Post</button>
            <div className="project-modal">
                <ReactModal className="edit-modal" isOpen={modalShow} onRequestClose={handleModalToggle} contentLabel="ConvoCode" ariaHideApp={false}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="modal-container">
                            <div className="left-container">
                                <div className="project-details">
                                    <div className="project-detail">
                                        <label className="label-header">Project Tags</label>
                                        <div className="tags-input-container">
                                            { projectTags.map((tag, index) => {
                                                return (
                                                    <div className="tag-item" key={index}>
                                                        <span className="text">#{tag}</span>
                                                        <span className="close" onClick={()=>handleRemoveTags(index)}>&times;</span>
                                                    </div>
                                                    )
                                                })
                                            }
                                            <input className="tags-input" type="text" onKeyDown={handleKeyDown} placeholder="Press enter to add tags"
                                                {...register("tags", {
                                                    required: true,
                                                    maxLength: 4
                                                })}/>
                                        </div>
                                    </div>
                                    <div className="project-detail">
                                        <label className="label-header">Project Title</label>
                                        <textarea name="project-title" value={props.projectTitle} onChange={handleTitleChange} rows={4} cols={40}
                                            {...register("title", {
                                                required: true,
                                                })}/>
                                    </div>
                                    <div className="project-detail">
                                        <label className="label-header">Project Description</label>
                                        <textarea name="project-desc" value={props.projectDescription} onChange={handleDescriptionChange} rows={4} cols={40}
                                            {...register("description", {
                                                required: true,
                                                 })}/>
                                    </div>
                                </div> 
                            </div>
                            <div className="right-container">
                        <div className="tab-editors">
                        <label className="label-header">Code Preview</label>
                        <Tabs id="tabs">
                            <TabList>
                                <Tab id="tab">JS</Tab>
                                <Tab id="tab">HTML</Tab>
                                <Tab id="tab">CSS</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="tab-editor">
                                <CodeEditor language={"javascript"} theme={theme} width="100%" />
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="tab-editor">
                                <CodeEditor language={"html"} theme={theme} width="100%" />
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="tab-editor">
                                <CodeEditor language={"css"} theme={theme} width="100%" />
                                </div>
                            </TabPanel>
                        </Tabs>
                        </div>
                        <div className="project-buttons">
                            <button className="light-pink" onClick = {()=>{
                                saveCode("save");
                                }}>Save For Later</button>
                            <button className="pink" onClick = {()=>{
                                saveCode("post");
                                }}>Post</button>
                        </div>
                        </div>
                        </div>                       
                    </form>
                </ReactModal>
            </div>
        </div>

    )
};
const mapStateToProps = (reduxstate) => {
    return { 
      code: reduxstate.code.string, 
      javascriptCode: reduxstate.project.javaCode,
      htmlCode: reduxstate.project.htmlCode,
      cssCode: reduxstate.project.cssCode,
      id: reduxstate.project.id,
      title: reduxstate.project.title,
      description: reduxstate.project.description,
      tag: reduxstate.project.tags,
      status: reduxstate.project.status,
      user: reduxstate.user,
      cleanedCode: reduxstate.project.cleanedCode,
   };
  };
  export default connect(mapStateToProps, { addProjectId, addProjectTitle, addProjectDescription, addProjectTag, addProjectStatus })(ProjectModal);


