import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface SplashViewProps {
  onEnter: () => void;
}

export default function SplashView({ onEnter }: SplashViewProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show enter button after 2.5s
    const timerButton = setTimeout(() => {
      setShowButton(true);
    }, 2500);

    // Auto-redirect to Welcome page after 5s
    const timerRedirect = setTimeout(() => {
      onEnter();
    }, 5000);

    return () => {
      clearTimeout(timerButton);
      clearTimeout(timerRedirect);
    };
  }, [onEnter]);

  return (
    <div className="fixed inset-0 bg-brand-black flex flex-col items-center justify-center text-white z-50 overflow-hidden">
      {/* Glow effect behind logo */}
      <div className="absolute w-72 h-72 rounded-full bg-brand-orange/25 blur-3xl" />

      <div className="relative flex flex-col items-center">
        {/* Neon SVG Path drawing of letter 'U' */}
        <svg
          className="w-40 h-40 text-brand-orange"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
        >
          <motion.path
            d="M 25,10 V 60 C 25,80 75,80 75,60 V 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2.0,
              ease: "easeInOut",
            }}
          />
        </svg>

        {/* Brand text sliding/fading in */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-5xl font-display font-medium tracking-widest text-white">
            GOMENZ
          </h1>
          <p className="text-sm tracking-widest text-gray-400 mt-2 font-mono">
            SALES & SERVICE CENTER
          </p>
        </motion.div>
      </div>

      {/* Enter button */}
      <div className="mt-16 h-12 relative z-10 flex flex-col items-center">
        {showButton && (
          <motion.button
            id="splash-enter-btn"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onEnter}
            className="px-8 py-3 bg-brand-orange hover:bg-orange-600 text-white rounded-full font-sans text-sm font-medium tracking-wide shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 transition-all cursor-pointer"
          >
            ENTER SHOP
          </motion.button>
        )}
        <p className="text-xs text-gray-500 mt-4 animate-pulse">
          Auto-entering in a moment...
        </p>
      </div>
    </div>
  );
}
