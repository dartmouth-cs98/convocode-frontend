import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import like from "../../resources/lightning-bold.png"


import './community.css'

const IndividualPost = (props) => {
  const [modalShow, setModalShow] = useState(false);

  console.log(modalShow)

  const handleModalToggle = () => {
    setModalShow(!modalShow);
  }

  const tag = props.item.tags ? props.item.tags.split(" ").forEach(element => {
    if (element == "easy" || element == "medium" || element == "hard")
      return element
  }) || "undefined" : "undefined";

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
          <div className="flex-col">
            <div className="post-modal-info">
              <h2>{props.item.title}</h2>
              <span>dummy description</span>
              <div className="flex-row">
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
                <button className="pink">Open in IDE</button>
              </div>
              <span className="username">@{props.item.username}</span>
              <div>15 posts</div>

            </div>
            <div className="post-modal-commments">
              <h1>comments</h1>
            </div>
          </div>
          <div className="post-modal-code">
            <h1>code</h1>
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
