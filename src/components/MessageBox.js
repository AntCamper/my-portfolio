import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './MessageBox.css';

function MessageBox({ message, onClose }) {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < message.length) {
        setDisplayedMessage((prev) => prev + message[index]);
        index++;
      } else {
        clearInterval(intervalId);
        setIsTypingComplete(true);
      }
    }, 100); // Adjust typing speed here (50ms between each character)

    return () => clearInterval(intervalId);
  }, [message]);

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
        {!isTypingComplete && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 0.7, ease: 'easeInOut' }}
          >
            |
          </motion.span>
        )}
      </p>
    </motion.div>
  );
}

export default MessageBox;