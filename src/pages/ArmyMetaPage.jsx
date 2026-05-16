import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sword, Shield, Zap, TrendingUp, Trophy, ChevronRight, Activity, Target } from 'lucide-react';

const ArmyMetaPage = () => {
  const [selectedTH, setSelectedTH] = useState(16);

  const thLevels = [16, 15, 14, 13, 12, 11];

  const metaStrategies = {
    16: [
      {
        name: 'Super Archer Blimp + Hydra',
        usage: '32.5%',
        winRate: '88.2%',
        avgStars: '2.84',
        difficulty: 'Expert',
        troops: [
          { name: 'Dragon', count: 6, icon: '🐉' },
          { name: 'Dragon Rider', count: 4, icon: '🛡️' },
          { name: 'Super Archer', count: 4, icon: '🏹' },
          { name: 'Balloon', count: 8, icon: '🎈' }
        ],
        description: 'High-risk, high-reward strategy focusing on core destruction with the blimp followed by a sweep.'
      },
      {
        name: 'Queen Charge Root Riders',
        usage: '28.1%',
        winRate: '85.4%',
        avgStars: '2.76',
        difficulty: 'Intermediate',
        troops: [
          { name: 'Root Rider', count: 8, icon: '🪵' },
          { name: 'Healer', count: 5, icon: '✨' },
          { name: 'Apprentice Warden', count: 1, icon: '📖' },
          { name: 'Super Wall Breaker', count: 4, icon: '💣' }
        ],
        description: 'Currently the most consistent strategy for 3-starring maxed TH16 bases.'
      },
      {
        name: 'Electro Titans Smash',
        usage: '15.4%',
        winRate: '82.1%',
        avgStars: '2.68',
        difficulty: 'Advanced',
        troops: [
          { name: 'Electro Titan', count: 5, icon: '⚡' },
          { name: 'Healer', count: 5, icon: '✨' },
          { name: 'Super Bowler', count: 2, icon: '💎' },
          { name: 'Ice Golem', count: 2, icon: '❄️' }
        ],
        description: 'Excellent for bases with tight compartments and high-density defensive clusters.'
      }
    ],
    15: [
      {
        name: 'Queen Walk Hybrid',
        usage: '25.5%',
        winRate: '84.2%',
        avgStars: '2.72',
        difficulty: 'Advanced',
        troops: [
          { name: 'Miner', count: 12, icon: '⛏️' },
          { name: 'Hog Rider', count: 14, icon: '🐷' },
          { name: 'Healer', count: 5, icon: '✨' }
        ],
        description: 'A classic strategy that remains highly effective for TH15.'
      }
    ]
  };

  const currentMeta = metaStrategies[selectedTH] || metaStrategies[16];

  return (
    <div className="flex flex-col w-full px-margin-mobile md:px-margin-desktop py-12 gap-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="font-headline-lg text-4xl md:text-5xl text-white glow-text-cyan mb-2">Army Meta Intelligence</h1>
          <p className="text-on-surface-variant font-code-label uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-primary-container rounded-full animate-pulse"></span>
            Real-time Global Combat Data Analysis
          </p>
        </motion.div>

        <div className="flex bg-surface-container rounded-xl p-1 border border-white/5">
          {thLevels.map((th) => (
            <button
              key={th}
              onClick={() => setSelectedTH(th)}
              className={`px-4 py-2 rounded-lg font-code-label text-sm transition-all ${
                selectedTH === th 
                ? 'bg-primary-container text-on-primary-container shadow-lg' 
                : 'text-on-surface-variant hover:text-white'
              }`}
            >
              TH{th}
            </button>
          ))}
        </div>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-bento-gap">
        {[
          { label: 'Total Attacks Analyzed', value: '1.2M+', icon: Activity, color: 'text-primary-container' },
          { label: 'Avg 3-Star Rate', value: '18.4%', icon: Target, color: 'text-secondary' },
          { label: 'Most Used Troop', value: 'Root Rider', icon: Sword, color: 'text-tertiary-container' },
          { label: 'Defensive Meta', value: 'Box Base', icon: Shield, color: 'text-error' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-2xl border-l-4 border-white/5 hover:border-white/20 transition-all"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-xs text-on-surface-variant font-code-label uppercase">{stat.label}</span>
            </div>
            <div className="font-stat-value text-2xl text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Content: Strategy List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Strategy List Column */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-headline-lg text-2xl text-white flex items-center gap-2">
            <Sword className="text-primary-container" /> Top Performing Strategies
          </h2>
          
          {currentMeta.map((strategy, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:border-primary-container/30 transition-all cursor-pointer"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      strategy.difficulty === 'Expert' ? 'bg-error/20 text-error border border-error/30' :
                      strategy.difficulty === 'Advanced' ? 'bg-secondary/20 text-secondary border border-secondary/30' :
                      'bg-primary-container/20 text-primary-container border border-primary-container/30'
                    }`}>
                      {strategy.difficulty}
                    </span>
                    <h3 className="font-headline-lg text-xl text-white group-hover:text-primary-container transition-colors">
                      {strategy.name}
                    </h3>
                  </div>
                  <p className="text-on-surface-variant text-sm font-body-main max-w-lg">
                    {strategy.description}
                  </p>
                  
                  {/* Army Composition */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {strategy.troops.map((troop, j) => (
                      <div key={j} className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container rounded-lg border border-white/5">
                        <span className="text-lg">{troop.icon}</span>
                        <span className="font-code-label text-xs text-white">x{troop.count}</span>
                        <span className="text-[10px] text-on-surface-variant uppercase">{troop.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex md:flex-col gap-6 md:gap-4 justify-between md:justify-center border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant uppercase font-code-label">Usage Rate</span>
                    <span className="font-stat-value text-xl text-primary-container">{strategy.usage}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant uppercase font-code-label">Win Rate</span>
                    <span className="font-stat-value text-xl text-secondary">{strategy.winRate}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant uppercase font-code-label">Avg Stars</span>
                    <span className="font-stat-value text-xl text-white">{strategy.avgStars}</span>
                  </div>
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-container/10 transition-all"></div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-gutter">
          <div className="glass-card p-6 rounded-2xl border border-secondary/20">
            <h3 className="font-headline-lg text-lg text-secondary mb-6 flex items-center gap-2">
              <TrendingUp size={20} /> Meta Trends
            </h3>
            <div className="space-y-6">
              {[
                { name: 'Root Rider Usage', trend: '+12.4%', up: true },
                { name: 'E-Dragon Spam', trend: '-8.2%', up: false },
                { name: 'Queen Charge Hybrid', trend: '+3.1%', up: true },
                { name: 'Lalo Effectiveness', trend: '-2.4%', up: false }
              ].map((trend, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-sm text-on-surface font-body-main">{trend.name}</span>
                  <span className={`font-code-label text-xs ${trend.up ? 'text-primary-container' : 'text-error'}`}>
                    {trend.trend} {trend.up ? '↑' : '↓'}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-xl bg-secondary/10 text-secondary border border-secondary/20 font-code-label text-xs uppercase hover:bg-secondary/20 transition-all">
              View Detailed Analytics
            </button>
          </div>

          <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-primary-container/5 to-secondary/5">
            <h3 className="font-headline-lg text-lg text-white mb-4">Pro Insight</h3>
            <p className="text-sm text-on-surface-variant font-body-main leading-relaxed italic">
              "The current TH16 meta is heavily favoring ground-based 'smash' attacks due to the increased HP pools of Root Riders and the synergy with the Apprentice Warden. Focus on multi-target infernos to counter."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-container border border-primary-container/30 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Elite+Analyst&background=0D1515&color=00f2ff" alt="Analyst" />
              </div>
              <span className="text-xs font-code-label text-primary-container uppercase">Elite Analyst Team</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArmyMetaPage;
