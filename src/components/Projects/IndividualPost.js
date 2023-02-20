import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, RedditShareButton, RedditIcon, EmailShareButton, EmailIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';
import { createProject, loadProject, setReplyingTo } from "../../state/actions/project";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import HeaderBar from "../HeaderBar/HeaderBar"
import CodePreview from './CodePreview';
import like from "../../resources/lightning-bold.png"
import down from "../../resources/down.png"
import copy from "../../resources/copy.png"
import CommentCard from "./CommentCard"
import { comment } from "../../state/actions/project.js"

import './individualPost.css'
import { likeProject } from "../../services/projects";

const IndividualPost = (props) => {

  const [userComment, setComment] = useState("");

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };

  const openInIDE = () => {
    console.log("open in ide")
    //check if signed in 
    if (props.user.username === '') {
      alert("Please sign in before opening a new project.")
    } else {
      //likeProject(props.project._id)

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


  let tag = "undefined"

  console.log(props.project)
  return (
    <div className="project-page" data-theme={props.lightMode ? 'light' : 'dark'}>
      <HeaderBar />
      <div className="individual-project">
        <div className="post-modal-content">
          <div className="flex-col" style={{ "flex-grow": "1" }}>
            <div className="post-modal-info">
              <h2>{props.project.title}</h2>
              <span>{props.project.description}</span>
              <div className="flex-row" style={{ "justify-content": "space-between" }}>
                <div className="flex-row" style={{ "align-items": "center" }}>
                  <div className="tag" id={tag} style={{ "margin": 0 }}>
                    {props.project.tags ? (
                      props.project.tags.map((e, idx) => {
                        return (<span className="tag">#{e.toLowerCase()}</span>)
                      })
                    ) : ""}
                  </div>
                  <div className="likes" style={{ "margin": 5 }}>
                    <img src={like} />
                    <span>{props.project.likes}</span>
                  </div>
                </div>
                <button className="pink-button" id="right" onClick={openInIDE}>Open in IDE</button>
              </div>
              <div className="flex-row" style={{ "justify-content": "space-between" }}>
                <div className="flex-col">
                  <span className="username">@{props.project.username}</span>
                  <span>15 posts</span>
                </div>
                <div>
                  <CopyToClipboard text={url}>
                    <button className="sage-button" id="right" style={{ 'margin-right': '10px' }}><img src={copy} /></button>
                  </CopyToClipboard>
                  <button className="sage-button" id="right" onClick={handleOpen}>Share <img src={down} /></button>
                </div>
              </div>
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
            <div className="commentcontainer">     
              <div className="discussion-header">Discussion</div>
           
              <div className="comments"> 
              {
                props.project.commentObjects.map((item) => {
              
                  return (
                    
                      <CommentCard item={item} key={item.id} reply={item.replyingTo} />
                  
                  )
                })
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
                <Tab>HTML</Tab>
                <Tab>CSS</Tab>
                <Tab>JS</Tab>
              </TabList>

              <TabPanel>
                <CodePreview
                  language={"html"}
                />
              </TabPanel>
              <TabPanel>
                <CodePreview
                  language={"css"}
                />
              </TabPanel>
              <TabPanel>
                <CodePreview
                  language={"java"}
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
  };
};

export default connect(mapStateToProps, { loadProject, createProject, comment, setReplyingTo })(IndividualPost);
