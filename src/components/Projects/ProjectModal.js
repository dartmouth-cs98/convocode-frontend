import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import CodeEditor from '../EditorWindow/CodeEditor';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './projectModal.css';
import { addProjectId, addProjectTitle, addProjectDescription, addProjectTag, addProjectStatus } from '../../state/actions';
import axios from 'axios';

const ProjectModal = (props) => {
    const [theme] = useState('light');
    const [modalShow, setModalShow] = useState(false);
    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectTag, setProjectTag] = useState("");

    const projectTags= ["easy", "medium", "hard"];

    const handleModalToggle = () => {
        setModalShow(!modalShow);
    };

    const handleTagChange = (event) => {
        const newTag= event.target.value;
        setProjectTag(newTag);
        props.addProjectTag(newTag);
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
        const username = props.user.username;

        // check if project id
        const id = props.id;
    
        if (id == "") {
          // no project id yet, create new project
    
          // send post information to the backend 
          axios.request({
            method: "POST",
            url: `http://localhost:8000/api/project`,
            data: {
              title: title,
              description: description,
              tags: tags,
              javaCode: javaCode,
              htmlCode: htmlCode,
              cssCode: cssCode,
              status: status,
              username: username
          }
          }).then((res) => {
            // have some sort of popup or change the button to like "code saved!" or something
            console.log("code saved!")
            console.log(res.data);
            props.addProjectId(res.data);
          });
          
        } else {
              // project already exists, update in database instead
    
              // send post information to the backend 
              const requestUrl = "http://localhost:8000/api/project/:id";
              axios.request({
                method: "PUT",
                url: requestUrl,
                data: {
                  id: id,
                  title: title,
                  description: description,
                  tags: tags,
                  javaCode: javaCode,
                  htmlCode: htmlCode,
                  cssCode: cssCode,
                  status: status,
              }
              }).then((res) => {
                // have some sort of popup or change the button to like "code saved!" or something
                console.log("code saved!")
              });
        }
        
    }

    return (
        <div>
            <button onClick={handleModalToggle} className="pink">Post</button>
            <div className="project-modal">
                <ReactModal className="edit-modal" isOpen={modalShow} onRequestClose={handleModalToggle} contentLabel="ConvoCode" ariaHideApp={false}>
                    <div className="modal-container">
                        <div className="left-container">
                            <div className="project-details">
                                <div className="project-detail">
                                <label className="label-header">Project Level</label>
                                <div className="tags">
                                    { projectTags.map((tag) => {
                                        return (
                                        <div className="tag-btn">
                                            <input type="radio" id={tag} value={tag} name="tags" onChange={handleTagChange}/>
                                            <label htmlFor={tag} id={tag}>#{tag}</label>
                                        </div>)
                                        })
                                        }
                                </div>
                                </div>
                            <div className="project-detail">
                            <label className="label-header">Project Title</label>
                                <textarea name="project-title" value={props.projectTitle} onChange={handleTitleChange} rows={4} cols={40}></textarea>
                            </div>
                            <div className="project-detail">
                            <label className="label-header">Project Description</label>
                                <textarea name="project-desc" value={projectDescription} onChange={handleDescriptionChange} rows={4} cols={40}></textarea>
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
                            <NavLink to="/profile"><button className="light-pink" onClick = {()=>{
                                saveCode("save");
                                }}>Save For Later</button></NavLink>
                            <NavLink to="/profile"><button className="pink" onClick = {()=>{
                                saveCode("post");
                                }}>Post</button></NavLink>
                        </div>
                        </div>
                    </div>

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
   };
  };
  export default connect(mapStateToProps, { addProjectId, addProjectTitle, addProjectDescription, addProjectTag, addProjectStatus })(ProjectModal);


