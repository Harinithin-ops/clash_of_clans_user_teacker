import React from 'react';
import { motion } from 'framer-motion';
import { petList, siegeList } from '../../utils/imageMapper';

const ArmyOverview = ({ player }) => {
  const calculateTotalLevels = (items) => items?.reduce((sum, item) => sum + item.level, 0) || 0;
  
  const heroLevels = calculateTotalLevels(player.heroes);
  const troopLevels = calculateTotalLevels(player.troops?.filter(t => t.village === 'home' && !petList.includes(t.name) && !siegeList.includes(t.name)));
  const spellLevels = calculateTotalLevels(player.spells);
  const petLevels = calculateTotalLevels(player.troops?.filter(t => petList.includes(t.name)));
  const siegeLevels = calculateTotalLevels(player.troops?.filter(t => siegeList.includes(t.name)));

  const stats = [
    { label: 'Hero Power', value: heroLevels, icon: '👑', color: 'from-yellow-500/20 to-orange-500/20', borderColor: 'border-yellow-500/30' },
    { label: 'Troop Strength', value: troopLevels, icon: '⚔️', color: 'from-blue-500/20 to-cyan-500/20', borderColor: 'border-blue-500/30' },
    { label: 'Magic Mastery', value: spellLevels, icon: '🧪', color: 'from-purple-500/20 to-pink-500/20', borderColor: 'border-purple-500/30' },
    { label: 'Pet Bonding', value: petLevels, icon: '🐾', color: 'from-green-500/20 to-emerald-500/20', borderColor: 'border-green-500/30' },
    { label: 'Siege Capacity', value: siegeLevels, icon: '🚛', color: 'from-orange-500/20 to-red-500/20', borderColor: 'border-orange-500/30' },
  ];

  return (
    <div className="mb-12">
      <h3 className="font-display-hero text-2xl text-white mb-8 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
          📊
        </span>
        Army Overview Analytics
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card p-6 rounded-2xl border ${stat.borderColor} bg-gradient-to-br ${stat.color} relative overflow-hidden group`}
          >
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity text-4xl">
              {stat.icon}
            </div>
            <div className="relative z-10">
              <div className="text-on-surface-variant font-code-label text-[10px] uppercase tracking-widest mb-1">{stat.label}</div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-3xl font-stat-value text-white"
              >
                {stat.value}
              </motion.div>
              <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }} // Mock visualization
                  className={`h-full bg-white/40`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ArmyOverview;
