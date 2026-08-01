import { HashRouter, Routes, Route } from 'react-router-dom';
import TopNavBar from './components/TopNavBar';
import DashboardPage from './pages/DashboardPage';
import EmergenciesPage from './pages/EmergenciesPage';
import TeamsPage from './pages/TeamsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DevicesPage from './pages/DevicesPage';

function App() {
  return (
    <HashRouter>
      <TopNavBar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/emergencies" element={<EmergenciesPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/devices" element={<DevicesPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;