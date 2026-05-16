import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCurrentWar } from '../services/clanService';
import { Shield, Target, Clock, Zap } from 'lucide-react';

const WarPage = () => {
  const { clanTag } = useParams();
  const [war, setWar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWar = async () => {
      try {
        const data = await getCurrentWar(clanTag);
        setWar(data);
        setError(null);
      } catch (err) {
        setWar(null);
        setError(err.response?.data?.message || err.message || 'Failed to fetch war data.');
      } finally {
        setLoading(false);
      }
    };
    fetchWar();
  }, [clanTag]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-16 h-16 border-4 border-primary-container border-t-transparent rounded-full animate-spin"></div></div>;

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop py-12 text-center">
        <h2 className="font-headline-lg text-2xl text-error mb-4">API Fetch Error</h2>
        <p className="font-body-main text-on-surface-variant mb-4">{error}</p>
      </div>
    );
  }

  if (!war) return null;

  return (
    <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop py-12">
      <div className="flex items-center gap-4 mb-8">
        <Zap className="text-primary-container" size={32} />
        <h1 className="font-display-hero text-4xl text-white">Live War Tracker</h1>
      </div>

      {war.state === 'inWar' ? (
        <div className="glass-card rounded-3xl p-8 border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-center mb-12 relative z-10">
            <div className="text-center flex-1">
              <h2 className="font-headline-lg text-2xl text-white mb-2">{war.clan.name}</h2>
              <div className="font-stat-value text-5xl text-primary-container mb-2">{war.clan.stars}</div>
              <div className="font-code-label text-on-surface-variant uppercase text-xs">{war.clan.destructionPercentage}% Destruction</div>
            </div>
            
            <div className="px-6 flex flex-col items-center">
              <span className="font-display-hero text-3xl text-white/20 mb-2">VS</span>
              <span className="px-4 py-1 bg-error/20 text-error border border-error/30 rounded-full font-code-label text-xs animate-pulse flex items-center gap-2">
                <Clock size={12} /> Live
              </span>
            </div>

            <div className="text-center flex-1">
              <h2 className="font-headline-lg text-2xl text-white mb-2">{war.opponent.name}</h2>
              <div className="font-stat-value text-5xl text-secondary mb-2">{war.opponent.stars}</div>
              <div className="font-code-label text-on-surface-variant uppercase text-xs">{war.opponent.destructionPercentage}% Destruction</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl text-center border border-white/5">
              <div className="font-code-label text-xs text-on-surface-variant mb-1">OUR ATTACKS</div>
              <div className="font-stat-value text-xl text-white">{war.clan.attacks} / {war.teamSize}</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl text-center border border-white/5">
              <div className="font-code-label text-xs text-on-surface-variant mb-1">ENEMY ATTACKS</div>
              <div className="font-stat-value text-xl text-white">{war.opponent.attacks} / {war.teamSize}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card p-12 text-center rounded-3xl">
          <Shield className="mx-auto text-on-surface-variant mb-4" size={48} />
          <h2 className="text-white font-headline-lg text-2xl">No Active War</h2>
        </div>
      )}
    </div>
  );
};

export default WarPage;
