import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { loadProjects } from "../../state/actions";
import { refreshUser } from "../../state/actions";
import { clearProject } from '../../state/actions/project';
import PostCard from "../CommunityPage/PostCard.js"
import HeaderBar from "../HeaderBar/HeaderBar";
import 'react-tabs/style/react-tabs.css';
import './profile.css'

const ProfilePage = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = (index) => {
    setSelectedIndex(index);
  }

  useEffect(() => {
    props.loadProjects();
    props.refreshUser();
  }, []);

  useEffect(() => {
    props.refreshUser();
  }, [props.user.projectCount]);

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
            <button className="user-info" id="bus-button">
              {props.user.projectCount} Projects</button>
            <button className="user-info" id="bus-button">
              {props.user.likeCount} Liked </button>
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
                <Tab>Published</Tab>
                <Tab>Saved</Tab>
                <Tab>Liked</Tab>
              </TabList>
              <TabPanel>
                <div className="profile-post-container">
                  {
                    props.user.authoredProjectsPublic === undefined || props.user.authoredProjectsPublic.length === 0 ? (
                      <div className="empty-projects">
                        <h3>Start creating projects!</h3>
                        <NavLink to="/editor"><button id="IDE" onClick={props.clearProject}>Open IDE</button></NavLink>
                      </div>

                    ) :
                      props.user.authoredProjectsPublic.map((item) => {
                        return (
                          <PostCard item={item} key={item.id} />
                        )
                      })
                  }
                </div>
              </TabPanel>
              <TabPanel>
                <div className="profile-post-container">
                  {
                    props.user.authoredProjectsPrivate === undefined || props.user.authoredProjectsPrivate.length === 0 ? (
                      <div className="empty-projects">
                        <h3>Start creating projects!</h3>
                        <NavLink to="/editor"><button id="IDE" onClick={props.clearProject}>Open IDE</button></NavLink>
                      </div>

                    ) :
                      props.user.authoredProjectsPrivate.map((item) => {
                        return (
                          <PostCard item={item} key={item.id} />
                        )
                      })
                  }
                </div>
              </TabPanel>
              <TabPanel>
                <div className="profile-post-container">
                  {
                    props.user.likedProjects === undefined || props.user.likedProjects.length === 0 ? (
                      <div className="empty-likes">
                        <h3>Find projects you like in the ConvoDex Community!</h3>
                        <NavLink to="/community"><button id="community" onClick={props.clearProject}>View Community</button></NavLink>
                      </div>

                    ) :
                      props.user.likedProjects.map((item) => {
                        return (
                          <PostCard item={item} key={item.id} />
                        )
                      })
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

export default connect(mapStateToProps, { loadProjects, refreshUser, clearProject })(ProfilePage);