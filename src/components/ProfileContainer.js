import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './ProfileContainer.css';
import ProfilePic from '../images/AntPfp.png';
import EyeImg from '../images/eye.png';
import MouthImg from '../images/AntMouth.png';
import GameContainer from './GameContainer';

// Importing SVG icons
import discordIcon from '../images/discord.svg';
import githubIcon from '../images/github.svg';
import linkedinIcon from '../images/linkedin.svg';

// Constants
const EYE_MOVEMENT_DIVISOR = 8;
const MAX_EYE_OFFSET_RATIO = 1 / 4;

const buttonIcons = {
  discord: discordIcon,
  github: githubIcon,
  linkedin: linkedinIcon,
  game: '🎮',
};

const DraggableButtonContainer = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{
        top: 0,
        left: 0,
        right: window.innerWidth - 300,
        bottom: window.innerHeight - 100,
      }}
      style={{ position: 'absolute', left: position.x, top: position.y }}
    >
      {children}
    </motion.div>
  );
};

const DraggableGameContainer = ({ onClose }) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{
        top: -window.innerHeight / 2,
        left: -window.innerWidth / 2,
        right: window.innerWidth / 2,
        bottom: window.innerHeight / 2,
      }}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
      }}
    >
      <GameContainer onClose={onClose} />
    </motion.div>
  );
};

const ProfileContainer = ({ onShowMessage }) => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [animateMouth, setAnimateMouth] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const eyeBoxRef = useRef(null);

  const calculateEyeOffset = (mousePos, rectStart, rectSize) => {
    const maxOffset = rectSize * MAX_EYE_OFFSET_RATIO;
    return Math.max(
      -maxOffset,
      Math.min((mousePos - rectStart - rectSize / 2) / EYE_MOVEMENT_DIVISOR, maxOffset)
    );
  };

  const handleMouseMove = (event) => {
    if (!eyeBoxRef.current) return;

    const rect = eyeBoxRef.current.getBoundingClientRect();
    const offsetX = calculateEyeOffset(event.clientX, rect.left, rect.width);
    const offsetY = calculateEyeOffset(event.clientY, rect.top, rect.height);

    setEyePosition({ x: offsetX, y: offsetY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleButtonClick = (messageKey) => {
    if (messageKey === 'game') {
      setShowGame(true);
    } else {
      onShowMessage(messageKey);
    }
    setAnimateMouth(true);
    setTimeout(() => setAnimateMouth(false), 3000);
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const Eye = ({ className }) => (
    <img
      src={EyeImg}
      alt={`${className} Eye`}
      className={`eye ${className}`}
      style={{ transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)` }}
    />
  );

  const ActionButton = ({ type }) => {
    const handleClick = () => {
      if (type === 'github') {
        handleExternalLink('https://github.com/AntCamper');
      } else if (type === 'linkedin') {
        handleExternalLink('https://www.linkedin.com/in/anthony-jones-96b98b2a9/');
      } else {
        handleButtonClick(type);
      }
    };

    return (
      <button className={`button-wrapper ${type}`} onClick={handleClick}>
        {buttonIcons[type] && (type === 'game' ? 
          <span className="button-icon">{buttonIcons[type]}</span> : 
          <img src={buttonIcons[type]} alt={`${type} Icon`} className="button-icon" />
        )}
        <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </button>
    );
  };

  return (
    <div className="app-container">
      <div className="portfolio-wrapper">
        <div className="profile-container">
          <img src={ProfilePic} alt="Profile" className="profile-image" />

          <div className="eye-box" ref={eyeBoxRef}>
            <Eye className="eye-left" />
            <Eye className="eye-right" />
          </div>

          <motion.img
            src={MouthImg}
            alt="Mouth"
            className="mouth"
            animate={animateMouth ? { y: [0, 15, 0] } : { y: 0 }}
            transition={{ 
              duration: 0.5, 
              repeat: animateMouth ? 5 : 0, 
              repeatType: "reverse", 
              ease: "easeInOut" 
            }}
          />
        </div>

        <DraggableButtonContainer>
          <div className="button-container">
            {['about', 'github', 'discord', 'linkedin', 'game'].map(type => (
              <ActionButton key={type} type={type} />
            ))}
          </div>
        </DraggableButtonContainer>
      </div>
      
      {showGame && <DraggableGameContainer onClose={() => setShowGame(false)} />}
    </div>
  );
};

export default ProfileContainer;
