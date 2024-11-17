import React from 'react';
import ProfileContainer from './components/ProfileContainer';
import './index.css';

function App() {
  return (
    <div className="App">
      <div style={{
        backgroundImage: `url(${require('./images/windows_xp_bliss-wide.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh'
      }}>
        <ProfileContainer />
      </div>
    </div>
  );
}

export default App;
