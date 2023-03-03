import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { loadProjects } from "../../state/actions";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import HeaderBar from "../HeaderBar/HeaderBar";
import lily from '../../resources/headshots/LilyHeadshot.png';
import dylan from '../../resources/headshots/DylanHeadshot.png';
import will from '../../resources/headshots/WillHeadshot.png';
import melissa from '../../resources/headshots/MelissaHeadshot.png';
import abby from '../../resources/headshots/AbbyHeadshot.png';
import annie from '../../resources/headshots/AnnieHeadshot.png';
import PostCard from "../../components/CommunityPage/PostCard"
import down from '../../resources/down.svg';
import output from '../../resources/output.png'
import './landing.css'

const Landing = (props) => {
  const [sunLeft, setSunLeft] = useState(true);


  useEffect(() => {
    props.loadProjects();
  }, []);
  const trending = [...props.projects];
  const t = trending.slice(0, 6);

  function animateSun() {
    console.log(sunLeft)
    let sun = document.getElementById("sun");
    if (sunLeft) {
      sun.style.left = "90%";
      setSunLeft(false)
    } else {
      sun.style.left = "";
      setSunLeft(true)
    }

  }



  return (
    <div className="landing">
      <HeaderBar />
      <div className="landing-title-content">
        <div className="landing-title-container">
          <h1 className="landing-title">Convo</h1>
          <h1 className="code-gradient">Code</h1>
        </div>
        <h2>Building Community Around Exploring AI.</h2>
        <div className="landing-file-buttons">
          <button className="yellow-btn"><NavLink to="/editor">Start Coding</NavLink></button>
          <button className="yellow-btn"><NavLink to="/community">Get Inspired</NavLink></button>
        </div>
        <div className="landing-learn-more">
          <h4>Learn More</h4>
          <img className="downArrow" src={down} alt="arrow pointing down" />
        </div>
      </div>

      {/* <div className="slideshow">
                    <div className="slideshowSlider"
                >
                    { t.map((item) => {
                        return (
                        <PostCard item={item} key={item.id} />
                        )
                    })
                        }
                    </div>
                </div> */}

      <div className="landing-info">
        <div className="landing-breakdown">
          <div className="action-info">
            <h1 className="thick" id="sage">Generate.</h1>
            <p>Our platform generates code for html, css, and javascript projects with simple everyday language. </p>
          </div>
          <div className="action-info">
            <h1 className="thick" id="sky">Share.</h1>
            <p>Once a project is complete, share to start the conversation about your AI generated code.</p>
          </div>
          <div className="action-info">
            <h1 className="thick" id="grape">Discuss.</h1>
            <p>Once a project is complete, share to start the conversation about your code. </p>
          </div>

        </div>

        <div className="landing-tutoial">
          <div className="landing-tab">
            <div className="landing-input-header">Input</div>
            <Tabs id="landing-tabs">
              <TabList>
                <Tab id="tab">JS</Tab>
                <Tab id="tab">HTML</Tab>
                <Tab id="tab">CSS</Tab>
              </TabList>


              <TabPanel>
                <div className="tab-landing">
                  <p>Command: Draw the sun and the sky and animate the sun on click</p>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="tab-landing">
                  <p>Command: Draw the sun and the sky and animate the sun on click</p>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="tab-landing">
                  <p>Command: Draw the sun and the sky and animate the sun on click</p>
                </div>
              </TabPanel>
            </Tabs>
          </div>
          <div className="landing-tab2">
            <div className="landing-input-header2">Output</div>
            <div id="sky-render" style={{ cursor: 'pointer' }}>
              <div id="sun" onClick={() => animateSun()}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="team-content">
        <h1>Meet Our Team</h1>
        <div className="member-content">
          <div className="team-member">
            <img className="headshot" alt="Annie Headshot" src={annie} />
            <h4 id=""><strong>Annie Revers</strong></h4>
            <p>Boston, MA | she/her</p>
            <p>Computer Science + Art History Double Major</p>
          </div>
          <div className="team-member">
            <img className="headshot" alt="Abby Headshot" src={abby} />
            <h4 id=""><strong>Abby Owen</strong></h4>
            <p>Larchmont, NY | she/her</p>
            <p>Computer Science Major | English Minor</p>
          </div>
          <div className="team-member">
            <img className="headshot" alt="Dylan Headshot" src={dylan} />
            <h4 id=""><strong>Dylan Bienstock</strong></h4>
            <p>Santa Barbara, CA | he/him</p>
            <p>Computer Science Major | Engineering Sciences + Religion Double Minor</p>
          </div>
          <div className="team-member">
            <img className="headshot" alt="Lily Headshot" src={lily} />
            <h4 id=""><strong>Lily Maechling</strong></h4>
            <p>Pasadena, CA | she/her</p>
            <p>Computer Science + Economics Double Major</p>
          </div>
          <div className="team-member">
            <img className="headshot" alt="Melissa Headshot" src={melissa} />
            <h4 id=""><strong>Melissa Valencia</strong></h4>
            <p>East Los Angeles, CA | she/her</p>
            <p>Computer Science Major | Human-Centered Design + Spanish Double Minor</p>
          </div>
          <div className="team-member">
            <img className="headshot" alt="Will Headshot" src={will} />
            <h4 id=""><strong>Will Perez</strong></h4>
            <p>Orange County, CA | he/him</p>
            <p>Computer Science Major modified with Human-Centered Design | Latin American Studies Minor</p>
          </div>
        </div>
      </div>
      <div className="footer-content">
        <div className="footer-left">
          <h3>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h3>
          <p>Dartmouth College | CS 98</p>
          <p>convocode@gmail.com</p>
          <p>© ConvoCode. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <NavLink to="/editor" className="footer-link">IDE</NavLink>
          <NavLink to="/community" className="footer-link">Community</NavLink>
        </div>
      </div>
    </div>
  )
};
const mapStateToProps = (reduxstate) => {
  return {
    projects: reduxstate.community.projects,
  };
};
export default connect(mapStateToProps, { loadProjects })(Landing);