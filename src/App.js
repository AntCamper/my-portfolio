import React, { useEffect, useRef } from 'react';
import './App.css';
import profilePic from './images/AntPfp.png';
import eyeImage from './images/eye.png';

function App() {
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const eyes = [leftEyeRef.current, rightEyeRef.current];
      eyes.forEach(eye => {
        if (eye) {
          const rect = eye.getBoundingClientRect();
          const eyeCenterX = rect.left + rect.width / 2;
          const eyeCenterY = rect.top + rect.height / 2;
          const maxDistance = 3; // maximum pixels the eye can move
          
          let distanceX = (e.clientX - eyeCenterX) / window.innerWidth * maxDistance * 2;
          let distanceY = (e.clientY - eyeCenterY) / window.innerHeight * maxDistance * 2;
          
          distanceX = Math.max(-maxDistance, Math.min(maxDistance, distanceX));
          distanceY = Math.max(-maxDistance, Math.min(maxDistance, distanceY));
          
          eye.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="App">

      
      <main>
        <div className="profile-section">
          <div className="profile-container">
            <img src={profilePic} alt="Profile Picture" className="profile-photo" />
            <img ref={leftEyeRef} src={eyeImage} alt="Left Eye" className="eye left-eye" />
            <img ref={rightEyeRef} src={eyeImage} alt="Right Eye" className="eye right-eye" />
          </div>
        </div>
        <p>Welcome to my portfolio!</p>
      </main>
      <footer>
        <p>AntCamp Portfolio</p>
      </footer>
    </div>
  );
}

export default App;
