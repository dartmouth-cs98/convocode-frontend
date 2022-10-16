import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import EditorWindow from './components/EditorWindow/EditorWindow';
import LandingPage from './components/LandingPage/LandingPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor" component={<EditorWindow />} />
      </Routes>
    </Router>
  );
}

export default App;
