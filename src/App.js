import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileContainer from './components/ProfileContainer';
import ProjectShowcase from './components/ProjectShowcase';
import './index.css';

const projects = [
  { id: 1, title: 'International Currency', link: 'https://antcamper.github.io/CurrencyKey/index.html' },
  { id: 2, title: 'WeatherVane', link: 'https://antcamper.github.io/AntCampWeathervane/' },
];

function App() {
  return (
    <Router>
      <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <ProfileContainer />
        {projects.map(project => (
          <ProjectShowcase key={project.id} project={project} />
        ))}
      </div>
    </Router>
  );
}

export default App;