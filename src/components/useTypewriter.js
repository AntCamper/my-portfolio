import { useState, useEffect } from 'react';

export function useTypewriter(message, speed = 50) {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (message) {
      let index = 0;
      setDisplayedMessage('');
      setIsTypingComplete(false);

      const intervalId = setInterval(() => {
        if (index < message.length) {
          setDisplayedMessage((prev) => prev + message[index]);
          index++;
        } else {
          clearInterval(intervalId);
          setIsTypingComplete(true);
        }
      }, speed);

      return () => clearInterval(intervalId);
    }
  }, [message, speed]);

  return { displayedMessage, isTypingComplete };
}
