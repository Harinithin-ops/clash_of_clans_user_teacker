import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SortAsc, SortDesc } from 'lucide-react';
import { getTroopImage, petList, siegeList } from '../../utils/imageMapper';

const TroopsSection = ({ troops }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('level-desc');

  const filteredTroops = troops?.filter(t => 
    t.village === 'home' && 
    !petList.includes(t.name) && 
    !siegeList.includes(t.name) &&
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const sortedTroops = [...filteredTroops].sort((a, b) => {
    if (sortOrder === 'level-desc') return b.level - a.level;
    if (sortOrder === 'level-asc') return a.level - b.level;
    return a.name.localeCompare(b.name);
  });

  if (!troops) return null;

  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h3 className="font-display-hero text-2xl text-white flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-tertiary/20 flex items-center justify-center border border-tertiary/30">
            ⚔️
          </span>
          Home Troops
        </h3>
        
        <div className="flex gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search troops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-surface-container-low border border-white/5 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 w-full md:w-64 transition-all"
            />
          </div>
          
          <button 
            onClick={() => setSortOrder(sortOrder === 'level-desc' ? 'level-asc' : 'level-desc')}
            className="p-2 bg-surface-container-low border border-white/5 rounded-xl hover:bg-white/5 transition-all text-on-surface-variant"
            title="Sort by Level"
          >
            {sortOrder === 'level-desc' ? <SortDesc className="w-5 h-5" /> : <SortAsc className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <AnimatePresence mode='popLayout'>
          {sortedTroops.map((troop, index) => (
            <motion.div
              layout
              key={troop.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="glass-card p-3 rounded-xl border border-white/5 hover:bg-white/5 transition-all relative overflow-hidden group"
            >
              <div className="aspect-square mb-2 relative">
                <img 
                  src={getTroopImage(troop.name)} 
                  alt={troop.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=' + troop.name[0]; }}
                />
              </div>
              <div className="text-center">
                <div className="text-xs font-medium text-white truncate px-1">{troop.name}</div>
                <div className={`text-[10px] font-bold mt-1 ${troop.level === troop.maxLevel ? 'text-yellow-400' : 'text-on-surface-variant'}`}>
                  Lvl {troop.level}
                </div>
              </div>
              
              {troop.level === troop.maxLevel && (
                <div className="absolute top-1 right-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]"></div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TroopsSection;
