import React from "react";
import './individualPost.css'
import { connect } from 'react-redux';
import { setReplyingTo } from "../../state/actions/project.js"

const Comment = (props) => {

  var indentedUser = "  " + props.item.username;
  var boxClass;

  // check if replyingTo field of comment is not empty string
  if (props.reply) {   // is a reply box
    boxClass = "ReplyBox";
  } else {
    boxClass = "CommentBox"     // is a comment box
  }
  const updated = props.item.createdAt.slice(0,10);

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
        
                        <span>{updated}</span>
                    </div>
                </div>
                <button className="white-button"id="right" onClick= {() => props.setReplyingTo(props.item.id, props.item.username)}>Reply</button>
            </div>
            <div className="commentbody">
                <span>{props.item.commentBody}</span>
            </div>
        </div >
    </div>
  );
};

const mapStateToProps = (reduxstate) => {
  return {
    project: reduxstate.project,
  };
};
export default connect(mapStateToProps, { setReplyingTo })(Comment);