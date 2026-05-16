import AppRoutes from './routes/AppRoutes';
import { SettingsProvider } from './services/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <AppRoutes />
    </SettingsProvider>
  );
}

export default App;
