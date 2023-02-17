import React from "react";
import { useNavigate } from "react-router-dom";
import like from "../../resources/lightning-bold.png"
import './individualPost.css'

const Comment = (props) => {

  var indentedUser = "  " + props.item.username;
  var boxClass;

  // check if replyingTo field of comment is not empty string
  console.log("in comment card");
  console.log(props.reply);
  if (props.reply) {   // is a reply box
    console.log("is reply")
    boxClass = "ReplyBox";
  } else {
    boxClass = "CommentBox"     // is a comment box
  }

  return (
    <div className={boxClass}>
        <div className="leftLine"></div>
       
        <div key={props.key} className="comment">
            <div className="commentLine1">
                <div className="commentLine1Text">
                    <div className="username">
                        <span>{indentedUser}</span>
                    </div>
                    <div className="timestamp">
                        <span>{props.item.createdAt}</span>
                    </div>
                </div>
                <button></button>
            </div>
            <div className="commentbody">
                <span>{props.item.commentBody}</span>
            </div>
        </div >
    </div>
  );
};


export default Comment;