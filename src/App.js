import React from 'react';
import ProfileContainer from './components/ProfileContainer';
import FloatingThumbnails from './components/FloatingThumbnails';
import './index.css';

function App() {
  return (
    <div className="App">
      <div style={{
        width: '100vw',
        height: '100vh'
      }}>
        <ProfileContainer />
      </div>
    </div>
  );
}

export default App;
