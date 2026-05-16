import React from 'react';
import { motion } from 'framer-motion';
import { getHeroImage } from '../../utils/imageMapper';

const HeroesSection = ({ heroes }) => {
  if (!heroes || heroes.length === 0) return null;

  return (
    <div className="mb-12">
      <h3 className="font-display-hero text-2xl text-white mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
          👑
        </span>
        Heroes
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {heroes.map((hero, index) => (
          <motion.div
            key={hero.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="group relative glass-card p-5 rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden"
          >
            {/* Background Glow */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity ${hero.level === hero.maxLevel ? 'bg-yellow-400' : 'bg-primary'}`}></div>
            
            <div className="flex gap-4 items-center relative z-10">
              <div className="w-20 h-20 rounded-xl bg-surface-container flex items-center justify-center p-2 border border-white/5 shadow-inner">
                <img 
                  src={getHeroImage(hero.name)} 
                  alt={hero.name}
                  className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=' + hero.name[0]; }}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-headline-sm text-white text-sm mb-1">{hero.name}</h4>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-on-surface-variant">Level {hero.level}</span>
                  <span className="text-on-surface-variant/60">Max {hero.maxLevel}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(hero.level / hero.maxLevel) * 100}%` }}
                    className={`h-full rounded-full ${hero.level === hero.maxLevel ? 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'bg-gradient-to-r from-primary to-secondary'}`}
                  />
                </div>
              </div>
            </div>

            {hero.level === hero.maxLevel && (
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-yellow-400/20 border border-yellow-400/40 rounded text-[10px] font-bold text-yellow-400 tracking-wider">
                MAX
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroesSection;
