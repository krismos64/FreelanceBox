import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { playStartupSound } from '../utils/sound';

const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    playStartupSound();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-navy-900 z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src="/logo.png" 
          alt="FreelanceBox"
          className="w-48 h-48 mb-8"
        />
      </motion.div>
      
      <motion.h1
        className="text-4xl font-bold text-white mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        FreelanceBox
      </motion.h1>
      
      <motion.p
        className="text-lg text-pink-400 text-center max-w-md px-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Simplifiez votre gestion, concentrez-vous sur votre passion
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;