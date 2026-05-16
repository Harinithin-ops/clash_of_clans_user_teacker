import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../../services/SettingsContext';

const BackgroundMusic = () => {
  const { settings, updateSetting } = useSettings();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Sync music state and volume with settings
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = settings.volume / 100;
      if (settings.musicEnabled && !isPlaying) {
        // We can't always auto-play due to browser policies, 
        // but we can try if the user has interacted.
        audioRef.current.play().catch(() => {
          updateSetting('musicEnabled', false);
          setIsPlaying(false);
        });
        setIsPlaying(true);
      } else if (!settings.musicEnabled && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [settings.musicEnabled, settings.volume]);

  const togglePlay = () => {
    const newState = !settings.musicEnabled;
    updateSetting('musicEnabled', newState);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        src="/music/coc-theme.mp3"
        loop
      />
      
      <motion.button
        onClick={togglePlay}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`group relative flex items-center justify-center w-14 h-14 rounded-full bg-primary-container text-on-primary-container shadow-2xl transition-shadow ${
          isPlaying ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface' : ''
        }`}
        title={isPlaying ? "Mute Village Music" : "Play Village Music"}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isPlaying ? 'playing' : 'paused'}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Visual Equalizer Animation when playing */}
        {isPlaying && (
          <div className="absolute -top-1 flex items-end gap-[2px] h-3">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ height: [4, 12, 6, 10, 4] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
                className="w-1 bg-primary rounded-full"
              />
            ))}
          </div>
        )}

        {/* Pulse effect */}
        {isPlaying && (
          <motion.span
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute inset-0 rounded-full bg-primary"
          />
        )}

        {/* Tooltip */}
        <motion.span 
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-4 px-3 py-1 bg-surface-container text-on-surface text-sm rounded-lg pointer-events-none whitespace-nowrap shadow-md"
        >
          {isPlaying ? "Stop Music" : "Play Theme"}
        </motion.span>
      </motion.button>
    </div>
  );
};

export default BackgroundMusic;
