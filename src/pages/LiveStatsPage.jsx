import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, TrendingUp, Users, Target, Globe, ArrowUpRight, Trophy } from 'lucide-react';
import { getPlayerRankings } from '../services/rankingService';

const LiveStatsPage = () => {
  const [activeTab, setActiveTab] = useState('global');
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'global') {
      const fetchRankings = async () => {
        setLoading(true);
        try {
          const data = await getPlayerRankings();
          setRankings(data?.items || []);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchRankings();
    }
  }, [activeTab]);

  const liveFeeds = [
    { type: 'attack', player: 'Shadow_Strike', clan: 'Elite Killers', result: '3-Star', destruction: '100%', time: 'Just now' },
    { type: 'rank', player: 'Aether_King', clan: 'Vanguard Elite', change: '+12', trophies: '6,450', time: '2m ago' },
    { type: 'war', clanA: 'Nova Prime', clanB: 'Shadow Legion', stars: '45 - 42', time: '5m ago' },
    { type: 'attack', player: 'Blaze_Runner', clan: 'Inferno Kings', result: '2-Star', destruction: '88%', time: '8m ago' }
  ];

  return (
    <div className="flex flex-col w-full px-margin-mobile md:px-margin-desktop py-12 gap-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-headline-lg text-4xl text-white glow-text-cyan flex items-center gap-4">
            <Activity className="text-primary-container animate-pulse" size={40} />
            Global Live Intelligence
          </h1>
          <p className="text-on-surface-variant font-code-label uppercase tracking-widest mt-2">
            Real-time synchronization with Supercell Global Servers
          </p>
        </div>
        <div className="flex bg-surface-container rounded-xl p-1 border border-white/5">
          {['global', 'regional', 'local'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-code-label text-sm uppercase transition-all ${
                activeTab === tab ? 'bg-primary-container text-on-primary-container shadow-lg' : 'text-on-surface-variant hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Real-time Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-bento-gap">
        
        {/* Main Content Area (8 columns) */}
        <section className="lg:col-span-8 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-white/5 h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline-lg text-xl text-white flex items-center gap-2">
                {activeTab === 'global' ? (
                  <><Trophy size={20} className="text-primary-container" /> Global Leaderboard</>
                ) : (
                  <><Zap size={20} className="text-secondary" /> Activity Stream</>
                )}
              </h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-primary-container/10 text-primary-container rounded-full text-[10px] font-bold uppercase animate-pulse">
                <span className="w-1.5 h-1.5 bg-primary-container rounded-full"></span> Live
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-10 h-10 border-4 border-primary-container border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : activeTab === 'global' ? (
              <div className="space-y-2">
                <div className="grid grid-cols-12 px-5 py-2 font-code-label text-[10px] text-on-surface-variant uppercase tracking-widest border-b border-white/5">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-6">Player</div>
                  <div className="col-span-3">Clan</div>
                  <div className="col-span-2 text-right">Trophies</div>
                </div>
                {rankings.slice(0, 10).map((player, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="grid grid-cols-12 items-center p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <div className="col-span-1 font-stat-value text-primary-container">{player.rank}</div>
                    <div className="col-span-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center font-bold text-white border border-white/10">
                        {player.name[0]}
                      </div>
                      <span className="text-sm font-headline-lg text-white group-hover:text-primary-container transition-colors">{player.name}</span>
                    </div>
                    <div className="col-span-3 text-xs text-on-surface-variant font-body-main truncate pr-2">
                      {player.clan?.name || 'No Clan'}
                    </div>
                    <div className="col-span-2 text-right font-stat-value text-white">{player.trophies}</div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {liveFeeds.map((feed, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        feed.type === 'attack' ? 'bg-error/20 text-error' :
                        feed.type === 'rank' ? 'bg-primary-container/20 text-primary-container' :
                        'bg-secondary/20 text-secondary'
                      }`}>
                        {feed.type === 'attack' ? <Target size={24} /> :
                         feed.type === 'rank' ? <TrendingUp size={24} /> :
                         <Activity size={24} />}
                      </div>
                      <div>
                        <div className="font-headline-lg text-white group-hover:text-primary-container transition-colors">
                          {feed.type === 'attack' ? `${feed.player} attacked` :
                           feed.type === 'rank' ? `${feed.player} rank update` :
                           `${feed.clanA} vs ${feed.clanB}`}
                        </div>
                        <div className="text-on-surface-variant font-code-label text-xs uppercase tracking-tighter">
                          {feed.type === 'attack' ? `${feed.result} • ${feed.destruction} destruction` :
                           feed.type === 'rank' ? `Ranked up ${feed.change} points` :
                           `Score: ${feed.stars}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-on-surface-variant font-code-label text-[10px] uppercase mb-1">{feed.time}</div>
                      <div className="text-white font-code-label text-xs">{feed.clan || 'War Event'}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            <button className="w-full mt-8 py-3 text-on-surface-variant font-code-label text-xs uppercase hover:text-white transition-all">
              {activeTab === 'global' ? 'View Full Rankings' : 'Load More Activity'}
            </button>
          </div>
        </section>

        {/* Sidebar Analytics (4 columns) */}
        <section className="lg:col-span-4 space-y-gutter">
          {/* Global Multiplier */}
          <div className="glass-card p-8 rounded-2xl border-t-2 border-primary-container bg-gradient-to-br from-primary-container/10 to-transparent">
            <h3 className="font-headline-lg text-lg text-white mb-6">Global Pulse</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-[10px] font-code-label text-on-surface-variant uppercase">Online Players</div>
                <div className="font-stat-value text-2xl text-primary-container">425.2k</div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-code-label text-on-surface-variant uppercase">Attacks/Sec</div>
                <div className="font-stat-value text-2xl text-secondary">842</div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs font-body-main text-on-surface-variant flex items-center gap-2">
                <Globe size={14} /> Server Latency
              </div>
              <div className="text-xs font-code-label text-primary-container">12ms</div>
            </div>
          </div>

          {/* Top Gainers */}
          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <h3 className="font-headline-lg text-lg text-white mb-6 flex items-center gap-2">
              <ArrowUpRight size={20} className="text-primary-container" /> Top Gainers
            </h3>
            <div className="space-y-5">
              {[
                { name: 'Dr. Chaos', gain: '+45', color: 'text-primary-container' },
                { name: 'X-Legion', gain: '+38', color: 'text-primary-container' },
                { name: 'Shadow', gain: '+32', color: 'text-primary-container' }
              ].map((p, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-sm font-body-main text-on-surface">{p.name}</span>
                  <span className={`font-stat-value text-sm ${p.color}`}>{p.gain}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Warnings */}
          <div className="glass-card p-6 rounded-2xl border border-error/20 bg-error/5">
            <h3 className="font-headline-lg text-sm text-error mb-4 uppercase tracking-widest flex items-center gap-2">
              <Target size={16} /> Server Events
            </h3>
            <p className="text-xs text-on-surface-variant font-body-main leading-relaxed">
              Maintenance break scheduled for TH16 Balance Update in <span className="text-white font-bold">2h 45m</span>. Prepare for shield activation.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default LiveStatsPage;
