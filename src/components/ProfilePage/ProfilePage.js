import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import settings from '../../resources/settings.png'
import HeaderBar from "../HeaderBar/HeaderBar";

import 'react-tabs/style/react-tabs.css';
import './profile.css'


const ProfilePage = (props) => {
  return (
    <div className="profile-page" data-theme={props.lightMode ? 'light' : 'dark'}>
      <HeaderBar />
      <div className="page-content">
        <div>
          <div className="user-header">
            <div id="col" style={{ justifyContent: "space-between" }}>
              <h1>Welcome, User!</h1>
              <button id="settings">Settings <img src={settings} /></button>
            </div>
            <div id="col">
              <div className="user-info" id="bus-border">
                Advanced Coder
              </div>
              <div className="user-info" id="grape-border">
                300 Projects
              </div>
              <div className="user-info" id="easy-a-border">
                300 Liked
              </div>
            </div>
          </div>
          <div className="projects">
            <Tabs>
              <TabList>
                <Tab>Projects</Tab>
                <Tab>Liked</Tab>
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
        <div className="popular">
          <div className="pop-header">
            <h4>Popular Right Now</h4>
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

export default connect(mapStateToProps, {})(ProfilePage);