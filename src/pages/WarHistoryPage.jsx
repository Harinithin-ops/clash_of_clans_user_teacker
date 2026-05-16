import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getWarLog } from '../services/clanService';
import { Shield, CheckCircle, XCircle } from 'lucide-react';

const WarHistoryPage = () => {
  const { clanTag } = useParams();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const data = await getWarLog(clanTag);
        setLogs(data?.items || []);
        setError(null);
      } catch (err) {
        setLogs([]);
        setError(err.response?.data?.message || err.message || 'Failed to fetch war history data.');
      } finally {
        setLoading(false);
      }
    };
    fetchLog();
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
        <Shield className="text-tertiary-container" size={32} />
        <h1 className="font-display-hero text-4xl text-white">Historical War Logs</h1>
      </div>

      <div className="space-y-4">
        {logs.map((log, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl flex items-center justify-between border border-white/5 hover:bg-white/5 transition-all">
            <div className="flex items-center gap-4">
              {log.result === 'win' ? <CheckCircle className="text-primary-container" size={24} /> : <XCircle className="text-error" size={24} />}
              <div>
                <div className="text-white font-headline-lg text-lg">vs {log.opponent.name}</div>
                <div className="text-on-surface-variant font-code-label text-xs">Size: {log.teamSize}v{log.teamSize}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-stat-value text-xl text-white">{log.clan.stars} - {log.opponent.stars}</div>
              <div className="text-primary-container font-code-label text-xs">{log.clan.destructionPercentage}% Dest</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WarHistoryPage;
