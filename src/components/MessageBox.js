import { motion } from 'framer-motion';
import { useEffect } from 'react';
import './MessageBox.css';

function MessageBox({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Adjust the delay as needed (3000ms = 3 seconds)

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [onClose]);

  return (
    <motion.div
      className="message-box"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // Fade-out animation on close
      transition={{ duration: 1.5 }} // Duration of the fade-out effect
      style={{ position: 'absolute' }} // Prevents message box from shifting layout
    >
      <motion.p
        className="message-text"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {message}
      </motion.p>
    </motion.div>
  );
}

export default MessageBox;
