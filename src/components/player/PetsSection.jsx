import React from 'react';
import { motion } from 'framer-motion';
import { getPetImage, petList } from '../../utils/imageMapper';

const PetsSection = ({ troops }) => {
  const pets = troops?.filter(t => petList.includes(t.name)) || [];
  
  if (pets.length === 0) return null;

  return (
    <div className="mb-12">
      <h3 className="font-display-hero text-2xl text-white mb-6 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center border border-secondary/30">
          🐾
        </span>
        Pets
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {pets.map((pet, index) => (
          <motion.div
            key={pet.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="glass-card p-4 rounded-xl border border-white/5 hover:border-secondary/40 transition-all group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-4 relative">
                <div className="absolute inset-0 bg-secondary/10 rounded-full blur-xl group-hover:bg-secondary/20 transition-all"></div>
                <img 
                  src={getPetImage(pet.name)} 
                  alt={pet.name}
                  className="w-full h-full object-contain relative z-10"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=' + pet.name[0]; }}
                />
              </div>
              <h4 className="text-white font-headline-sm text-sm mb-1">{pet.name}</h4>
              <p className="text-on-surface-variant text-xs mb-3">Level {pet.level} / {pet.maxLevel}</p>
              
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(pet.level / pet.maxLevel) * 100}%` }}
                  className="h-full bg-secondary shadow-[0_0_8px_rgba(244,114,182,0.5)]"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PetsSection;
