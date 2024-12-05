import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // HashRouter'ı kullan
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </Router>
  );
}

export default App;