import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import EditorWindow from './components/EditorWindow/EditorWindow';
import HeaderBar from './components/HeaderBar/HeaderBar';
import LandingPage from './components/LandingPage/LandingPage';


function App() {
  return (
    <Router>
      <HeaderBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor" element={<EditorWindow />} />
      </Routes>
    </Router>
  );
}

export default App;
