import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Play from './components/Play';
import Settings from './components/Settings';
import Leaderboards from './components/Leaderboards';
import PlayerInfo from './components/PlayerInfo';
import LoginPage from './components/LoginPage';
import PageNotFound from './components/PageNotFound';
import {GoogleOAuthProvider} from '@react-oauth/google'

function App() {

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId='685738743986-ttssrs84m6678ngibr276j3h8ro7dsei.apps.googleusercontent.com'>
        <LoginPage/>
      </GoogleOAuthProvider>
  
    )
  }

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play" element={<Play />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/leaderboards" element={<Leaderboards />} />
      <Route path="/player-info" element={<PlayerInfo />} />
      <Route path="/login" element={<GoogleAuthWrapper />} />
      <Route path="*"  element={<PageNotFound />} />
    </Routes>
  </Router>
  )
}

export default App
