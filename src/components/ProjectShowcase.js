import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import './ProjectShowcase.css';

const ProjectShowcase = ({ project }) => {
  const [position, setPosition] = useState({
    x: Math.random() * (window.innerWidth - 340),
    y: Math.random() * (window.innerHeight - 180)
  });
  const [isSwimming, setIsSwimming] = useState(true);
  const [velocity, setVelocity] = useState({
    x: Math.random() * 3 - 1.5,
    y: Math.random() * 3 - 1.5
  });
  const isDragging = useRef(false);
  const controls = useAnimation();

  useEffect(() => {
    if (!isSwimming || isDragging.current) return;

    const moveProject = () => {
      setPosition(prev => {
        if (isDragging.current) return prev;

        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;

        // Bounce off edges
        if (newX < 0 || newX > window.innerWidth - 320) {
          setVelocity(v => ({ ...v, x: -v.x }));
        }
        if (newY < 0 || newY > window.innerHeight - 180) {
          setVelocity(v => ({ ...v, y: -v.y }));
        }

        newX = Math.max(0, Math.min(newX, window.innerWidth - 320));
        newY = Math.max(0, Math.min(newY, window.innerHeight - 180));

        controls.start({ x: newX, y: newY, transition: { type: "spring", stiffness: 100, damping: 10 } });

        return { x: newX, y: newY };
      });
    };

    const intervalId = setInterval(moveProject, 50);
    return () => clearInterval(intervalId);
  }, [isSwimming, velocity, controls]);

  const handleDragStart = () => {
    isDragging.current = true;
    setIsSwimming(false);
  };

  const handleDrag = (event, info) => {
    controls.start({ x: info.point.x, y: info.point.y, transition: { type: "tween", duration: 0 } });
  };

  const handleDragEnd = (event, info) => {
    isDragging.current = false;
    const newX = Math.max(0, Math.min(info.point.x, window.innerWidth - 320));
    const newY = Math.max(0, Math.min(info.point.y, window.innerHeight - 180));
    
    controls.start({ 
      x: newX, 
      y: newY, 
      transition: { type: "spring", stiffness: 300, damping: 25 } 
    });

    setPosition({ x: newX, y: newY });
    
    setTimeout(() => {
      setIsSwimming(true);
      setVelocity({
        x: Math.random() * 3 - 1.5,
        y: Math.random() * 3 - 1.5
      });
    }, 5000);
  };

  const handleDoubleClick = () => {
    window.open(project.link, '_blank');
  };

  return (
    <motion.div
      className="project-showcase"
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDoubleClick={handleDoubleClick}
      animate={controls}
      initial={{ x: position.x, y: position.y }}
      style={{
        cursor: 'grab',
        zIndex: 4,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      aria-label={`Drag to move or double-click to open ${project.title} project`}
    >
      <div className="project-content">
        <img 
          src={project.image}
          alt={project.title} 
          className="project-image"
          style={{
            width: '320px',
            height: '180px',
            objectFit: 'cover'
          }}
        />
        <p className="project-title">{project.title}</p>
      </div>
    </motion.div>
  );
};

ProjectShowcase.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
};

export default ProjectShowcase;
