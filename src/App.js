import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileContainer from './components/ProfileContainer';
import ProjectShowcase from './components/ProjectShowcase';
import './index.css';

const projects = [
  { id: 1, title: 'Currency Key', link: '/currency-key' },
  // Add more projects as needed
];

function App() {
  return (
    <Router>
      <div className="App">
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
          <ProfileContainer />
          {projects.map(project => (
            <ProjectShowcase key={project.id} project={project} />
          ))}
        </div>
      </div>
    </Router>
  );
}

export default App;