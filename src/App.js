import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebEditors from './components/EditorWindow/WebEditors';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import LandingPage from './components/LandingPage/LandingPage';
import MobileView from './components/MobileView/MobileView';
import CommunityPage from './components/CommunityPage/CommunityPage';
import Profile from './components/ProfilePage/ProfilePage';


function App() {
  const [isMobile] = useState(window.innerWidth < 725);
  console.log(window.innerWidth)

  if (isMobile) return <MobileView />;

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor" element={<WebEditors />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
