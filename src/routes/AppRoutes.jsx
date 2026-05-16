import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import PlayerPage from '../pages/PlayerPage';
import ClanPage from '../pages/ClanPage';
import WarPage from '../pages/WarPage';
import WarHistoryPage from '../pages/WarHistoryPage';
import RaidStatsPage from '../pages/RaidStatsPage';
import ArmyMetaPage from '../pages/ArmyMetaPage';
import ClanWarPage from '../pages/ClanWarPage';
import LiveStatsPage from '../pages/LiveStatsPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="player/:playerTag" element={<PlayerPage />} />
          <Route path="clan/:clanTag" element={<ClanPage />} />
          <Route path="clan/:clanTag/war" element={<WarPage />} />
          <Route path="clan/:clanTag/war-history" element={<WarHistoryPage />} />
          <Route path="clan/:clanTag/raid" element={<RaidStatsPage />} />
          <Route path="army-meta" element={<ArmyMetaPage />} />
          <Route path="clan-war" element={<ClanWarPage />} />
          <Route path="live-stats" element={<LiveStatsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
