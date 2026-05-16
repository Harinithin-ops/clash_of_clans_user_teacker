import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../../services/SettingsContext';

const SettingsModal = ({ isOpen, onClose }) => {
  const { settings, updateSetting } = useSettings();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2147483646] flex justify-center items-start pt-12 md:pt-20 p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-surface/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg glass-card rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_80px_rgba(0,242,255,0.15)] flex flex-col max-h-[80vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary animate-pulse">settings</span>
              <h2 className="text-xl font-display-hero text-primary cyber-gradient-text uppercase tracking-[0.2em]">
                System Core
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-on-surface-variant hover:text-primary transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-8 space-y-10 overflow-y-auto custom-scrollbar min-h-0">
            {/* Audio Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
                <h3 className="text-[10px] font-code-label text-on-surface-variant uppercase tracking-widest px-4 py-1 rounded-full border border-white/5 bg-white/5">
                  Audio Modulation
                </h3>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Ambient Music</span>
                    <span className="text-[10px] text-on-surface-variant">Cinematic background tracks</span>
                  </div>
                  <Toggle 
                    checked={settings.musicEnabled} 
                    onChange={(val) => updateSetting('musicEnabled', val)} 
                  />
                </div>
                
                <div className="flex flex-col p-4 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex justify-between text-[10px] font-code-label text-on-surface-variant">
                    <span>OUTPUT GAIN</span>
                    <span className="text-primary font-bold">{settings.volume}%</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    value={settings.volume}
                    onChange={(e) => updateSetting('volume', parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>
            </section>

            {/* Visual Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
                <h3 className="text-[10px] font-code-label text-on-surface-variant uppercase tracking-widest px-4 py-1 rounded-full border border-white/5 bg-white/5">
                  Interface Matrix
                </h3>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Visual FX</span>
                    <span className="text-[10px] text-on-surface-variant">Advanced glass & blur effects</span>
                  </div>
                  <Toggle 
                    checked={!settings.performanceMode} 
                    onChange={(val) => updateSetting('performanceMode', !val)} 
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Cyber Cursor</span>
                    <span className="text-[10px] text-on-surface-variant">Interactive custom pointer</span>
                  </div>
                  <Toggle 
                    checked={settings.customCursor} 
                    onChange={(val) => updateSetting('customCursor', val)} 
                  />
                </div>
              </div>
            </section>

            {/* Data Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
                <h3 className="text-[10px] font-code-label text-on-surface-variant uppercase tracking-widest px-4 py-1 rounded-full border border-white/5 bg-white/5">
                  Neural Sync
                </h3>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
              </div>
              
              <div className="flex flex-col p-4 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                <span className="text-sm font-medium">Data Synchronization Frequency</span>
                <div className="grid grid-cols-3 gap-3">
                  {['5s', '30s', '1m'].map((time) => (
                    <button 
                      key={time}
                      onClick={() => updateSetting('refreshInterval', time)}
                      className={`py-3 text-[10px] font-code-label rounded-xl border transition-all cursor-pointer ${
                        settings.refreshInterval === time 
                          ? 'border-primary bg-primary/20 text-primary shadow-[0_0_20px_rgba(0,242,255,0.2)]' 
                          : 'border-white/10 text-on-surface-variant hover:bg-white/5'
                      }`}
                    >
                      {time === '5s' ? 'FAST' : time === '30s' ? 'BALANCED' : 'STABLE'}
                      <div className="mt-1 opacity-60">({time})</div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="p-6 bg-white/5 border-t border-white/10 flex justify-between items-center">
            <span className="text-[10px] font-code-label text-on-surface-variant uppercase tracking-tighter">
              v1.0.4-production // system stable
            </span>
            <div className="flex gap-4">
              <button 
                onClick={onClose}
                className="px-8 py-2.5 bg-primary/20 text-primary border border-primary/40 rounded-xl text-xs font-code-label hover:bg-primary/30 transition-all shadow-[0_0_30px_rgba(0,242,255,0.1)] active:scale-95 cursor-pointer"
              >
                CLOSE CONFIG
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const Toggle = ({ checked, onChange }) => (
  <button 
    onClick={() => onChange(!checked)}
    className={`w-12 h-6 rounded-full relative transition-all cursor-pointer ${
      checked ? 'bg-primary shadow-[0_0_15px_rgba(0,242,255,0.4)]' : 'bg-white/10'
    }`}
  >
    <motion.div 
      initial={false}
      animate={{ 
        x: checked ? 26 : 4,
        scale: checked ? 1.1 : 1
      }}
      className={`absolute top-1 w-4 h-4 rounded-full ${checked ? 'bg-white' : 'bg-on-surface-variant'} shadow-lg`}
    />
  </button>
);

export default SettingsModal;
