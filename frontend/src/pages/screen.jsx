import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ onFinish }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3500); // Bumped slightly to allow the dots animation to shine

    return () => clearTimeout(timer);
  }, [onFinish]);

  // Framer Motion variant for the dots wrapper to orchestrate the wave effect
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Framer Motion variant for each individual bouncing dot
  const loadingCircleVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white overflow-hidden select-none">

      {/* Animated Logo */}
      <motion.img
        // NOTE: In Vite, paths inside 'public' should omit the word 'public' itself
        src="/LOG.png" 
        alt="E-GISUBIZO Logo"
        className="w-40 md:w-56 object-contain mb-6"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeOut"
        }}
      />

      {/* App Name */}
      <motion.h1
        className="text-3xl md:text-5xl font-extrabold tracking-wide text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 1
        }}
      >
        E-GISUBIZO
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-gray-400 mt-4 text-sm md:text-base text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1,
          duration: 1
        }}
      >
        Smart Digital Complaint Management Platform
      </motion.p>

      {/* Loading Animation Fix: Handled beautifully via Framer Motion instead of buggy Tailwind delays */}
      <motion.div
        className="mt-12 flex gap-2 h-3 items-center justify-center"
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="w-3 h-3 rounded-full bg-white block"
            variants={loadingCircleVariants}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

    </div>
  );
};

export default SplashScreen;