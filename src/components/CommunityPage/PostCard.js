import React from "react";
import { useNavigate } from "react-router-dom";
import like from "../../resources/lightning-bold.png"
import './community.css'

const Post = (props) => {

  const navigate = useNavigate();

  let tag = props.item.tags.length > 0 ? props.item.tags[0].toString().toLowerCase() : "undefined"

  console.log(props.item)

  return (
    <div key={props.key} id={tag} className="post" onClick={() => navigate(`/project/${props.item.id}`)}>
      <div className="titles">
        <h3>{props.item.title}</h3>
        <span className="username">@{props.item.username}</span>
      </div>
      <div className="footer">
        <div className="tag" id={tag}>
          <span>#{tag}</span>
        </div>
        <div className="likes">
          <img src={like} />
          <span>{props.item.likes}</span>
        </div>
      </div>
    </div >
  );
};


export default Post;