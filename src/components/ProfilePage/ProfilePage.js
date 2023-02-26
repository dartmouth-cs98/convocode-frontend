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
  const handleModalToggle = () => {
    setModalShow(!modalShow);
  }

  useEffect(() => {
    window.onbeforeunload = props.refreshUser();

    return () => {
        window.onbeforeunload = null;
    };
}, []);

  return (
    <div className="profile-page" data-theme={props.lightMode ? 'light' : 'dark'}>
      <HeaderBar />
      <div className="page-content">
        <div>
          <div className="user-header">
            <div id="col" style={{ justifyContent: "space-between" }}>
              <h1>👋🏼 Welcome, {props.user.username}</h1>
              <ProfileSettings modalShow={modalShow} handleModalToggle={handleModalToggle}/> 
            </div>
            <div id="col">
              {/* <div className="user-info" id="bus-border">
                {props.user.status}
              </div> */}
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
                {/* {console.log(props.likedProjects)}
                {console.log(props.authoredProjects)}
                 */}
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
                <h2>likes</h2>
                {/* <div className="post-content">
                  {
                 
                    props.user.likedProjects ? (
                      props.user.likedProjects.map((item) => {
                        return (
                          <PostCard item={item} key={item.id} />
                        )
                      })
                    ) : <div />
                  } 
                      </div> */}
            
              </TabPanel>
            </Tabs>
          </div>
        </div>
        <div className="profile-explore"> 
          <div className="profile-explore-header">
            <h3>Popular Now</h3>
          </div> 
          <div className="trending">
            { props.authoredProjects ? (
                props.authoredProjects.map((item) => {
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
  };
};

export default connect(mapStateToProps, { refreshUser })(ProfilePage);