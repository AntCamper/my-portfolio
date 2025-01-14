import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileContainer from './components/ProfileContainer';
import ProjectShowcase from './components/ProjectShowcase';
import { MessageBox } from './components/MessageBox';
import './index.css';

const projects = [
  { 
    id: 1, 
    title: 'International Currency', 
    link: 'https://antcamper.github.io/CurrencyKey/index.html',
    image: require('./images/CurrencyKeypic.png')
  },
  { 
    id: 2, 
    title: 'WeatherVane', 
    link: 'https://antcamper.github.io/AntCampWeathervane/',
    image: require('./images/WeatherVanepic.png')
  },
  { 
    id: 3, 
    title: 'DnD Quiz', 
    link: 'https://antcamper.github.io/AntCamperQuiz/',
    image: require('./images/DNDQuiz.png')
  }
];

function App() {
  const [currentMessage, setCurrentMessage] = React.useState('default');
  const [showMessage, setShowMessage] = React.useState(false);

  const handleShowMessage = (messageKey) => {
    setCurrentMessage(messageKey);
    setShowMessage(true);
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
    setCurrentMessage('default');
  };

  // Positioning styles for the message box container
  const messageBoxPosition = {
    position: 'absolute',
    top: '65%',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 5
  };

  return (
    <Router>
      <div className='App' style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <ProfileContainer onShowMessage={handleShowMessage} />
        {showMessage && (
          <div style={messageBoxPosition}>
            <MessageBox
              messageKey={currentMessage}
              onClose={handleCloseMessage}
            />
          </div>
        )}
        {projects.map(project => (
          <ProjectShowcase key={project.id} project={project} />
        ))}
      </div>
    </Router>
  );
}

export default App;