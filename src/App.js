import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebEditors from './components/EditorWindow/WebEditors';
import EditorWindow from './components/EditorWindow/EditorWindow';
import LandingPage from './components/LandingPage/LandingPage';
import DocumentationPage from './components/Documentation/DocumentationPage';
import MobileView from './components/MobileView/MobileView';


function App() {
  const [isMobile] = useState(window.innerWidth < 725);
  console.log(window.innerWidth)

  if (isMobile) return <MobileView />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor" element={<WebEditors />} />
        <Route path="/documentation" element={<DocumentationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
