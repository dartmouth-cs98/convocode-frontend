import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import EditorWindow from './components/EditorWindow/EditorWindow';
import LandingPage from './components/LandingPage/LandingPage';
import DocumentationPage from './components/Documentation/DocumentationPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor" element={<EditorWindow />} />
        <Route path="/documentation" element={<DocumentationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
