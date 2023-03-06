import React, { useEffect, useState, useRef } from "react";
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, RedditShareButton, RedditIcon, EmailShareButton, EmailIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';
import { createProject, deleteUserProject, loadProject, setReplyingTo, likeProject, refreshUser } from "../../state/actions";
import { addCSSCodeHistory, addJavaCodeHistory, addHTMLCodeHistory } from "../../state/actions/project.js";
import { setJavaDisplay, setCSSDisplay, setHTMLDisplay } from '../../state/actions';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import HeaderBar from "../HeaderBar/HeaderBar"
import CodePreview from './CodePreview';
import likeUnfilled from "../../resources/likes-empty.svg"
import likeFilled from "../../resources/likes-filled.svg"
import down from "../../resources/down.png"
import copy from "../../resources/copy.png"
import CommentCard from "./CommentCard"
import { comment } from "../../state/actions/project.js"
import { decorationDict } from "../../utils/decorationDict";
import WebOutput from "../EditorWindow/WebOutput";
import './individualPost.css';

const IndividualPost = (props) => {

  const jsRef = useRef(null);
  const htmlRef = useRef(null);
  const cssRef = useRef(null);
  const monacoRef = useRef(null);
  const [theme] = useState("light");
  const [userComment, setComment] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [jsDecorations, setJsDecorations] = useState([]);
  const [cssDecorations, setCssDecorations] = useState([]);
  const [htmlDecorations, setHtmlDecorations] = useState([]);
  const [isMine, setIsMine] = useState(false);
  const [hasComments, setHasComments] = useState(false);


  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


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

  function endTagViewPost(codeType) {
    var editorRef = getEditorPost(codeType);
    editorRef.deltaDecorations(getDecorationsPost(codeType), []);
    editorRef.updateOptions({ readOnly: false });
    setDisplayPost(codeType, false);
    setDecorationsPost([], codeType);
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

  function handleDidJSMount(editor, monaco) {
    jsRef.current = editor;
    monacoRef.current = monaco;
    jsRef.current.updateOptions({ readOnly: true });
    const messageContribution = jsRef.current.getContribution('editor.contrib.messageController');
    jsRef.current.onDidAttemptReadOnlyEdit(() => {
      messageContribution.showMessage("Open in IDE to edit code.", jsRef.current.getPosition());
    });
  }

  function handleDidCSSMount(editor, monaco) {
    cssRef.current = editor;
    cssRef.current.updateOptions({ readOnly: true });
    const messageContribution = cssRef.current.getContribution('editor.contrib.messageController');
    cssRef.current.onDidAttemptReadOnlyEdit(() => {
      messageContribution.showMessage("Open in IDE to edit code.", cssRef.current.getPosition());
    });
  }

  function handleDidHTMLMount(editor, monaco) {
    htmlRef.current = editor;
    htmlRef.current.updateOptions({ readOnly: true });
    const messageContribution = htmlRef.current.getContribution('editor.contrib.messageController');
    htmlRef.current.onDidAttemptReadOnlyEdit(() => {
      messageContribution.showMessage("Open in IDE to edit code.", htmlRef.current.getPosition());
    });
  }


  const handleOpen = () => {
    setOpen(!open);
  };

  let { id } = useParams();

  const location = useLocation();

  const url = `www.convocode.org${location.pathname}`

  const like = () => {
    if (props.user.username === '') {
      alert("Please sign in before opening a new project.")
      navigate("/signin")
    } else {
      props.likeProject(props.project.id)
    }
  }

  useEffect(() => {
    props.loadProject(id);
  }, []);

  useEffect(() => {
    if (props.commentObjects && props.commentObjects.length > 0) {
      setHasComments(true)
    }
  }, [props.commentObjects]);

  useEffect(() => {
    if (props.project.replyingUser) {
      setComment(`@${props.project.replyingUser} `);
    }
  }, [props.project.replyingUser]);

  // handles input text changes
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  }

  useEffect(() => {
    props.refreshUser()
  }, [props.project.likes]);

  useEffect(() => {
    if (props.user.likedProjects.some(proj => proj.id === props.project.id)) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
    console.log("has liked ", hasLiked)

  }, [props.user.likedProjects]);

  const handleInputKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      e.preventDefault();
      props.comment(props.project.id, userComment, props.project.replyingTo);
      setComment("");
      props.setReplyingTo("", "");
    }
  };

  const openClick = () => {
    if (props.user.username === '') {
      alert("Please sign in before opening a new project.")
      navigate("/signin")
    } else if (isMine) {
      props.loadProject(props.project._id);
      navigate('/editor');
    } else {
      const projectInfo = {
        title: `Copy of ${props.project.title}`,
        javaCode: props.project.javaCode,
        description: `Copy of ${props.project.title} created by ${props.project.username}`,
        htmlCode: props.project.htmlCode,
        cssCode: props.project.cssCode,
        javaCodeHistory: props.project.javaCodeHistory,
        cssCodeHistory: props.project.cssCodeHistory,
        htmlCodeHistory: props.project.htmlCodeHistory,
        tags: props.project.tags,
      }

      props.createProject(projectInfo);
      navigate('/profile');

    }
  }

  const deleteProject = () => {
      props.deleteUserProject(props.project.id);
  }

  useEffect(() => {

    if (props.user.username === props.project.username) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }

  }, [props.project]);

  const [iframeSrc, setIframeSrc] = useState(null);

  const getGeneratedPageURL = ({ html, css, js }) => {
    const getBlobURL = (code, type) => {
      const blob = new Blob([code], { type });
      return URL.createObjectURL(blob);
    };

    const cssURL = getBlobURL(css, 'text/css')
    const jsURL = getBlobURL(js, 'text/javascript')
    const source = `
    <html>
      <head>
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
      </head>
      <body>
        ${html || ''}
        ${js && `<script src="${jsURL}"></script>`}
      </body>
    </html>`;


    return getBlobURL(source, 'text/html');
  }

  useEffect(() => {
    const url = getGeneratedPageURL({
      html: props.htmlCode,
      css: props.cssCode,
      js: props.cleanedCode,
    });
    setIframeSrc(url);

  }, [props.htmlCode, props.cssCode, props.javascriptCode, props.cleanedCode]);

  let tag = "undefined"

  return (
    <div className="project-page" data-theme={props.lightMode ? 'light' : 'dark'}>
      <HeaderBar />
      <div className="individual-project">
        <div className="post-modal-content">
          <div className="flex-col" style={{ "flex-grow": "1" }}>
            <div className="post-modal-info">
              <h2 style={{ "margin": "0" }}>{props.project.title}</h2>
              <div className="flex-col">
                <span className="username" style={{ "font-weight": "600", "margin-top": "5px" }}>@{props.project.username}</span>

              </div>
              <div className="description-container">
              <span style={{ "margin-top": "5px" }} >{props.project.description}</span>
              {/* <div> */}
              {
                props.user.username == props.project.username ? (
                    <NavLink to="/profile"><button className="cancel-project" id="right" onClick={deleteProject} style={{ "margin-right": "10px" }}>Delete</button></NavLink>
                ) : <></>
                    
              }
              {/* </div> */}
              </div>
              {/* <div className="flex-row clickables" style={{ "width": "100%", "justify-content": "left", "alignItems": "center", "font-size": "1em" }}> */}
              <div className="flex-row clickables">
                <button className="likes2" onClick={like}>
                  {hasLiked ? <img src={likeFilled} alt="Filled Like Button" /> : <img src={likeUnfilled} alt="Unfilled Like Button" />}
                  <p style={{ "padding-right": '3px' }}>{props.project.likes}</p>
                </button>
                <div className="ip-button-container">
                <button className="pink-button" id="right" onClick={openClick} style={{ "margin-right": "10px" }}>{isMine ? 'Open in IDE' : 'Make a Copy'}</button>
                <CopyToClipboard text={url}>
                  <button className="sage-button" id="right" style={{ 'margin-right': '10px' }} onClick={() => alert("The project link has been copied to your clipboard.")}><img src={copy} alt="Copy Icon" /></button>
                </CopyToClipboard>
                <div className="share-button">
                  <button className="sage-button" id="right" style={{ "margin-right": "10px", "text-size": "2vw" }} onClick={handleOpen}>Share<img src={down} alt="Down Arrow" /></button>
                  {
                    open ?
                      <div className="dropdown">
                        <span>
                          <FacebookShareButton url={url} quote="Convocode. Pushing the boundaries of how we engage with AI." hashtags={["convocode"]}>
                            <FacebookIcon size={32} round={true} /> Facebook
                          </FacebookShareButton>
                        </span>
                        <span>
                          <TwitterShareButton url={url} title={props.project.title} hashtags={["convocode"]}>
                            <TwitterIcon size={32} round={true} /> Twitter
                          </TwitterShareButton>
                        </span>
                        <span>
                          <RedditShareButton url={url} title={props.project.title}>
                            <RedditIcon size={32} round={true} /> Reddit
                          </RedditShareButton>
                        </span>
                        <span>
                          <LinkedinShareButton url={url} title={props.project.title}>
                            <LinkedinIcon size={32} round={true} /> LinkedIn
                          </LinkedinShareButton>
                        </span>
                        <span>
                          <EmailShareButton url={url} title={props.project.title}>
                            <EmailIcon size={32} round={true} /> Email
                          </EmailShareButton>
                        </span>
                      </div>
                      :
                      <></>
                  }
                  </div>
                </div>



              </div>
              <div className="flex-row" style={{ "justify-content": "space-between" }}>
                <div className="" id={tag} style={{ "margin": "10px 5px", "font-size": "18px" }}>
                  {props.project.tags ? (
                    props.project.tags.map((e, idx) => {
                      return (<span className="tag">#{e.toLowerCase()}</span>)
                    })
                  ) : ""}
                </div>
              </div>


              <div className="commentcontainer" >
                <div className="discussion-header">Discussion</div>
                <div className="comments" >
                  {
                    hasComments ? (
                      props.project.commentObjects.map((item) => {
                        return (
                          <CommentCard item={item} key={item.id} reply={item.replyingTo} />
                        )
                      })) : <div className="emptyComments"> <h3>Start the conversation! Be the first to comment.</h3> </div>
                  }
                </div>
                <div className="discussionFooter">
                  <input className="discussionInput" placeholder="Comment on this project" value={userComment} onChange={handleCommentChange} onKeyDown={handleInputKeypress}></input>
                  <button className="yellow-button" onClick={() => {
                    props.comment(props.project.id, userComment, props.project.replyingTo);
                    setComment("");
                    props.setReplyingTo("", "");
                  }} >Submit
                  </button>
                </div>
              </div>

            </div>
          </div>
          <div className="post-modal-code" style={{ "flex-grow": "4" }}>
            <div className="code-header">Code Preview</div>
            <Tabs>
              <TabList>
                <Tab>Output</Tab>
                <Tab>JS</Tab>
                <Tab>HTML</Tab>
                <Tab>CSS</Tab>
              </TabList>
              <TabPanel>
                <WebOutput theme={theme} width="100%" height="618vh" />
              </TabPanel>
              <TabPanel>
                {/* <div className="editor-wrapper"> */}
                <CodePreview
                  height="68.5vh"
                  language={"javascript"}
                  handleDidMount={handleDidJSMount}
                  toggleDisplay={toggleDisplay}
                />
                {/* </div> */}
              </TabPanel>
              <TabPanel>
                <CodePreview
                  height="68.5vh"
                  language={"html"}
                  handleDidMount={handleDidHTMLMount}
                  toggleDisplay={toggleDisplay}
                />
              </TabPanel>
              <TabPanel>
                <CodePreview
                  height="68.5vh"
                  language={"css"}
                  handleDidMount={handleDidCSSMount}
                  toggleDisplay={toggleDisplay}
                />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div >
    </div >
  )
};

const mapStateToProps = (reduxstate) => {
  return {
    project: reduxstate.project,
    user: reduxstate.user,
    javaCodeHistory: reduxstate.project.javaCodeHistory,
    cssCodeHistory: reduxstate.project.cssCodeHistory,
    htmlCodeHistory: reduxstate.project.htmlCodeHistory,
    javaDisplay: reduxstate.tagDisplay.javaDisplay,
    cssDisplay: reduxstate.tagDisplay.cssDisplay,
    htmlDisplay: reduxstate.tagDisplay.htmlDisplay,
    commentObjects: reduxstate.project.commentObjects,
  };
};

export default connect(mapStateToProps, { loadProject, createProject, deleteUserProject, comment, setReplyingTo, likeProject, refreshUser, addJavaCodeHistory, addCSSCodeHistory, addHTMLCodeHistory, setCSSDisplay, setJavaDisplay, setHTMLDisplay })(IndividualPost);
