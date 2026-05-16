import React from 'react';
import { motion } from 'framer-motion';
import { getSiegeImage, siegeList } from '../../utils/imageMapper';

const SiegeSection = ({ troops }) => {
  const sieges = troops?.filter(t => siegeList.includes(t.name)) || [];
  
  if (sieges.length === 0) return null;

  return (
    <div className="mb-12">
      <h3 className="font-display-hero text-2xl text-white mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
          🚛
        </span>
        Siege Machines
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sieges.map((siege, index) => (
          <motion.div
            key={siege.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-4 rounded-xl border border-white/5 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-orange-500/5 to-transparent pointer-events-none"></div>
            
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 bg-white/5 rounded-lg p-2 group-hover:scale-110 transition-transform">
                <img 
                  src={getSiegeImage(siege.name)} 
                  alt={siege.name}
                  className="w-full h-full object-contain"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=' + siege.name[0]; }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-headline-sm text-sm truncate">{siege.name}</h4>
                <div className="flex justify-between items-center text-[10px] text-on-surface-variant mt-1">
                  <span>Level {siege.level}</span>
                  <span>{siege.maxLevel} Max</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full mt-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(siege.level / siege.maxLevel) * 100}%` }}
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SiegeSection;
