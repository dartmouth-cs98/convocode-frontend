import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { refreshUser } from "../../state/actions";
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

  const trending = [...props.projects];
  const t = trending.slice(0, 6);

  const handleModalToggle = () => {
    setModalShow(!modalShow);
  }

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
        <div>
          <div className="user-header">
            <div id="col" style={{ justifyContent: "space-between" }}>
              <h1>👋🏼 Welcome, {props.user.username}</h1>
              {/* <ProfileSettings modalShow={modalShow} handleModalToggle={handleModalToggle}/>  */}
            </div>
            <div id="col">
              <div className="user-info" id="grape-border">
                {props.user.projectCount} Projects 💻
              </div>
              <div className="user-info" id="easy-a-border">
                {props.user.likeCount} Liked Post ♥️
              </div>
            </div>
          </div>
          <div className="projects">

            <Tabs>
              <TabList>
                <Tab>Projects</Tab>
                <Tab>Liked</Tab>
              </TabList>
              <TabPanel >
      
                <div className="profile-post-container">
                  {
                    props.user.authoredProjects ? (
                      props.user.authoredProjects.map((item) => {
                        return (
                          <PostCard item={item} key={item.id} />
                        )
                      })
                    ) : <div />
                  }
                </div>
              </TabPanel>
              <TabPanel>
                <div className="profile-post-container">
                  {
                    props.user.likedProjects ? (
                      props.user.likedProjects.map((item) => {
                        return (
                          <PostCard item={item} key={item.id} />
                        )
                      })
                    ) : <div />
                  } 
                      </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
        <div className="profile-explore"> 
          <div className="profile-explore-header">
            <h3>Popular Now</h3>
          </div> 
          <div className="trending">
            { t ? (
               t.map((item) => {
                    return (
                      <div className="profile-explore-card-container">
                        <PostCard item={item} key={item.id} />
                      </div>
                    )
                  })
                ) : <div />
              }
          </div>
        </div>
      
      </div>
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

export default connect(mapStateToProps, { refreshUser })(ProfilePage);