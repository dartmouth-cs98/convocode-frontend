import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { refreshUser } from "../../state/actions";
import axios from 'axios';
import { getUser } from '../../services/user.js';
import PostCard from "../CommunityPage/PostCard.js"

import settings from '../../resources/settings.png'
import HeaderBar from "../HeaderBar/HeaderBar";

import 'react-tabs/style/react-tabs.css';
import './profile.css'

const ProfilePage = (props) => {

  // useEffect(() => {
  //   props.refreshUser();
  // }, []);

  return (
    <div className="profile-page" data-theme={props.lightMode ? 'light' : 'dark'}>
      <HeaderBar />
      <div className="page-content">
        <div>
          <div className="user-header">
            <div id="col" style={{ justifyContent: "space-between" }}>
              <h1>Welcome, {props.user.username}</h1>
              <button id="settings">Settings <img src={settings} /></button>
            </div>
            <div id="col">
              <div className="user-info" id="bus-border">
                {props.user.status}
              </div>
              <div className="user-info" id="grape-border">
                {props.user.projectCount} Projects
              </div>
              <div className="user-info" id="easy-a-border">
                {props.user.likeCount} Liked
              </div>
            </div>
          </div>
          <div className="projects">
            <Tabs>
              <TabList>
                <Tab>Projects</Tab>
                <div className="post-content">
                  {
               
                    props.authoredProjects ? (
                      props.authoredProjects.map((item) => {
                        return (
                          <PostCard item={item} key={item.id} />
                        )
                      })
                    ) : <div />
                  }
                </div>
                <Tab>Liked</Tab>
                <div className="post-content">
                  {
                 
                    props.likedProjects ? (
                      props.likedProjects.map((item) => {
                        return (
                          <PostCard item={item} key={item.id} />
                        )
                      })
                    ) : <div />
                  }
                </div>
              </TabList>
              <TabPanel>
                <h2>projects</h2>
              </TabPanel>
              <TabPanel>
                <h2>likes</h2>
              </TabPanel>
            </Tabs>
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
    authoredProjects: reduxstate.user.authoredProjects,
    likedProjects: reduxstate.user.likedProjects,
  };
};

export default connect(mapStateToProps, { refreshUser })(ProfilePage);