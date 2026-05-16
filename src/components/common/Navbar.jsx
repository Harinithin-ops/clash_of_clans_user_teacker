import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SettingsModal from './SettingsModal';

const Navbar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Overview', path: '/' },
    { name: 'Army Meta', path: '/army-meta' },
    { name: 'Clan War', path: '/clan-war' },
    { name: 'Live Stats', path: '/live-stats' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(0,219,231,0.1)] flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16">
      <div className="flex items-center gap-8">
        <Link to="/" className="font-display-hero text-headline-lg-mobile tracking-tighter bg-gradient-to-r from-primary-container to-secondary bg-clip-text text-transparent">
          Clash Insight
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-all duration-300 font-code-label text-code-label uppercase py-2 relative group ${
                  isActive ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer">notifications</button>
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          settings
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-primary-container/30 bg-surface-container shadow-[0_0_10px_rgba(0,219,231,0.2)]">
          <img alt="Profile" src="https://ui-avatars.com/api/?name=Admin&background=0D1515&color=00f2ff" />
        </div>
      </div>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
