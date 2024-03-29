import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import CodeEditor from '../EditorWindow/CodeEditor';
import WebOutput from '../EditorWindow/WebOutput';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { addProjectId, addProjectTitle, addProjectDescription, addProjectTag, deleteProjectTag, addProjectStatus, createProject, updateExistingProject } from '../../state/actions';
import { setJavaDisplay, setCSSDisplay, setHTMLDisplay } from '../../state/actions';
import { Formik, Form, Field } from 'formik';
import { decorationDict } from "../../utils/decorationDict";
import * as Yup from 'yup';
import 'react-tabs/style/react-tabs.css';
import './projectModalForm.css';
import '../../index.css';

const ProjectModalForm = (props) => {
  const [theme] = useState('light');
  const [modalShow, setModalShow] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [projectTags, setProjectTags] = useState([]);
  const [jsDecorations, setJsDecorations] = useState([]);
  const [cssDecorations, setCssDecorations] = useState([]);
  const [htmlDecorations, setHtmlDecorations] = useState([]);
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
  });
  const [doesExist, setDoesExist] = useState(false);
  const navigate = useNavigate();

  const jsRef = useRef(null);
  const monacoRef = useRef(null);
  const cssRef = useRef(null);
  const htmlRef = useRef(null);

  const ProjectSchema = Yup.object().shape({
    title: Yup.string()
      .required('Required'),
    description: Yup.string()
      .required('Required'),
  });

  useEffect(() => {
    populateModal();
  }, [props.id]);


  const handleModalToggle = () => {
    setModalShow(!modalShow);
  };



  function handleJSDidMount(editor, monaco) {
    jsRef.current = editor;
    monacoRef.current = monaco;
    editor.updateOptions({ readOnly: true });
    const messageContribution = jsRef.current.getContribution('editor.contrib.messageController');
    jsRef.current.onDidAttemptReadOnlyEdit(() => {
      messageContribution.showMessage("Return to IDE to edit code.", jsRef.current.getPosition());
    });
  }

  function handleCSSDidMount(editor) {
    cssRef.current = editor;
    editor.updateOptions({ readOnly: true });
    const messageContribution = cssRef.current.getContribution('editor.contrib.messageController');
    cssRef.current.onDidAttemptReadOnlyEdit(() => {
      messageContribution.showMessage("Return to IDE to edit code.", cssRef.current.getPosition());
    });
  }

  function handleHTMLDidMount(editor) {
    htmlRef.current = editor;
    editor.updateOptions({ readOnly: true });
    const messageContribution = htmlRef.current.getContribution('editor.contrib.messageController');
    htmlRef.current.onDidAttemptReadOnlyEdit(() => {
      messageContribution.showMessage("Return to IDE to edit code.", htmlRef.current.getPosition());
    });
  }

  function setDisplayPost(codeType, bool) {
    if (codeType === "javascript") {
      props.setJavaDisplay(bool);
    } else if (codeType === "css") {
      props.setCSSDisplay(bool);
    } else {
      props.setHTMLDisplay(bool);
    }
  }

  function setDecorationsPost(codeType, d) {
    if (codeType === "javascript") {
      setJsDecorations(d);
    } else if (codeType === "css") {
      setCssDecorations(d);
    } else {
      setHtmlDecorations(d);
    }
  }


  function getDecorationsPost(codeType) {
    if (codeType === "javascript") {
      return jsDecorations;
    } else if (codeType === "css") {
      return cssDecorations;
    } else {
      return htmlDecorations;
    }
  }

  function getHistoryPost(codeType) {
    var history;
    if (codeType === "javascript") {
      history = props.javaCodeHistory;
    } else if (codeType === "css") {
      history = props.cssCodeHistory;
    } else {
      history = props.htmlCodeHistory;
    }
    return history;
  }


  function getEditorPost(codeType) {
    var editorRef;
    if (codeType === "javascript") {
      editorRef = jsRef.current;
    } else if (codeType === "css") {
      editorRef = cssRef.current;
    } else {
      editorRef = htmlRef.current;
    }
    return editorRef;

  }

  function checkInsertion(tag) {
    return tag !== -1;
  }


  function onlyUnique(value, index, arr) {
    return arr.indexOf(value) === index;
  }

  function findTagRange(tag, arr) {
    var range = []
    var currRange = []
    var adding = false;
    for (var i = 0; i < arr.length; i++) {
      if (adding === true && arr[i] !== tag) {
        adding = false;
        range.push(currRange);
        currRange = [];
      }
      if (arr[i] === tag) {
        if (range.length === 0) {
          adding = true
        }
        currRange.push(i);
      }
    }
    if (currRange.length !== 0) {
      range.push(currRange);
    }
    return range;
  }


  function getRangesPost(codeType) {
    var history = getHistoryPost(codeType);
    var currTags = history.slice(-1)[0].tags;
    var insertionTags = currTags.filter(checkInsertion);
    var unique = insertionTags.filter(onlyUnique);
    var ranges = []
    for (var i = 0; i < unique.length; i++) {
      var r = findTagRange(unique[i], currTags);
      for (var j = 0; j < r.length; j++) {
        var start = r[j][0];
        var end = r[j][r[j].length - 1];
        ranges.push([start, end]);
      }
    }
    return ranges;
  }

  function displayTagsPost(codeType) {
    var history = getHistoryPost(codeType);
    var editor = getEditorPost(codeType);
    var ranges = getRangesPost(codeType);
    var dList = [];
    var currTags = history.slice(-1)[0].tags;
    for (var i = 0; i < ranges.length; i++) {
      var decId = (i + 1) % 7;
      const start = ranges[i][0];
      const end = ranges[i][1];
      dList.push({
        range: new monacoRef.current.Range(start + 1, 1, end + 1, 1),
        options: {
          isWholeLine: true,
          className: decorationDict[decId],
          hoverMessage: { value: currTags[start] }
        }
      });
    }
    editor.updateOptions({ readOnly: true });
    var d = editor.deltaDecorations([], dList);
    setDecorationsPost(codeType, d);
    setDisplayPost(codeType, true);

  }


  function toggleDisplay(codeType) {
    var display;
    if (codeType === "javascript") {
      display = props.javaDisplay;
    } else if (codeType === "css") {
      display = props.cssDisplay;
    } else {
      display = props.htmlDisplay;
    }
    if (display) {
      endTagViewPost(codeType);

    } else {
      displayTagsPost(codeType);

    }

  }

  function endTagViewPost(codeType) {
    var editorRef = getEditorPost(codeType);
    editorRef.deltaDecorations(getDecorationsPost(codeType), []);
    editorRef.updateOptions({ readOnly: false });
    setDisplayPost(codeType, false);
    setDecorationsPost([], codeType);
  }


  const handleTagChange = (event) => {
    setNewTag(event.target.value);
  }

  const handleAddTags = (event) => {
    if (projectTags.length === 4) {
      return;
    }
    if (newTag !== "") {
      setProjectTags([...projectTags, newTag]);
      setNewTag("");
    }
  }

  const handleRemoveTags = (index) => {
    setProjectTags([...projectTags.filter(tag => projectTags.indexOf(tag) !== index)]);
  };



  const save = (values) => {
    if (props.user.username === '') {
      alert("Please sign in to save a project.")
      navigate("/signin")
    } else {
      try {
        const status = false;

        if (props.id !== "") {
          const projectInfo = {
            tags: projectTags,
            title: values.title,
            description: values.description,
            javaCode: props.javaCode,
            htmlCode: props.htmlCode,
            cssCode: props.cssCode,
            cleanedCode: props.cleanedCode,
            cleanedHtml: props.cleanedHtml,
            javaCodeHistory: props.javaCodeHistory,
            htmlCodeHistory: props.htmlCodeHistory,
            cssCodeHistory: props.cssCodeHistory,
            status: status,
            id: props.id,
          }
          props.updateExistingProject(projectInfo);
        } else {
          const projectInfo = {
            title: values.title,
            javaCode: props.javaCode,
            htmlCode: props.htmlCode,
            cssCode: props.cssCode,
            cleanedCode: props.cleanedCode,
            cleanedHtml: props.cleanedHtml,
            description: values.description,
            javaCodeHistory: props.javaCodeHistory,
            htmlCodeHistory: props.htmlCodeHistory,
            cssCodeHistory: props.cssCodeHistory,
            tags: projectTags,
            status: status,
          }
          props.createProject(projectInfo);

        }
      } catch (error) {
        console.log("Unable to save post at this time:", error)
      }
      alert("Your projected has been saved!")
      navigate('/profile')
    }
  }

  function populateModal() {
    if (props.id !== "") {
      setDoesExist(true);
      setInitialValues({
        title: props.title,
        description: props.description,
      });
      for (var i = 0; i < props.tags.length; i++) {
        if (projectTags.length === 4) {
          return;
        }
        setProjectTags([...projectTags, props.tags[i]]);
      }
    }
  }

  const submit = (values) => {
    if (props.user.username === '') {
      alert("Please sign in to save a project.")
      navigate("/signin")
      return;
    } else {
      try {
        const status = true;

        if (props.id !== "") {
          const projectInfo = {
            tags: projectTags,
            title: values.title,
            description: values.description,
            javaCode: props.javaCode,
            htmlCode: props.htmlCode,
            cssCode: props.cssCode,
            cleanedCode: props.cleanedCode,
            cleanedHtml: props.cleanedHtml,
            javaCodeHistory: props.javaCodeHistory,
            htmlCodeHistory: props.htmlCodeHistory,
            cssCodeHistory: props.cssCodeHistory,
            status: status,
            id: props.id
          }
          props.updateExistingProject(projectInfo);
        } else {
          const projectInfo = {
            title: values.title,
            javaCode: props.javaCode,
            htmlCode: props.htmlCode,
            cssCode: props.cssCode,
            cleanedCode: props.cleanedCode,
            cleanedHtml: props.cleanedHtml,
            javaCodeHistory: props.javaCodeHistory,
            htmlCodeHistory: props.htmlCodeHistory,
            cssCodeHistory: props.cssCodeHistory,
            description: values.description,
            tags: projectTags,
            status: status,
          }
          props.createProject(projectInfo);
        }
      } catch (error) {
        console.log("Unable to save post at this time:", error)

      }
      alert("Your project has been posted!")
      navigate('/profile');
    }
  }

  const handleInputKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      e.preventDefault();
      handleAddTags();
    }
  };

  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }


  return (
    <div>
      <button onClick={handleModalToggle} className="stop6 green">{doesExist ? "Update Project" : "Save Project"}</button>
      <div className="form-modal">
        <ReactModal className="project-modal" isOpen={modalShow} onRequestClose={handleModalToggle} contentLabel="ConvoCode" ariaHideApp={false}>
          {/* <div> */}
          <Formik
            initialValues={initialValues}
            validationSchema={ProjectSchema}
            onSubmit={(values) =>
              submit(values)
            }
          >
            {({ errors, touched, values }) => (
              <Form onKeyDown={onKeyDown} 
              className="edit-modal-form">
                <div className="edit-modal-info flex-col" style={{ "flexGrow": "1" }}>
                  <div className="input-info">
                    <h3 className="input-header">Project Title </h3>
                    <Field name="title" id="project-input" placeholder="ex. Sun Animation" component="textarea" rows="3" />
                    {errors.title && touched.title ? (
                      <div>{errors.title}</div>
                    ) : null}
                  </div>
                  <div className="input-info">
                    <h3 className="input-header">Project Description</h3>
                    <Field name="description" id="project-input" placeholder="ex. This project contains code to draw a sun which moves across the sky on click. The animation mimics a setting sun." component="textarea" rows="6" />
                    {errors.description && touched.description ? (
                      <div>{errors.description}</div>
                    ) : null}
                  </div>
                  <div id="tags-box" className="input-info ">
                    <h3 className="input-header">Project Tags</h3>
                    {projectTags.map((tag, index) => {
                      return (
                        <div className="tag-item" key={index}>
                          <span className="text">#{tag}</span>
                          <span className="close" onClick={() => handleRemoveTags(index)}>&times;</span>
                        </div>
                      )
                    })
                    }
                    <input id="project-input-tags" type="text" placeholder="ex. drawing, animation" onChange={handleTagChange} onKeyDown={handleInputKeypress} value={newTag} />
                    <div className="tag-button-container">
                      <button className="tag-button" type="button" onClick={handleAddTags}>Add Tag</button>
                    </div>
                  </div>
                  <div className="cancel-button-container">
                      <button className="cancel-project" type="reset" onClick={handleModalToggle}>Cancel</button>
                  </div>
                </div>
                <div className="edit-modal-code" style={{ "flexGrow": "4" }}>
                  <div className="edit-modal-editor">
                    <h3 className="input-header">Code Preview</h3>
                    <Tabs id="pmf-tabs">
                      <TabList>
                        <Tab id="tab">Output</Tab>
                        <Tab id="tab">JS</Tab>
                        <Tab id="tab">HTML</Tab>
                        <Tab id="tab">CSS</Tab>
                      </TabList>
                      <TabPanel>
                        <div className="tab-editor">
                          <WebOutput theme={theme} width="100%" height="440vh"></WebOutput>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="tab-editor">
                          <CodeEditor language={"javascript"} theme={theme} width="100%" height="47vh" toggleDisplay={toggleDisplay} mount={handleJSDidMount} />
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="tab-editor">
                          <CodeEditor language={"html"} theme={theme} width="100%" height="47vh" toggleDisplay={toggleDisplay} mount={handleHTMLDidMount} />
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="tab-editor">
                          <CodeEditor language={"css"} theme={theme} width="100%" height="47vh" toggleDisplay={toggleDisplay} mount={handleCSSDidMount} />
                        </div>
                      </TabPanel>
                    </Tabs>
                    <div className="submit-buttons-container">
                      <button className="light-pink" type="button" onClick={() => save(values)}>Save</button>
                      <button className="pink" type="submit">{doesExist && props.status ? "Update" : "Publish"}</button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          {/* </div> */}
        </ReactModal>
      </div>
    </div>

  )

};

const mapStateToProps = (reduxstate) => {
  return {
    code: reduxstate.code.string,
    javaCode: reduxstate.project.javaCode,
    htmlCode: reduxstate.project.htmlCode,
    cssCode: reduxstate.project.cssCode,
    id: reduxstate.project.id,
    title: reduxstate.project.title,
    description: reduxstate.project.description,
    tags: reduxstate.project.tags,
    status: reduxstate.project.status,
    cleanedCode: reduxstate.project.cleanedCode,
    cleanedHtml: reduxstate.project.cleanedHtml,
    user: reduxstate.user,
    javaCodeHistory: reduxstate.project.javaCodeHistory,
    htmlCodeHistory: reduxstate.project.htmlCodeHistory,
    cssCodeHistory: reduxstate.project.cssCodeHistory,
    javaDisplay: reduxstate.tagDisplay.javaDisplay,
    cssDisplay: reduxstate.tagDisplay.cssDisplay,
    htmlDisplay: reduxstate.tagDisplay.htmlDisplay,
  };
};

export default connect(mapStateToProps, { addProjectId, addProjectTitle, addProjectDescription, addProjectTag, deleteProjectTag, addProjectStatus, createProject, setJavaDisplay, setCSSDisplay, setHTMLDisplay, updateExistingProject })(ProjectModalForm);
