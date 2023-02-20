import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import CodeEditor from '../EditorWindow/CodeEditor';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { addProjectId, addProjectTitle, addProjectDescription, addProjectTag, deleteProjectTag, addProjectStatus } from '../../state/actions';
import { getAuthTokenFromStorage } from '../../services/utils.js';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import 'react-tabs/style/react-tabs.css';
import './projectModalForm.css';

const ProjectModalForm = (props) => {
    const [theme] = useState('light');
    const [modalShow, setModalShow] = useState(false);
    const [projectTags, setProjectTags] = useState([]);
    const [submitAction, setSubmitAction] = useState("");
    const navigate = useNavigate();

    const ProjectSchema = Yup.object().shape({
        tags: Yup.array().of(Yup.string())
            .nullable(),
        title: Yup.string()
            .required('Required'),
        description: Yup.string()
            .required('Required'),
        // htmlCode: Yup.string()
        //     .required('Required'),
        // javaCode: Yup.string()
        //     .required('Required'),
        // cssCode: Yup.string()
        //     .required('Required'),
    });
    
    const handleModalToggle = () => {
        setModalShow(!modalShow);
    }; 

    const handleAddTags = (event) => {
        if (projectTags.length === 4){
            return;
        }
        if (event.key == "Enter" && event.target.value !== ""){
            const newTag = event.target.value;
            setProjectTags([...projectTags, newTag]);
            event.target.value = "";
        }
    }

    const handleRemoveTags = (index) => {
        setProjectTags([...projectTags.filter(tag => projectTags.indexOf(tag) !== index)]);
    };

    const save = (values) => {
        console.log("values", values);
        try {
            console.log("tags in field", values.tags);
            const status = false;
            if (props.id) {
                const projectInfo = {
                    tags: projectTags,
                    title: values.title,
                    description: values.description,
                    javaCode: props.javascriptCode,
                    htmlCode: props.htmlCode,
                    cssCode: props.cssCode,
                    cleanedCode: props.cleanedCode,
                    status: status,
                    id: props.id,
                }
                props.updateProject(projectInfo);
            } else {
                const projectInfo = {
                    title: values.title,
                    javaCode: props.javascriptCode,
                    htmlCode: props.htmlCode,
                    cssCode: props.cssCode,
                    tags: projectTags,
                    status: status,
                  }
          
                console.log("new project to create", projectInfo)
                props.createProject(projectInfo);
            }
        } catch (error) {
            console.log("Unable to save post at this time:", error)
        }
        navigate('/profile')
    }

    const submit = (values) => {
        try {
            console.log("tags in field", values.tags);
            const status = true;
            if (props.id) {
            const projectInfo = {
                tags: projectTags,
                title: values.title,
                description: values.description,
                javaCode: props.javaCode,
                htmlCode: props.htmlCode,
                cssCode: props.cssCode,
                cleanedCode: props.cleanedCode,
                status: status,
                id: props.id
              }
                props.updateProject(projectInfo);
            } else {
                const projectInfo = {
                    title: values.title,
                    javaCode: props.javaCode,
                    htmlCode: props.htmlCode,
                    cssCode: props.cssCode,
                    tags: projectTags,
                    status: status,
                  }
          
                  console.log("new project to create", projectInfo)
          
                props.createProject(projectInfo);

            }
        } catch (error) {
            console.log("Unable to submit post at this time:", error)
        }
        navigate('/profile')
    }

    return (
        <div>
            <button onClick={handleModalToggle} className="stop4 pink">Post</button>
            <div className="form-modal">
                <ReactModal className="project-modal" isOpen={modalShow} onRequestClose={handleModalToggle} contentLabel="ConvoCode" ariaHideApp={false}>
                    <Formik 
                        initialValues={{
                            tags: [],
                            title: '',
                            description: '',
                            // htmlCode: props.htmlCode,
                            // javaCode: props.javascriptCode,
                            // cssCode: props.cssCode,
                        }}
                        validationSchema={ProjectSchema}
                        onSubmit={(values) =>
                            submit(values)
                        }
                        >
                            {({ errors, touched }) => (
                                <Form className="edit-modal-form">
                                        <div className="edit-modal-info flex-col"  style={{ "flex-grow": "1" }}>
                                            <div id="tags-box" className="input-info ">
                                                <h3 className="input-header">Project Tags</h3>
                                                    { projectTags.map((tag, index) => {
                                                        return (
                                                        <div className="tag-item" key={index}>
                                                            <span className="text">#{tag}</span>
                                                            <span className="close" onClick={()=>handleRemoveTags(index)}>&times;</span>
                                                        </div>
                                                        )
                                                    })
                                                    }
                                                <Field name="tags" id="project-input" onKeyUp={handleAddTags} onKeyPress={e => { e.which === 13 && e.preventDefault()}}/>
                                                {/* <Field name="tags" id="project-input" onKeyUp={handleAddTags}/>  */}
                                                {errors.tags && touched.tags ? (
                                                    <div>{errors.tags}</div>
                                                ) : null}
                                            </div>
                                            <div className="input-info">
                                                <h3 className="input-header">Project Title</h3>
                                                <Field name="title" id="project-input" onKeyPress={e => { e.which === 13 && e.preventDefault()}}/>
                                                {/* <Field name="title" id="project-input"/> */}
                                                {errors.title && touched.title ? (
                                                    <div>{errors.title}</div>
                                                ) : null}
                                            </div>
                                            <div className="input-info">
                                                <h3 className="input-header">Project Description</h3>
                                                <Field name="description" id="project-input" onKeyPress={e => { e.which === 13 && e.preventDefault()}}/>
                                                {/* <Field name="description" id="project-input"/> */}
                                                {errors.description && touched.description ? (
                                                    <div>{errors.description}</div>
                                                ) : null}
                                            </div>
                                            
                                        </div>
                                        <div className="edit-modal-code" style={{ "flex-grow": "4" }}>
                                        <div className="edit-modal-editor">
                                        <h3 className="input-header">Code Preview</h3>
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
                                                <button className="light-pink" onClick={()=>save(Formik.values)}>Save For Later</button>
                                                <button className="pink" type="submit">Post</button>
                                            </div>
                                        </div>
                                </Form>
                            )} 
                        </Formik>
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
        tags: reduxstate.project.tags,
        status: reduxstate.project.status,
        cleanedCode: reduxstate.project.cleanedCode,
        user: reduxstate.user,
    };
};

export default connect(mapStateToProps, {addProjectId, addProjectTitle, addProjectDescription, addProjectTag, deleteProjectTag, addProjectStatus})(ProjectModalForm);

