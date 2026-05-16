import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCapitalRaidSeasons } from '../services/clanService';
import { Swords } from 'lucide-react';

const RaidStatsPage = () => {
  const { clanTag } = useParams();
  const [raids, setRaids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRaids = async () => {
      try {
        const data = await getCapitalRaidSeasons(clanTag);
        setRaids(data?.items || []);
        setError(null);
      } catch (err) {
        setRaids([]);
        setError(err.response?.data?.message || err.message || 'Failed to fetch raid stats.');
      } finally {
        setLoading(false);
      }
    };
    fetchRaids();
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

  return (
    <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop py-12">
      <div className="flex items-center gap-4 mb-8">
        <Swords className="text-secondary" size={32} />
        <h1 className="font-display-hero text-4xl text-white">Raid Weekend Intelligence</h1>
      </div>

      <div className="space-y-6">
        {raids.map((raid, i) => (
          <div key={i} className="glass-card p-8 rounded-2xl border border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="font-code-label text-xs text-on-surface-variant uppercase mb-1">Total Loot</div>
                <div className="font-stat-value text-2xl text-tertiary-container">{raid.capitalTotalLoot?.toLocaleString()}</div>
              </div>
              <div>
                <div className="font-code-label text-xs text-on-surface-variant uppercase mb-1">Raids Completed</div>
                <div className="font-stat-value text-2xl text-white">{raid.raidsCompleted}</div>
              </div>
              <div>
                <div className="font-code-label text-xs text-on-surface-variant uppercase mb-1">Total Attacks</div>
                <div className="font-stat-value text-2xl text-white">{raid.totalAttacks}</div>
              </div>
              <div>
                <div className="font-code-label text-xs text-on-surface-variant uppercase mb-1">Districts Destroyed</div>
                <div className="font-stat-value text-2xl text-secondary">{raid.enemyDistrictsDestroyed}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaidStatsPage;
