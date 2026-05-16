import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sword, Shield, Zap, TrendingUp, Search, History, Activity, Trophy } from 'lucide-react';

const ClanWarLandingPage = () => {
  const navigate = useNavigate();
  const [clanTag, setClanTag] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (clanTag) {
      const formattedTag = clanTag.startsWith('#') ? clanTag : `#${clanTag}`;
      navigate(`/clan/${encodeURIComponent(formattedTag)}/war`);
    }
  };

  const trendingWars = [
    { clan: 'Vanguard Elite', tag: '#2Y8RLPV9', streak: 12, league: 'Champion I' },
    { clan: 'Nova Prime', tag: '#LP9RR292', streak: 8, league: 'Master II' },
    { clan: 'Shadow Legion', tag: '#8RR9QL0P', streak: 15, league: 'Champion III' }
  ];

  return (
    <div className="flex flex-col w-full px-margin-mobile md:px-margin-desktop py-12 gap-12">
      {/* Hero Section */}
      <section className="relative glass-card rounded-3xl p-12 overflow-hidden border border-primary-container/20 shadow-[0_0_50px_rgba(0,219,231,0.1)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-primary-container/10 border border-primary-container/20 text-primary-container font-code-label text-xs uppercase"
          >
            <Zap size={14} /> Global War Intelligence Network
          </motion.div>
          <h1 className="font-display-hero text-4xl md:text-6xl text-white tracking-tight">
            Analyze Any Clan's <br/>
            <span className="cyber-gradient-text">War Performance</span>
          </h1>
          <p className="text-on-surface-variant font-body-main text-lg max-w-xl">
            Enter a clan tag to access live war tracking, historical performance data, and tactical combat analytics.
          </p>

          <form onSubmit={handleSearch} className="flex gap-4 max-w-md pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
              <input 
                value={clanTag}
                onChange={(e) => setClanTag(e.target.value)}
                placeholder="Enter Clan Tag #..."
                className="w-full h-14 bg-surface-container/60 backdrop-blur-md border border-white/10 rounded-xl pl-12 pr-4 focus:outline-none focus:border-primary-container transition-all text-white font-body-main"
              />
            </div>
            <button className="h-14 px-8 bg-primary-container text-on-primary-container rounded-xl font-code-label uppercase font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,219,231,0.3)]">
              Analyze
            </button>
          </form>
        </div>
      </section>

      {/* Analytics Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-bento-gap">
        {/* Left Stats Section */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-bento-gap">
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-card p-8 rounded-2xl border-t border-primary-container/20 flex flex-col gap-6"
          >
            <Activity className="text-primary-container" size={32} />
            <div>
              <h3 className="font-headline-lg text-xl text-white mb-2">Live Tracking</h3>
              <p className="text-on-surface-variant text-sm font-body-main">Monitor active wars in real-time with automatic star and destruction percentage updates.</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-card p-8 rounded-2xl border-t border-secondary/20 flex flex-col gap-6"
          >
            <History className="text-secondary" size={32} />
            <div>
              <h3 className="font-headline-lg text-xl text-white mb-2">Deep War Logs</h3>
              <p className="text-on-surface-variant text-sm font-body-main">Access historical war data to identify recurring patterns and improvement areas.</p>
            </div>
          </motion.div>

          {/* Trending Clans Table */}
          <div className="md:col-span-2 glass-card rounded-2xl overflow-hidden border border-white/5">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-headline-lg text-lg text-white">Elite War Clans</h3>
              <span className="text-[10px] font-code-label text-primary-container uppercase bg-primary-container/10 px-2 py-0.5 rounded border border-primary-container/20">Trending</span>
            </div>
            <table className="w-full text-left font-body-main">
              <tbody className="divide-y divide-white/5">
                {trendingWars.map((clan, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => navigate(`/clan/${encodeURIComponent(clan.tag)}/war`)}>
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-surface-container-high rounded-lg flex items-center justify-center font-bold text-primary-container">
                          {clan.clan[0]}
                        </div>
                        <div>
                          <div className="text-white font-headline-lg group-hover:text-primary-container transition-colors">{clan.clan}</div>
                          <div className="text-[10px] text-on-surface-variant font-code-label uppercase">{clan.tag}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="text-xs text-on-surface-variant font-code-label uppercase mb-1">League</div>
                      <div className="text-secondary font-stat-value text-sm">{clan.league}</div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="text-xs text-on-surface-variant font-code-label uppercase mb-1">Win Streak</div>
                      <div className="text-primary-container font-stat-value text-lg">{clan.streak}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Insights Section */}
        <div className="lg:col-span-4 space-y-gutter">
          <div className="glass-card p-8 rounded-2xl border border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent">
            <Trophy className="text-secondary mb-6" size={32} />
            <h3 className="font-headline-lg text-xl text-white mb-4">Pro War Insights</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-on-surface-variant font-body-main">Avg Destruction (Top 100)</span>
                <span className="font-stat-value text-primary-container text-lg">98.4%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-on-surface-variant font-body-main">TH16 3-Star Rate</span>
                <span className="font-stat-value text-secondary text-lg">14.2%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-on-surface-variant font-body-main">Most Used Strategy</span>
                <span className="font-stat-value text-white text-lg">Hydra</span>
              </div>
            </div>
            <p className="mt-6 text-xs text-on-surface-variant font-body-main italic leading-relaxed">
              "Competitive wars are currently decided by time. Maximizing destruction per second is the key differentiator in the Champion I meta."
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl relative overflow-hidden group cursor-pointer">
            <div className="relative z-10">
              <TrendingUp className="text-primary-container mb-4" size={24} />
              <h4 className="text-white font-headline-lg mb-2">War League Analysis</h4>
              <p className="text-on-surface-variant text-xs font-body-main mb-4">View deep statistics for the ongoing Clan War League season.</p>
              <div className="text-primary-container font-code-label text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Access Data <Shield size={10} />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-container/5 -skew-x-12 translate-x-1/2 group-hover:bg-primary-container/10 transition-all"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClanWarLandingPage;
