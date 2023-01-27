import React, { useState } from "react";
import like from "../../resources/lightning-bold.png"
import './community.css'

const Post = ({ title, tag, user, likes }) => {
  return (
    <div className="post" id={tag}>
      <div className="titles">
        <h3>{title}</h3>
        <span className="username">@{user}</span>
      </div>
      <div className="footer">
        <div className="tag" id={tag}>
          <span>
            #{tag}
          </span>
        </div>
        <div className="likes">
          <img src={like} />
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};


export default Post;