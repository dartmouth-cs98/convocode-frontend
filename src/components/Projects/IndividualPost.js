import React, { useEffect, useState, useRef } from "react";
import { connect } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, RedditShareButton, RedditIcon, EmailShareButton, EmailIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';
import { createProject, loadProject, setReplyingTo, likeProject, refreshUser } from "../../state/actions";
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
    console.log(props.htmlCodeHistory);
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
    console.log(range);
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
      var decId = (i + 1)%7;
      const start = ranges[i][0];
      const end = ranges[i][1];
      console.log(currTags[start]);
      dList.push({
        range: new monacoRef.current.Range(start + 1,1,end + 1,1),
        options: {
          isWholeLine: true,
          className: decorationDict[decId],
          hoverMessage: {value: currTags[start]}
        }
      });
    }
    editor.updateOptions({readOnly: true});
    var d = editor.deltaDecorations([], dList);
    setDecorationsPost(codeType, d);
    setDisplayPost(codeType, true);
       
  }

  function endTagViewPost(codeType) {
    var editorRef = getEditorPost(codeType);
    editorRef.deltaDecorations(getDecorationsPost(codeType), []);
    editorRef.updateOptions({readOnly: false});
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
      console.log("displaying");
      displayTagsPost(codeType);
    }
  }

  function handleDidJSMount(editor, monaco) {
    jsRef.current = editor;
    monacoRef.current = monaco;
    jsRef.current.updateOptions({readOnly: true});
    const messageContribution = jsRef.current.getContribution('editor.contrib.messageController');
    const diposable = jsRef.current.onDidAttemptReadOnlyEdit(() => {
      messageContribution.showMessage("Open in IDE to edit code.", jsRef.current.getPosition());
    });
  }

  function handleDidCSSMount(editor, monaco) {
    cssRef.current = editor;
    cssRef.current.updateOptions({readOnly: true});
    const messageContribution = cssRef.current.getContribution('editor.contrib.messageController');
    const diposable = cssRef.current.onDidAttemptReadOnlyEdit(() => {
      messageContribution.showMessage("Open in IDE to edit code.", cssRef.current.getPosition());
    });
  }

  function handleDidHTMLMount(editor, monaco) {
    htmlRef.current = editor;
    htmlRef.current.updateOptions({readOnly: true});
    const messageContribution = htmlRef.current.getContribution('editor.contrib.messageController');
    const diposable = htmlRef.current.onDidAttemptReadOnlyEdit(() => {
      messageContribution.showMessage("Open in IDE to edit code.", htmlRef.current.getPosition());
    });
  }


  const handleOpen = () => {
    setOpen(!open);
  };

  const openInIDE = () => {
    console.log("open in ide")
    //check if signed in 
    if (props.user.username === '') {
      alert("Please sign in before opening a new project.")
    } else {

      if (props.user.projects.includes(props.project._id) !== 1) {
        console.log("not my project")

        const projectInfo = {
          title: `Copy of ${props.project.title}`,
          javaCode: props.project.javaCode,
          htmlCode: props.project.htmlCode,
          cssCode: props.project.cssCode,

          tags: props.project.tags,
        }

        console.log("new project to create", projectInfo)

        props.createProject(projectInfo)

      }
      navigate('/editor')
    }
  }

  let { id } = useParams();
  console.log(id);

  const location = useLocation();
  console.log(location.pathname);

  const url = `www.convocode.org${location.pathname}`

  const like = () => {
    props.likeProject(props.project.id)
  }

  useEffect(() => {
    props.loadProject(id);
  }, []);

  useEffect(() => {
    if (props.project.replyingUser) {
      setComment(`@${props.project.replyingUser} `);
    }
  }, [props.project.replyingUser]);

  // handles input text changes
  const handleCommentChange = (event) => {
    setComment(event.target.value);
    console.log(userComment)
  }

  useEffect(() => {
    props.refreshUser()
  }, [props.project.likes]);


  useEffect(() => {
    if (props.user.likedProjects.includes(props.project.id)) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }

  }, [props.user.likedProjects]);


  let tag = "undefined"

  console.log(props.project)
  return (
    <div className="project-page" data-theme={props.lightMode ? 'light' : 'dark'}>
      <HeaderBar />
      <div className="individual-project">
        <div className="post-modal-content">
          <div className="flex-col" style={{ "flex-grow": "1" }}>
            <div className="post-modal-info">
              <h2 style={{ "margin": "0" }}>{props.project.title}</h2>
              <div className="flex-col">
                <span className="username" style={{ "font-weight": "600", "font-size": "16px" }}>@{props.project.username}</span>

              </div>
              <span>{props.project.description}</span>
              <div className="flex-row" style={{ "width": "100%", "justify-content": "left", "alignItems": "center" }}>

                <button className="likes" style={{ width: '70px' }} onClick={like}>
                  {hasLiked ? <img src={likeFilled} alt="Filled Like Button" /> : <img src={likeUnfilled} alt="Unfilled Like Button" />}
                  <span style={{ padding: '3px' }}>{props.project.likes}</span>
                </button>

                <button className="pink-button" id="right" onClick={openInIDE} style={{ "margin-right": "10px" }}>Open in IDE</button>

                <CopyToClipboard text={url}>
                  <button className="sage-button" id="right" style={{ 'margin-right': '10px' }}><img src={copy} alt="Copy Icon" /></button>
                </CopyToClipboard>
                <div className="share-button">
                  <button className="sage-button" id="right" style={{ "margin-right": "10px" }} onClick={handleOpen}>Share <img src={down} alt="Down Arrow" /></button>
                  {
                    open ?
                      <div className="dropdown">
                        <span>
                          <FacebookShareButton url={url} quote="Convocode. Pushing the boundaries of how we engage with AI." hashtags={["convocode"]}>
                            <FacebookIcon size={32} round={true} />Facebook
                          </FacebookShareButton>
                        </span>
                        <span>
                          <TwitterShareButton url={url} title={props.project.title} hashtags={["convocode"]}>
                            <TwitterIcon size={32} round={true} />Twitter
                          </TwitterShareButton>
                        </span>
                        <span>
                          <RedditShareButton url={url} title={props.project.title}>
                            <RedditIcon size={32} round={true} />Reddit
                          </RedditShareButton>
                        </span>
                        <span>
                          <LinkedinShareButton url={url} title={props.project.title}>
                            <LinkedinIcon size={32} round={true} />LinkedIn
                          </LinkedinShareButton>
                        </span>
                        <span>
                          <EmailShareButton url={url} title={props.project.title}>
                            <EmailIcon size={32} round={true} />Email
                          </EmailShareButton>
                        </span>
                      </div>
                      :
                      <></>
                  }
                </div>



              </div>
              <div className="flex-row" style={{ "justify-content": "space-between" }}>
                <div className="" id={tag} style={{ "margin": "10px 5px" }}>
                  {props.project.tags ? (
                    props.project.tags.map((e, idx) => {
                      return (<span className="tag">#{e.toLowerCase()}</span>)
                    })
                  ) : ""}
                </div>
              </div>


            </div>
            <div className="commentcontainer">
              <div className="discussion-header">Discussion</div>
              <div className="comments"> 
              {
                props.user.commentObjects ? (
                props.project.commentObjects.map((item) => {
                  
                  return (
                      <CommentCard item={item} key={item.id} reply={item.replyingTo} />
                  )
                })) : <div />
              }
            </div>
            <div className="discussionFooter">
            <input className="discussionInput" placeholder="Comment on this project" value={userComment} onChange={handleCommentChange}></input>
            <button className="yellow-button" onClick={() => {
                  props.comment(props.project.id, userComment, props.project.replyingTo);
                  setComment("");
                  props.setReplyingTo("", "");
                  props.loadProject(id);
                }} >Submit</button>
              </div>
            </div>
          </div>
          <div className="post-modal-code" style={{ "flex-grow": "4" }}>
            <div className="code-header">Code Preview</div>
            <Tabs>
              <TabList>
                <Tab>Output</Tab>
                <Tab>HTML</Tab>
                <Tab>CSS</Tab>
                <Tab>JS</Tab>
              </TabList>
              <TabPanel>
                <WebOutput theme={theme}/>
              </TabPanel>

              <TabPanel>
                <CodePreview
                  language={"html"}
                  handleDidMount={handleDidHTMLMount}
                  toggleDisplay={toggleDisplay}
                />
              </TabPanel>
              <TabPanel>
                <CodePreview
                  language={"css"}
                  handleDidMount={handleDidCSSMount}
                  toggleDisplay={toggleDisplay}
                />
              </TabPanel>
              <TabPanel>
                <CodePreview
                  language={"javascript"}
                  handleDidMount={handleDidJSMount}
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
  };
};

export default connect(mapStateToProps, { loadProject, createProject, comment, setReplyingTo, likeProject, refreshUser, addJavaCodeHistory, addCSSCodeHistory, addHTMLCodeHistory, setCSSDisplay, setJavaDisplay, setHTMLDisplay })(IndividualPost);
