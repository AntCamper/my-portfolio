import React from 'react';
import './App.css';
import headerImage from './images/PortfolioHeader.png';
import profilePic from './images/AntPfp.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={headerImage} alt="Portfolio Header" className="header-image" />
      </header>
      <main>
        <div className="profile-section">
          <img src={profilePic} alt="Profile Picture" className="profile-photo" />
        </div>
        <p>Welcome to my comic-style portfolio!</p>
      </main>
      <footer>
        <p>© 2023 My Comic Portfolio</p>
      </footer>
    </div>
  );
}

export default App;
