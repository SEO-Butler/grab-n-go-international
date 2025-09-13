import React from 'react';
import { motion } from 'framer-motion';

const FloatingIcons = () => {
  const icons = [
    { emoji: '✈️', delay: 0, x: '10%', duration: 15 },
    { emoji: '🧳', delay: 2, x: '80%', duration: 18 },
    { emoji: '🍜', delay: 4, x: '20%', duration: 20 },
    { emoji: '🎵', delay: 6, x: '70%', duration: 16 },
    { emoji: '🌍', delay: 8, x: '90%', duration: 22 },
    { emoji: '🎪', delay: 3, x: '5%', duration: 19 },
    { emoji: '🎭', delay: 7, x: '60%', duration: 17 },
    { emoji: '🎨', delay: 1, x: '40%', duration: 21 }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-20"
          style={{ left: icon.x }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ 
            y: '-20vh', 
            opacity: [0, 0.3, 0.3, 0] 
          }}
          transition={{
            duration: icon.duration,
            delay: icon.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          whileHover={{ scale: 1.2, opacity: 0.6 }}
        >
          {icon.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;