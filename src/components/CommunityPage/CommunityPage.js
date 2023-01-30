import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import HeaderBar from "../HeaderBar/HeaderBar";
import ReactSearchBox from "react-search-box";
import Post from "./Post.js"
import axios from 'axios';

import './community.css'

const CommunityPage = (props) => {
  function commentOnProject() {

    // TO DO: get username, comment body, projectId
  
      // send post information to the backend 
      axios.request({
        method: "POST",
        url: `http://localhost:8000/api/project/comment`,
        data: {
          username: "fakeusername",
          commentBody: "this is the body of a comment",
          projectId: "63d6f832a748ee38ddd87646"
      }
      }).then((res) => {
        // have some sort of popup or change the button to like "code saved!" or something
        console.log("commented on project!")
        console.log(res.data);
      });
    }
      
  function commentOnComment() {

    // TO DO: get username, comment body, commentId of comment they're commenting on
  
      // send post information to the backend 
      axios.request({
        method: "POST",
        url: `http://localhost:8000/api/project/comment`,
        data: {
          username: "fakeusername",
          commentBody: "this is the body of a comment",
          commentId: "fake project id"
      }
      }).then((res) => {
        // have some sort of popup or change the button to like "code saved!" or something
        console.log("commented on project!")
        console.log(res.data);
      });
    }
  
  const posts = [
    {
      title: "A* Optimized Runtime",
      user: "username",
      tag: "easy",
      likes: 12,
    },
    {
      title: "A* Optimized Runtime",
      user: "username",
      tag: "medium",
      likes: 12,
    },
    {
      title: "A* Optimized Runtime",
      user: "username",
      tag: "hard",
      likes: 12,
    },
    {
      title: "A* Optimized Runtime",
      user: "username",
      tag: "easy",
      likes: 12,
    }, {
      title: "A* Optimized Runtime",
      user: "username",
      tag: "easy",
      likes: 12,
    },
    {
      title: "A* Optimized Runtime",
      user: "username",
      tag: "medium",
      likes: 12,
    },
    {
      title: "A* Optimized Runtime",
      user: "username",
      tag: "hard",
      likes: 12,
    },
    {
      title: "A* Optimized Runtime",
      user: "username",
      tag: "easy",
      likes: 12,
    }
  ]

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
             commentOnProject();
          }} >Comment on Project</button>
        <div className="post-content">
          {
            posts.map((item, idx) => {
              return (<Post title={item.title} user={item.user} tag={item.tag} likes={item.likes} key={idx} />)
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
  };
};

export default connect(mapStateToProps, {})(CommunityPage);