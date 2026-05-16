import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getClan, getClanMembers } from '../services/clanService';
import { Users, Shield, Trophy, Target, ArrowRight } from 'lucide-react';

const ClanPage = () => {
  const { clanTag } = useParams();
  const [clan, setClan] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clanData = await getClan(clanTag);
        const membersData = await getClanMembers(clanTag);
        setClan(clanData);
        setMembers(membersData?.items || []);
        setError(null);
      } catch (err) {
        setClan(null);
        setMembers([]);
        setError(err.response?.data?.message || err.message || 'Failed to fetch clan data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [clanTag]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-16 h-16 border-4 border-primary-container border-t-transparent rounded-full animate-spin"></div></div>;

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
            <li>Restart your Vite dev server.</li>
          </ol>
        </div>
      </div>
    );
  }

  if (!clan) return null;

  return (
    <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-3xl p-8 mb-8 border border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="font-display-hero text-4xl text-white mb-2">{clan.name}</h1>
            <div className="flex gap-4">
              <span className="px-3 py-1 bg-white/5 rounded-full font-code-label text-xs text-on-surface-variant border border-white/10">{clan.tag}</span>
              <span className="px-3 py-1 bg-primary-container/10 rounded-full font-code-label text-xs text-primary-container border border-primary-container/20">Lvl {clan.clanLevel}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <Link to={`/clan/${encodeURIComponent(clanTag)}/war`} className="px-6 py-3 bg-secondary/20 hover:bg-secondary/30 text-secondary rounded-xl font-code-label flex items-center gap-2 transition-all">
              <Target size={18} /> Live War
            </Link>
            <Link to={`/clan/${encodeURIComponent(clanTag)}/war-history`} className="px-6 py-3 bg-surface-container-high hover:bg-white/10 text-white rounded-xl font-code-label flex items-center gap-2 transition-all">
              <Shield size={18} /> War Log
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <Trophy className="text-tertiary-container" size={32} />
          <div>
            <div className="font-code-label text-xs text-on-surface-variant uppercase">Clan Points</div>
            <div className="font-stat-value text-2xl text-white">{clan.clanPoints}</div>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <Shield className="text-secondary" size={32} />
          <div>
            <div className="font-code-label text-xs text-on-surface-variant uppercase">War Wins</div>
            <div className="font-stat-value text-2xl text-white">{clan.warWins}</div>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <Users className="text-primary-container" size={32} />
          <div>
            <div className="font-code-label text-xs text-on-surface-variant uppercase">Members</div>
            <div className="font-stat-value text-2xl text-white">{members.length}/50</div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
        <table className="w-full text-left font-body-main">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="p-4 font-code-label text-on-surface-variant uppercase tracking-widest text-xs">Name</th>
              <th className="p-4 font-code-label text-on-surface-variant uppercase tracking-widest text-xs">Role</th>
              <th className="p-4 font-code-label text-on-surface-variant uppercase tracking-widest text-xs">Trophies</th>
              <th className="p-4 font-code-label text-on-surface-variant uppercase tracking-widest text-xs">Donations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {members.map((m, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="p-4 text-white">{m.name}</td>
                <td className="p-4 text-on-surface-variant capitalize">{m.role}</td>
                <td className="p-4 font-stat-value text-primary-container">{m.trophies}</td>
                <td className="p-4 font-stat-value text-secondary">{m.donations}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClanPage;
