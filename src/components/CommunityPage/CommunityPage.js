import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import HeaderBar from "../HeaderBar/HeaderBar";
import ReactSearchBox from "react-search-box";
import Post from "./Post.js"
import axios from 'axios';

import './community.css'

const CommunityPage = (props) => {
  // get all posts from database

  const [posts, setPosts] = useState([]);

  function getProjects(){
    axios.request({
      method: "GET",
      url: `http://localhost:8000/api/project`
    }).then((res) => {
      // have some sort of popup or change the button to like "code saved!" or something
      setPosts(res.data);
    });
  }

  useEffect(() => {
    getProjects();
  }, [posts]);

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
        <div className="post-content">
          {
            posts.slice(0).reverse().map((item, idx) => {
              return (<Post title={item.title} user={item.username} tag={item.tags} likes={item.likes} key={idx} />)
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