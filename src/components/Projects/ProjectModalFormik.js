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
import { getAuthTokenFromStorage } from '../../services/utils.js';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ProjectModal = (props) => {
    const [theme] = useState('light');
    const [modalShow, setModalShow] = useState(false);
    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectTag, setProjectTag] = useState("");
    const [tags, setTags] = useState([]);
    const projectTags= ["easy", "medium", "hard"];

    const ProjectSchema = Yup.object().shape({
        level: Yup.string()
            .required('Required'),
        title: Yup.string()
            .required('Required'),
        description: Yup.string()
            .required('Required'),
    });

    const handleModalToggle = () => {
        setModalShow(!modalShow);
    };

    const handleLevelChange = (event) => {
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

    const handleAddTags = (event) => {
        if (tags.length === 4) {
            return;
        }

        if (event.key === "Enter" && event.target.value !== ""){
            const newTag = event.target.value;
            setTags([...tags, newTag]);
            event.target.value = "";
        }
    };

    const handleRemoveTags = (index) => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
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
                    <Formik
                        initialValues={{
                            level: "",
                            tags: [""], 
                            title: '',
                            description: '',
                        }}
                        validationSchema={ProjectSchema} >
                        {({ errors, touched }) => (
                            <Form>
                                <h3>Project Level</h3>
                                <Field name="level" />
                                {errors.level && touched.level ? (
                                    <div role="group" aria-labelledby="my-radio-group">
                                    <label>
                                        <Field type="radio" name="level" value="easy" />
                                        easy
                                    </label>
                                    <label>
                                        <Field type="radio" name="level" value="medium" />
                                        medium
                                    </label>
                                    <label>
                                        <Field type="radio" name="level" value="hard" />
                                        hard
                                    </label>
                                    </div>  
                                ) : null}
                                <h3>Project Title</h3>
                                <Field name="title" />
                                {errors.title && touched.title ? (
                                    <div>{errors.title}</div>
                                ) : null}
                                <h3>Project Description</h3>
                                <Field name="description" />
                                {errors.description && touched.description ? (
                                    <div>{errors.description}</div>
                                ) : null}
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
      tag: reduxstate.project.tags,
      status: reduxstate.project.status,
      user: reduxstate.user,
      cleanedCode: reduxstate.project.cleanedCode,
   };
  };
  export default connect(mapStateToProps, { addProjectId, addProjectTitle, addProjectDescription, addProjectTag, addProjectStatus })(ProjectModal);


