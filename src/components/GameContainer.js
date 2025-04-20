import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './GameContainer.css';
import GirlSprite from '../images/girl-sprite.png'; // Your asset
import AntSprite from '../images/ant-sprite.png'; // Find/make this
import GunSound from '../sounds/gun-shot.mp3'; // Add this

const GameContainer = ({ onClose }) => {
  const [score, setScore] = useState(0);
  const [ants, setAnts] = useState([]);
  const [ammo, setAmmo] = useState(10);
  const gameAreaRef = useRef(null);
  const audioRef = useRef(new Audio(GunSound));

  // Spawn ants randomly
  useEffect(() => {
    const spawnAnt = () => {
      if (!gameAreaRef.current) return;
      
      const area = gameAreaRef.current.getBoundingClientRect();
      const newAnt = {
        id: Date.now(),
        x: Math.random() * (area.width - 40),
        y: Math.random() * (area.height - 40),
        speed: 0.5 + Math.random() * 2
      };
      
      setAnts(prev => [...prev, newAnt]);
    };

    const interval = setInterval(spawnAnt, 1000);
    return () => clearInterval(interval);
  }, []);

  // Move ants
  useEffect(() => {
    const moveAnts = () => {
      setAnts(prev => prev.map(ant => ({
        ...ant,
        x: ant.x + ant.speed,
        y: ant.y + (Math.random() > 0.5 ? ant.speed/2 : -ant.speed/2)
      })).filter(ant => ant.x < 1000)); // Remove off-screen ants
    };

    const animationFrame = requestAnimationFrame(moveAnts);
    return () => cancelAnimationFrame(animationFrame);
  }, [ants]);

  const handleShoot = (e) => {
    if (ammo <= 0) return;
    
    // Play gun sound
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    
    // Check for hits
    const rect = gameAreaRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    setAnts(prev => prev.filter(ant => {
      const isHit = Math.abs(ant.x - clickX) < 30 && Math.abs(ant.y - clickY) < 30;
      if (isHit) setScore(s => s + 1);
      return !isHit;
    }));
    
    setAmmo(a => a - 1);
  };

  const reload = () => {
    setAmmo(10);
  };

  return (
    <motion.div 
      className="game-container"
      drag
      dragConstraints={{
        top: -window.innerHeight/2,
        left: -window.innerWidth/2,
        right: window.innerWidth/2,
        bottom: window.innerHeight/2
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <button className="close-button" onClick={onClose}>×</button>
      
      <div className="game-header">
        <h2>Ant Blaster!</h2>
        <div className="game-stats">
          <p>Score: <span>{score}</span></p>
          <p>Ammo: <span>{ammo}/10</span></p>
        </div>
      </div>

      <div 
        ref={gameAreaRef} 
        className="game-area" 
        onClick={handleShoot}
      >
        <img 
          src={GirlSprite} 
          className="girl-sprite" 
          alt="Girl with toy gun"
        />
        
        {ants.map(ant => (
          <motion.img
            key={ant.id}
            src={AntSprite}
            className="ant"
            style={{ left: `${ant.x}px`, top: `${ant.y}px` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ))}

        {ammo <= 0 && (
          <button className="reload-button" onClick={reload}>
            RELOAD
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default GameContainer;