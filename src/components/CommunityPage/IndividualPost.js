import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import like from "../../resources/lightning-bold.png"
import share from "../../resources/share.png"


import './community.css'

const IndividualPost = (props) => {
  const [modalShow, setModalShow] = useState(false);

  console.log(modalShow)

  const handleModalToggle = () => {
    setModalShow(!modalShow);
  }


  let tag = props.item.tags ? props.item.tags.split(" ").forEach(element => {
    if (element.toLowerCase() == "easy" || element.toLowerCase() == "medium" || element.toLowerCase() == "hard")
      return element.toLowerCase()
  }) || "undefined" : "undefined";

  tag = props.item.tags.toLowerCase()
  console.log(props.item)
  console.log(tag)

  return (
    <div key={props.key}>
      <div className="post" id={tag} onClick={handleModalToggle}>
        <div className="titles">
          <h3>{props.item.title}</h3>
          <span className="username">@{props.item.username}</span>
        </div>
        <div className="footer">
          <div className="tag" id={tag}>
            <span>
              {props.item.tags ? (
                props.item.tags.split(" ").map((e, idx) => {
                  return (<span>#{e}</span>)
                })
              ) : ""}
            </span>
          </div>
          <div className="likes">
            <img src={like} />
            <span>{props.item.likes}</span>
          </div>
        </div>
      </div>
      <ReactModal className="post-modal" isOpen={modalShow} onRequestClose={handleModalToggle} contentLabel="Post" ariaHideApp={false} >
        <div className="post-modal-content">
          <div className="flex-col" style={{ "flex-grow": "1" }}>
            <div className="post-modal-info">
              <h2>{props.item.title}</h2>
              <span>{props.item.description}</span>
              <div className="flex-row" style={{ "justify-content": "space-between" }}>
                <div className="flex-row" style={{ "align-items": "center" }}>
                  <div className="tag" id={tag} style={{ "margin": 0 }}>
                    {props.item.tags ? (
                      props.item.tags.split(" ").map((e, idx) => {
                        return (<span className="tag">#{e}</span>)
                      })
                    ) : ""}
                  </div>
                  <div className="likes" style={{ "margin": 5 }}>
                    <img src={like} />
                    <span>{props.item.likes}</span>
                  </div>
                </div>
                <button className="pink-button" id="right">Open in IDE</button>
              </div>
              <div className="flex-row" style={{ "justify-content": "space-between" }}>
                <div className="flex-col">
                  <span className="username">@{props.item.username}</span>
                  <span>15 posts</span>
                </div>
                <button className="sage-button" id="right">Share <img src={share} /></button>
              </div>

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
                <span>{props.item.htmlCode}</span>
              </TabPanel>
              <TabPanel>
                <span>{props.item.cssCode}</span>
              </TabPanel>
              <TabPanel>
                <span>{props.item.javaCode}</span>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </ReactModal >
    </div >
  )
};

const mapStateToProps = (reduxstate) => {
  return {};
};

export default connect(mapStateToProps, {})(IndividualPost);
