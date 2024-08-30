import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Play from './components/Play';
import Settings from './components/Settings';
import Leaderboards from './components/Leaderboards';
import PlayerInfo from './components/PlayerInfo';

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play" element={<Play />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/leaderboards" element={<Leaderboards />} />
      <Route path="/player-info" element={<PlayerInfo />} />
    </Routes>
  </Router>
  )
}

export default App
