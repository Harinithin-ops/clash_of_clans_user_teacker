import React from 'react';
import { motion } from 'framer-motion';
import { getSpellImage } from '../../utils/imageMapper';

const SpellsSection = ({ spells }) => {
  if (!spells || spells.length === 0) return null;

  return (
    <div className="mb-12">
      <h3 className="font-display-hero text-2xl text-white mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
          🧪
        </span>
        Spells
      </h3>
      <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
        {spells.map((spell, index) => (
          <motion.div
            key={spell.name}
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.05, type: 'spring' }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-full bg-surface-container-low border-2 border-white/10 flex items-center justify-center p-3 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-shadow overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src={getSpellImage(spell.name)} 
                alt={spell.name}
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=' + spell.name[0]; }}
              />
              
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-surface-container-high px-2 py-0.5 rounded-full border border-white/10 z-20">
                <span className="text-[10px] font-bold text-white whitespace-nowrap">Lvl {spell.level}</span>
              </div>
            </div>
            
            {spell.level === spell.maxLevel && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-surface flex items-center justify-center z-30 shadow-[0_0_10px_rgba(250,204,21,0.6)]"
              >
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SpellsSection;
