import React, { useEffect } from "react";
import { connect } from 'react-redux';
import HeaderBar from "../HeaderBar/HeaderBar";
import PostCard from "./PostCard"
import AlgoliaSearch from "./AlgoliaSearch"
import { loadProjects } from "../../state/actions";

import './community.css'

const CommunityPage = (props) => {

  useEffect(() => {
    props.loadProjects();
  }, []);

  return (
    <div data-theme={props.lightMode ? 'light' : 'dark'}>
      <HeaderBar />
      <div className="community-page">
        <div className="comm-title">
          <h1>Welcome to the ConvoDex Community</h1>
          <h4>Pushing the boundaries of how we engage with AI</h4>
        </div>
        <div className="search">
          <AlgoliaSearch/>
        </div>
        <div className="post-content">
          {
            props.projects.map((item) => {
              return (
                <PostCard item={item} key={item.id} />
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