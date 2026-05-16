import React from 'react';
import { motion } from 'framer-motion';
import { getEquipmentImage } from '../../utils/imageMapper';

const EquipmentSection = ({ equipment }) => {
  if (!equipment || equipment.length === 0) return null;

  return (
    <div className="mb-12">
      <h3 className="font-display-hero text-2xl text-white mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30">
          ⚔️
        </span>
        Hero Equipment
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {equipment.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card p-4 rounded-xl border border-white/5 flex items-center gap-4 hover:border-yellow-500/30 transition-all"
          >
            <div className="w-12 h-12 bg-surface-container rounded-lg p-2 flex-shrink-0 border border-white/5">
              <img 
                src={getEquipmentImage(item.name)} 
                alt={item.name}
                className="w-full h-full object-contain"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=' + item.name[0]; }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-white font-medium text-xs truncate">{item.name}</h4>
              <p className="text-[10px] text-on-surface-variant/70 uppercase tracking-wider mt-0.5">Lvl {item.level} / {item.maxLevel}</p>
            </div>
            {item.level === item.maxLevel && (
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]"></div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentSection;
