import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to Galaxy Glide</h1>
      <button onClick={() => navigate('/play')}>Play</button>
      <button onClick={() => navigate('/settings')}>Settings</button>
      <button onClick={() => navigate('/leaderboards')}>Leaderboards</button>
      <button onClick={() => navigate('/player-info')}>Player Info</button>
    </div>
  );
};

export default Home;