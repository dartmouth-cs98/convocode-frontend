// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { connect } from 'react-redux';
// import { loadProjects } from "../../state/actions";
// import HeaderBar from "../HeaderBar/HeaderBar";
// import FileModal from "./FileModal";
// import PostCard from "../../components/CommunityPage/PostCard"
// import lily from '../../resources/headshots/LilyHeadshot.png';
// import dylan from '../../resources/headshots/DylanHeadshot.png';
// import will from '../../resources/headshots/WillHeadshot.png';
// import melissa from '../../resources/headshots/MelissaHeadshot.png';
// import abby from '../../resources/headshots/AbbyHeadshot.png';
// import annie from '../../resources/headshots/AnnieHeadshot.png';
// import './landing.css'


// const LandingPage = (props) => {

//   useEffect(() => {
//     props.loadProjects();
//   }, []);
//   const trending = [...props.projects];
//   const t = trending.slice(0, 6);


//   return (
//     <div className="landing-page" data-theme={props.lightMode ? 'light' : 'dark'}>
//       <HeaderBar />
//       <div className="title-content">
//         <h1>Welcome to Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h1>
//         <h2>Building Community Around Exploring AI.</h2>
//         <div className="file-buttons">
//         <button><NavLink to="/editor">Start Coding</NavLink></button>
//           <button><NavLink to="/community">Get Inspired</NavLink></button>
//       </div>
//       </div>
//       <div className="floating-text">
//         <div>
//           <p id="floating-cf">"create website"</p>
//         </div>
//         <div>
//           <p id="floating-bc">"style site"</p>
//         </div>
//         <div>
//           <p id="floating-dc">"share project"</p>
//         </div>
//         <div>
//           <p id="floating-ar">"discuss prompts"</p>
//         </div>
//         <div>
//           <p id="floating-sa">"generate code"</p>
//         </div>
//       </div>
      

//       <div className="video-content">
//         <h1>🌐 Learn About Our Platform</h1>
//         <iframe title="Intro Video" > </iframe>
//       </div>
//       <div className="trending-content">
//         <h1>🔥 Trending Post</h1>
//         <div className="landing-post-content">
//             {
//               t.map((item) => {
//                 return (
//                   <PostCard item={item} key={item.id} />
//                 )
//               })
//             }
//         </div>
//       </div>
//       <div className="team-content">
//         <h1> 👏🏽 Meet Our Team</h1>
//         <div className="member-content">
//           <div className="team-member">
//             <img className="headshot" alt="Annie Headshot" src={annie} />
//             <h4 id=""><strong>Annie Revers</strong></h4>
//             <p>Boston, MA | she/her</p>
//             <p>Computer Science + Art History Double Major</p>
//           </div>
//           <div className="team-member">
//             <img className="headshot" alt="Abby Headshot" src={abby} />
//             <h4 id=""><strong>Abby Owen</strong></h4>
//             <p>Larchmont, NY | she/her</p>
//             <p>Computer Science Major | English Minor</p>
//           </div>
//           <div className="team-member">
//             <img className="headshot" alt="Dylan Headshot" src={dylan} />
//             <h4 id=""><strong>Dylan Bienstock</strong></h4>
//             <p>Santa Barbara, CA | he/him</p>
//             <p>Computer Science Major | Engineering Sciences + Religion Double Minor</p>
//           </div>
//           <div className="team-member">
//             <img className="headshot" alt="Lily Headshot" src={lily} />
//             <h4 id=""><strong>Lily Maechling</strong></h4>
//             <p>Pasadena, CA | she/her</p>
//             <p>Computer Science + Economics Double Major</p>
//           </div>
//           <div className="team-member">
//             <img className="headshot" alt="Melissa Headshot" src={melissa} />
//             <h4 id=""><strong>Melissa Valencia</strong></h4>
//             <p>East Los Angeles, CA | she/her</p>
//             <p>Computer Science Major | Human-Centered Design + Spanish Double Minor</p>
//           </div>
//           <div className="team-member">
//             <img className="headshot" alt="Will Headshot" src={will} />
//             <h4 id=""><strong>Will Perez</strong></h4>
//             <p>Orange County, CA | he/him</p>
//             <p>Computer Science Major modified with Human-Centered Design | Latin American Studies Minor</p>
//           </div>
//         </div>
//       </div>
//       <div className="footer-content">
//         <div className="footer-left">
//           <h3>Convo<span id="sage">C</span><span id="sky">o</span><span id="grape">d</span><span id="pumpkin-spice">e</span></h3>
//           <p>Dartmouth College | CS 98</p>
//           <p>convocode@gmail.com</p>
//           <p>© ConvoCode. All rights reserved.</p>
//         </div>
//         <div className="footer-right">
//           <NavLink to="/editor" className="footer-link">IDE</NavLink>
//           <NavLink to="/community" className="footer-link">Community</NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };
// const mapStateToProps = (reduxstate) => {
//   return { 
//     lightMode: reduxstate.settings.lightMode,
//     projects: reduxstate.community.projects,
//   };
// };

// export default connect(mapStateToProps, {loadProjects})(LandingPage);