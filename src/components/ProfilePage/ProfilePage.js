import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { loadProjects } from "../../state/actions";
import axios from 'axios';
import { getUser } from '../../services/user.js';
import PostCard from "../CommunityPage/PostCard.js"

// import settings from '../../resources/settings.png'
import HeaderBar from "../HeaderBar/HeaderBar";
import ProfileSettings from "./profileSettings.js";

import 'react-tabs/style/react-tabs.css';
import './profile.css'

const ProfilePage = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const trending = [...props.projects];
  const t = trending.slice(0, 6);

  const handleModalToggle = () => {
    setModalShow(!modalShow);
  }

  const handleSelect = (index) => {
    setSelectedIndex(index);
  }

  const handleProjectsClick = () => {
    setSelectedIndex(0);
  }

  const handleLikedClick = () => {
    setSelectedIndex(1);
  }

  useEffect(() => {
    props.loadProjects();
  }, []);

 /*  useEffect(() => {
    window.onbeforeunload = props.refreshUser();
    // props.refreshProjects();

    return () => {
        window.onbeforeunload = null;
    };
}, []); */

  return (
    <div className="profile-page" data-theme={props.lightMode ? 'light' : 'dark'}>
      <HeaderBar />
      <div className="page-content">
        {/* <div> */}
          {/* <div className="user-header"> */}
            {/* <div id="col" style={{ justifyContent: "space-between" }}> */}
            <div className="user-header">
            <div className="user-name-header">
              <h1>Welcome, {props.user.username}!</h1>
              {/* <ProfileSettings modalShow={modalShow} handleModalToggle={handleModalToggle}/>  */}
            </div>
            {/* <div id="col" className="spacingUnder"> */}
            <div className="profile-total-projects">
              {/* <div className="user-info" id="grape-border">
                {props.user.projectCount} Projects
              </div>
              <div className="user-info" id="easy-a-border">
                {props.user.likeCount} Liked Posts
              </div> */}
              <button classname="user-info" onClick={handleProjectsClick} id="grape-border">
                {props.user.projectCount} Projects</button>
              <button classname="user-info" onClick={handleLikedClick} id="easy-a-border">
                {props.user.likeCount} Liked Posts</button>
            </div>
            </div>
          {/* </div> */}
          <div className="projects">
            <div>
            <Tabs
              selectedIndex={selectedIndex}
              onSelect={handleSelect}
              >
              <TabList>
                <Tab>Projects</Tab>
                <Tab>Liked</Tab>
              </TabList>
              <TabPanel>
                <div className="profile-post-container">
                  {
                    props.user.authoredProjects.length > 0 ? (
                      props.user.authoredProjects.map((item) => {
                        return (
                          <PostCard item={item} key={item.id} />
                        )
                      })
                    ) : 
                    <div className="empty-projects"> 
                        <h3>Start creating projects!</h3>
                        <NavLink to="/editor"><button id="IDE">Open IDE</button></NavLink>
                    </div>
                  }
                </div>
              </TabPanel>
              <TabPanel>
                <div className="profile-post-container">
                  {
                    props.user.likedProjects.length > 0 ? (
                      props.user.likedProjects.map((item) => {
                        return (
                          <PostCard item={item} key={item.id} />
                        )
                      })
                    ) :
                    <div className="empty-likes"> 
                      <h3>Find projects you like in the ConvoDex Community!</h3>
                      <NavLink to="/community"><button id="community">View Community</button></NavLink>
                    </div>
                  } 
                      </div>
              </TabPanel>
            </Tabs>
            </div>
          </div>
        </div>
        {/* <div className="profile-explore"> 
          <div className="profile-explore-header">
            <h3>Popular Now</h3>
          </div> 
          <div className="trending">
            { t ? (
               t.map((item) => {
                    return (
                      <div className="profile-post-container">
                        <PostCard item={item} key={item.id} />
                      </div>
                    )
                  })
                ) : <div />
              }
          </div>
        </div> */}
      {/* </div> */}
    </div >
  );
};
const mapStateToProps = (reduxstate) => {
  return {
    lightMode: reduxstate.settings.lightMode,
    user: reduxstate.user,
    projects: reduxstate.community.projects
  };
};

export default connect(mapStateToProps, { loadProjects })(ProfilePage);