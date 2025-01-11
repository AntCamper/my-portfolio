import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './MessageBox.css';

const messages = {
  about: "Hello! My name is Anthony. I'm a UCB Fullstack graduate and web developer. I'm currently looking for full-time opportunities in the tech industry. Take a look around at my other work floating around here - click to drag and double-click to visit!",
  discord: "Feel free to reach out to me on Discord! @Antcamper",
  default: "Hello there! 👋"
};

function MessageBox({ messageKey, onClose }) {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const timeoutRef = useRef(null);
  const messageText = messages[messageKey] || messages.default;
  const currentIndexRef = useRef(0);

  useEffect(() => {
    // Reset state when messageKey changes
    setDisplayedMessage('');
    setIsTypingComplete(false);
    currentIndexRef.current = 0;

    const typeMessage = () => {
      if (currentIndexRef.current < messageText.length) {
        setDisplayedMessage(prevMessage => {
          const nextChar = messageText[currentIndexRef.current];
          currentIndexRef.current += 1;
          return prevMessage + nextChar;
        });

        timeoutRef.current = setTimeout(typeMessage, 35);
      } else {
        setIsTypingComplete(true);
      }
    };

    // Start typing
    timeoutRef.current = setTimeout(typeMessage, 35);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [messageKey, messageText]);

  const handleClick = () => {
    if (isTypingComplete) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      onClose();
    }
  };

  return (
    <motion.div
      className="message-box"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
    >
      <p className="message-text">
        {displayedMessage}
        {!isTypingComplete && <span className="cursor">|</span>}
      </p>
    </motion.div>
  );
}

MessageBox.propTypes = {
  messageKey: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export { MessageBox };