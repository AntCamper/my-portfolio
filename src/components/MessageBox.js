import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './MessageBox.css';
import { messages } from './messages';
import { useTypewriter } from './useTypewriter';

function MessageBox({ messageKey, onClose }) {
  const message = messages[messageKey];
  const { displayedMessage, isTypingComplete } = useTypewriter(message);


  const handleClick = () => {
    if (isTypingComplete) {
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
