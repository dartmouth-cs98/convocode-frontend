import React, { useEffect } from "react";
import { connect } from 'react-redux';
import HeaderBar from "../HeaderBar/HeaderBar";
import IndividualPost from "./IndividualPost"
import { loadProjects } from "../../state/actions";
import axios from 'axios';

import './community.css'

const CommunityPage = (props) => {

  // TO DO: replace hard-coded data in requests
  // Set-up for testing until we have functionality to click on project and open pop-up
  function commentOnProject() {

    // request to create comment
    axios.request({
      method: "POST",
      url: `http://localhost:8000/api/comment`,
      data: {
        username: "fakeusername",
        commentBody: "cs70 test",
      }
    }).then((res) => {
      const commentId = res.data;
      console.log("created new comment, now adding comment id to project")
      console.log(commentId);
      // now update project with the new comment (send comment id)
      axios.request({
        method: "PUT",
        url: `http://localhost:8000/api/project/:id`,
        data: {
          commentId: commentId,
          // when you click on the project, it will grab the projectId
          projectId: "63dac16ed40cb88013a722d6"
        }
      }).then((res) => {
        console.log("added comment id to project!")
        console.log("here's the project id")
        console.log(res.data);
      });
    });
  }

  // TO DO: remove hard-coded test data
  // Set-up for testing until we have functionality to click on project and open pop-up
  function commentOnComment() {

    // Two tasks: create a new comment then update original comment this one is replying to
    // request to create comment
    axios.request({
      method: "POST",
      url: `http://localhost:8000/api/comment`,
      data: {
        username: "fakeusername",
        commentBody: "this is a comment on another comment",
      }
    }).then((res) => {
      const commentId = res.data;
      console.log("created new comment, now adding comment id to original comment")
      console.log(commentId);
      // now update project with the new comment (send comment id)
      axios.request({
        method: "PUT",
        url: `http://localhost:8000/api/comment`,
        data: {
          replyCommentId: commentId,
          // when you hit reply, it will grab the original comment id
          commentId: "63dac1f4d40cb88013a722e0"
        }
      }).then((res) => {
        console.log("added comment id to comment!")
        console.log("here's the original comment id")
        console.log(res.data);
      });
    });

  }

  useEffect(() => {
    props.loadProjects();
  }, []);

  console.log(props.projects)

  return (
    <div data-theme={props.lightMode ? 'light' : 'dark'}>
      <HeaderBar />
      <div className="community-page">
        <div className="comm-title">
          <h1>Welcome to the ConvoDex Community</h1>
          <h4>Pushing the boundaries of how we engage with AI</h4>
        </div>
        <div>
          SEARCH BAR
        </div>
        <button className="pink" onClick={() => {
          commentOnComment();
        }} >FOR TESTING ONLY Comment on Project</button>
        <div className="post-content">
          {
            props.projects.map((item, idx) => {
              return (
                <>
                  {/* <PostCard title={item.title} user={item.username} tag={item.tags} likes={item.likes} key={idx} /> */}
                  <IndividualPost item={item} key={idx} />
                </>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (reduxstate) => {
  return {
    lightMode: reduxstate.settings.lightMode,
    projects: reduxstate.community.projects,
  };
};

export default connect(mapStateToProps, { loadProjects })(CommunityPage);