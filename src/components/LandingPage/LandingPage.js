import React, { useState } from "react";
import HeaderBar from "../HeaderBar/HeaderBar";
import FileModal from "./FileModal";
import { NavLink } from "react-router-dom";

import './landing.css'


const LandingPage = () => {

  const [theme, setTheme] = useState('light');
  // const [modalShow, setModalShow] = useState(false)

  return (
    <div className="landing-page" data-theme={theme}>
      <HeaderBar />
      <div className="title-content" data-theme={theme}>
        <h1>Welcome to Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1>
        <h2>Redefining Python Developer tools.</h2>
        <div className="file-buttons" data-theme={theme}>
          {/* <button onClick={() => setModalShow(!modalShow)}>
            Start Coding
          </button> */}
          <FileModal/>
        </div>
      </div>
      <div className="floating-text">
        <div>
          <p id="floating-cf" data-theme={theme}>"create function"</p>
        </div>
        <div>
          <p id="floating-bc" data-theme={theme}>"build class"</p>
        </div>
        <div>
          <p id="floating-dc" data-theme={theme}>"debug code"</p>
        </div>
        <div>
          <p id="floating-ar" data-theme={theme}>"analyze runtime"</p>
        </div>
        <div>
          <p id="floating-sa" data-theme={theme}>"stackoverflow analysis"</p>
        </div>
      </div>
      <div className="video-content"> 
        <h1>Learn About Our Platform</h1>
        <iframe title="Intro Video" > </iframe>
      </div>
      <div className="team-content">
        <h1>Meet Our Team</h1>
          <div className="member-content">
            <div className="team-member">
              <img alt="Annie Headshot" />
              <h4 id="" data-theme={theme}><strong>Annie Revers</strong></h4>
              <p>Boston, MA | she/her</p>
              <p>Computer Science + Art History Double Major Double Major</p>
            </div>
            <div className="team-member">
              <img alt="Abby Headshot" />
              <h4 id="" data-theme={theme}><strong>Abby Owen</strong></h4>
              <p>Larchmont, NY | she/her</p>
              <p>Computer Science Major English Minor</p>
            </div>
            <div className="team-member">
              <img alt="Dylan Headshot" />
              <h4 id="" data-theme={theme}><strong>Dylan Bienstock</strong></h4>
              <p>Santa Barbara, CA | he/him</p>
              <p>Computer Science Major Engineering Sciences Minor</p>
            </div>
            <div className="team-member">
              <img alt="Lily Headshot" />
              <h4 id="" data-theme={theme}><strong>Lily Maechling</strong></h4>
              <p>Passadena, CA | she/her</p>
              <p>Computer Science + Economics Double Major</p>
            </div>
            <div className="team-member">
            <img alt="Melissa Headshot" />
              <h4 id="" data-theme={theme}><strong>Melissa Valencia</strong></h4>
              <p>East Los Angeles, CA | she/her</p>
              <p>Computer Science Major Human-Centered Design + Spanish Double Minor</p>
            </div>
            <div className="team-member">
              <img alt="Will Headshot" />
              <h4 id="" data-theme={theme}><strong>Will Perez</strong></h4>
              <p>Orange County, CA | he/him</p>
              <p>Computer Science Major modified with Human-Centered Design and Latin American Studies Minor</p>
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
            <NavLink to="/documentation" className="footer-link">Documentation</NavLink>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;