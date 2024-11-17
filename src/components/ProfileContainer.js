import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './ProfileContainer.css';
import './MessageBox.css';

// Importing images
import ProfilePic from '../images/AntPfp.png';
import EyeImg from '../images/eye.png';
import MouthImg from '../images/AntMouth.png';

// Importing SVG icons
import discordIcon from '../images/discord.svg';
import githubIcon from '../images/github.svg';
import linkedinIcon from '../images/linkedin.svg';

// Constants
const MOUTH_ANIMATION_DURATION = 200;
const EYE_MOVEMENT_DIVISOR = 8;
const MAX_EYE_OFFSET_RATIO = 1 / 4;

const messages = {
  github: 'Check out my GitHub!',
  discord: 'Join my Discord!',
  linkedin: 'Connect on LinkedIn!',
  about: 'Howdy, my name is Anthony. I am a UCB Fullstack graduate and a web developer. I am currently looking for full-time opportunities in the tech industry.',
};

const buttonIcons = {
  discord: discordIcon,
  github: githubIcon,
  linkedin: linkedinIcon,
};

// MessageBox component (unchanged)
const MessageBox = ({ message, onClose }) => {
  return (
    <div className="message-box" onClick={onClose}>
      {message}
      <span className="message-box-close" onClick={(e) => e.stopPropagation()}></span>
    </div>
  );
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

const ProfileContainer = () => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isMouthOpen, setIsMouthOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
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

  const toggleMouth = () => {
    setIsMouthOpen(true);
    setTimeout(() => setIsMouthOpen(false), MOUTH_ANIMATION_DURATION);
  };

  const handleShowMessage = (messageKey) => {
    setCurrentMessage(messages[messageKey]);
    setShowMessage(true);
    toggleMouth();
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
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
        handleShowMessage(type);
      }
    };

    return (
      <button className={`button-wrapper ${type}`} onClick={handleClick}>
        {buttonIcons[type] && <img src={buttonIcons[type]} alt={`${type} Icon`} className="button-icon" />}
        <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </button>
    );
  };

  return (
    <div className="app-container">
      <div className="portfolio-wrapper">
        {showMessage && (
          <MessageBox 
            message={currentMessage} 
            onClose={handleCloseMessage} 
          />
        )}

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
            animate={{ y: isMouthOpen ? 10 : 0 }}
            transition={{ duration: MOUTH_ANIMATION_DURATION / 1000 }}
          />
        </div>

        <DraggableButtonContainer>
          <div className="button-container">
            {Object.keys(messages).map(type => (
              <ActionButton key={type} type={type} />
            ))}
          </div>
        </DraggableButtonContainer>
      </div>
    </div>
  );
};

export default ProfileContainer;