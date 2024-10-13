import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'
import RefreshHandler from './RefreshHandler.js';

const Home = () => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('user-info')
    setIsAuthenticated(false)
    navigate('/')
  }

  return (
    <div key={isAuthenticated} style={{ textAlign: 'center', padding: '50px' }}>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <header>
        <h1>Welcome to Galaxy Glide</h1>
      </header>
      <main>
        <button onClick={() => navigate('/play')}>Play</button>
        <button onClick={() => navigate('/settings')}>Settings</button>
        <button onClick={() => navigate('/leaderboards')}>Leaderboards</button>
        <button onClick={() => navigate('/player-info')}>Player Info</button>
      </main>
      <section>
        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ):(
          <button onClick={() => navigate('/login')}>Login</button>
        )}
       
      </section>

    </div>
  );
};

export default Home;