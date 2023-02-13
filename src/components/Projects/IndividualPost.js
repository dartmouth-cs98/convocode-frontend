import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, RedditShareButton, RedditIcon, EmailShareButton, EmailIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';
import { loadProject } from "../../state/actions/project";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import HeaderBar from "../HeaderBar/HeaderBar"
import CodePreview from './CodePreview';
import like from "../../resources/lightning-bold.png"
import down from "../../resources/down.png"
import copy from "../../resources/copy.png"


import './individualPost.css'

const IndividualPost = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  let { id } = useParams();
  console.log(id);

  const location = useLocation();
  console.log(location.pathname);

  const url = `www.convocode.org${location.pathname}`

  useEffect(() => {
    props.loadProject(id);
  }, []);

  let tag = props.project.tags.length > 0 ? props.project.tags[0].toString().toLowerCase() : "undefined"

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
                <button className="pink-button" id="right">Open in IDE</button>
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
            <div className="post-modal-comments">
              <div className="discussion-header">Discussions</div>
              <div>

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

export default connect(mapStateToProps, { loadProject })(IndividualPost);
