import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Users, Zap, TrendingUp, Shield, Activity } from 'lucide-react';
import { getPlayerRankings } from '../services/rankingService';

const Home = () => {
  const navigate = useNavigate();
  const [playerTag, setPlayerTag] = useState('');
  const [clanTag, setClanTag] = useState('');
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const data = await getPlayerRankings();
        setRankings(data?.items?.slice(0, 3) || []);
        setError(null);
      } catch (err) {
        setRankings([]);
        setError(err.response?.data?.message || err.message || 'Failed to fetch rankings.');
      } finally {
        setLoading(false);
      }
    };
    fetchRankings();
  }, []);

  const handlePlayerSearch = (e) => {
    e.preventDefault();
    if (playerTag) navigate(`/player/${encodeURIComponent(playerTag)}`);
  };

  const handleClanSearch = (e) => {
    e.preventDefault();
    if (clanTag) navigate(`/clan/${encodeURIComponent(clanTag)}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop overflow-hidden">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0 flex items-center justify-center"
        >
          <div className="w-[800px] h-[800px] bg-primary-container/20 rounded-full blur-[100px] animate-pulse"></div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center max-w-5xl space-y-8"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary-container/10 border border-primary-container/20 text-primary-container font-code-label text-code-label uppercase"
          >
            <Zap size={16} /> Advanced Combat Analytics Engine
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="font-display-hero text-headline-lg-mobile md:text-display-hero tracking-tighter text-white"
          >
            Track, Analyze and <br/>
            <span className="cyber-gradient-text">Dominate Your Performance</span>
          </motion.h1>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-4 mt-12 w-full max-w-4xl mx-auto"
          >
            <form onSubmit={handlePlayerSearch} className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary-container transition-colors" size={20} />
              <input 
                value={playerTag}
                onChange={(e) => setPlayerTag(e.target.value)}
                className="w-full h-14 bg-surface-container/60 backdrop-blur-md border border-white/10 rounded-xl pl-12 pr-4 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container text-white placeholder:text-on-surface-variant/50 transition-all font-body-main" 
                placeholder="Enter Player Tag #..." 
              />
            </form>
            <form onSubmit={handleClanSearch} className="flex-1 relative group">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary-container transition-colors" size={20} />
              <input 
                value={clanTag}
                onChange={(e) => setClanTag(e.target.value)}
                className="w-full h-14 bg-surface-container/60 backdrop-blur-md border border-white/10 rounded-xl pl-12 pr-4 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container text-white placeholder:text-on-surface-variant/50 transition-all font-body-main" 
                placeholder="Enter Clan Tag #..." 
              />
            </form>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Bento Grid */}
      <section className="px-margin-mobile md:px-margin-desktop py-20 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-headline-lg text-3xl md:text-headline-lg text-white mb-2">Tactical Intelligence</h2>
            <p className="text-on-surface-variant max-w-xl font-body-main">Harness industrial-grade data streams to optimize every troop placement and spell duration.</p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-gutter h-full"
          >
            {[
              { icon: Activity, title: 'Live Stats', desc: 'Real-time data synchronization with Global Servers.', color: 'text-primary-container', border: 'border-primary-container/20', path: '/live-stats' },
              { icon: TrendingUp, title: 'Army Meta', desc: 'Deep-dive into hit-rate percentages by Town Hall level.', color: 'text-secondary', border: 'border-secondary/20', path: '/army-meta' },
              { icon: Shield, title: 'Clan War', desc: 'Access comprehensive war logs and strategic analysis.', color: 'text-tertiary-container', border: 'border-tertiary-container/20', path: '/clan-war' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(feature.path)}
                className={`glass-card p-8 rounded-xl flex flex-col justify-between border-t ${feature.border} hover:shadow-[0_0_40px_rgba(0,219,231,0.15)] transition-all cursor-pointer`}
              >
                <div>
                  <feature.icon className={`w-10 h-10 ${feature.color} mb-6`} />
                  <h3 className="font-headline-lg text-xl text-white mb-4">{feature.title}</h3>
                  <p className="text-on-surface-variant font-body-main text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Global Elite Rankings */}
      <section className="px-margin-mobile md:px-margin-desktop py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6"
          >
            <div>
              <h2 className="font-headline-lg text-3xl md:text-headline-lg text-white mb-2">Global Elite Ranking</h2>
              <p className="text-on-surface-variant font-body-main">Current top performers in the Legend League ecosystem.</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl overflow-hidden border border-white/5"
          >
            <table className="w-full text-left font-body-main">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-6 font-code-label text-on-surface-variant uppercase tracking-widest text-xs">Rank</th>
                  <th className="p-6 font-code-label text-on-surface-variant uppercase tracking-widest text-xs">Player</th>
                  <th className="p-6 font-code-label text-on-surface-variant uppercase tracking-widest text-xs">Trophies</th>
                  <th className="p-6 font-code-label text-on-surface-variant uppercase tracking-widest text-xs">Clan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {error ? (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-error font-body-main">
                      <p className="mb-2">API Authentication Error: {error}</p>
                      <p className="text-sm text-on-surface-variant">Please provide a valid VITE_COC_API_TOKEN in your .env file.</p>
                    </td>
                  </tr>
                ) : rankings.map((player, i) => (
                  <motion.tr 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="hover:bg-white/5 transition-colors group cursor-pointer" 
                    onClick={() => navigate(`/player/${encodeURIComponent(player.tag || player.name)}`)}
                  >
                    <td className="p-6">
                      <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-stat-value text-sm text-primary-container border border-primary-container/30">
                        {player.rank || i + 1}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className="font-headline-lg text-lg text-white group-hover:text-primary-container transition-colors">{player.name}</span>
                    </td>
                    <td className="p-6">
                      <span className="font-stat-value text-xl text-primary-container">{player.trophies}</span>
                    </td>
                    <td className="p-6">
                      <span className="text-on-surface-variant font-code-label">{player.clan?.name || 'No Clan'}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
