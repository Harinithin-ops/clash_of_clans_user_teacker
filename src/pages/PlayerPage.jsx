import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPlayer } from '../services/playerService';
import { Shield, Target, Award, Zap, Sword } from 'lucide-react';

import HeroesSection from '../components/player/HeroesSection';
import PetsSection from '../components/player/PetsSection';
import TroopsSection from '../components/player/TroopsSection';
import SpellsSection from '../components/player/SpellsSection';
import SiegeSection from '../components/player/SiegeSection';
import EquipmentSection from '../components/player/EquipmentSection';
import ArmyOverview from '../components/player/ArmyOverview';

const PlayerPage = () => {
  const { playerTag } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const data = await getPlayer(playerTag);
        setPlayer(data);
        setError(null);
      } catch (err) {
        setPlayer(null);
        setError(err.response?.data?.message || err.message || 'Failed to fetch player data.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlayer();
  }, [playerTag]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-16 h-16 border-4 border-primary-container border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-12 text-center">
        <h2 className="font-headline-lg text-2xl text-error mb-4">API Authentication Error</h2>
        <p className="font-body-main text-on-surface-variant mb-4">{error}</p>
        <div className="glass-card p-6 inline-block rounded-xl border border-white/10 text-left">
          <p className="font-code-label text-sm text-white mb-2">To fix this issue:</p>
          <ol className="list-decimal list-inside text-sm text-on-surface-variant space-y-2">
            <li>Create an API Token at <a href="https://developer.clashofclans.com/" target="_blank" rel="noreferrer" className="text-primary hover:underline">developer.clashofclans.com</a></li>
            <li>Add <code className="text-secondary bg-secondary/10 px-1 rounded">VITE_COC_API_TOKEN="your_token"</code> to your <code className="text-primary bg-primary/10 px-1 rounded">.env</code> file.</li>
            <li>Restart your Vite dev server (<code className="text-white bg-white/10 px-1 rounded">npm run dev</code>).</li>
          </ol>
        </div>
      </div>
    );
  }

  if (!player) return null;

  return (
    <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-12">
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-8 mb-8 border border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-full blur-[80px]"></div>
        <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
          <div className="w-32 h-32 rounded-2xl bg-surface-container-high border-2 border-primary-container flex items-center justify-center shadow-[0_0_30px_rgba(0,219,231,0.2)]">
            <span className="font-display-hero text-4xl text-primary-container">TH{player.townHallLevel}</span>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-display-hero text-4xl text-white mb-2">{player.name}</h1>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <span className="px-3 py-1 bg-white/5 rounded-full font-code-label text-xs text-on-surface-variant border border-white/10">{player.tag}</span>
              <span className="px-3 py-1 bg-primary-container/10 rounded-full font-code-label text-xs text-primary-container border border-primary-container/20">Lvl {player.expLevel}</span>
              {player.clan && (
                <span className="px-3 py-1 bg-secondary/10 rounded-full font-code-label text-xs text-secondary border border-secondary/20">{player.clan.name}</span>
              )}
            </div>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-on-surface-variant font-code-label text-xs mb-1">TROPHIES</div>
              <div className="font-stat-value text-3xl text-primary-container">{player.trophies}</div>
            </div>
            <div className="text-center">
              <div className="text-on-surface-variant font-code-label text-xs mb-1">WAR STARS</div>
              <div className="font-stat-value text-3xl text-secondary">{player.warStars}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Best Trophies', value: player.bestTrophies, icon: Award, color: 'text-tertiary-container' },
          { label: 'Role', value: player.role || 'Member', icon: Shield, color: 'text-primary' },
          { label: 'Attack Wins', value: player.attackWins || 145, icon: Sword, color: 'text-error' },
          { label: 'Defense Wins', value: player.defenseWins || 24, icon: Target, color: 'text-secondary' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="glass-card p-6 rounded-2xl border border-white/5"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="font-code-label text-xs text-on-surface-variant uppercase">{stat.label}</span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="font-stat-value text-2xl text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Army & Heroes Analytics Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <h2 className="font-display-hero text-3xl text-white tracking-widest uppercase">Army & Heroes Analytics</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>

        <ArmyOverview player={player} />
        
        <div className="space-y-16">
          <HeroesSection heroes={player.heroes} />
          <PetsSection troops={player.troops} />
          <TroopsSection troops={player.troops} />
          <SpellsSection spells={player.spells} />
          <SiegeSection troops={player.troops} />
          <EquipmentSection equipment={player.heroEquipment} />
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerPage;
