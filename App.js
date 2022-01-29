import { LogBox } from 'react-native';
import { AuthProvider } from './hooks/useAuth';
import RootNavigation from './Navigation';
LogBox.ignoreAllLogs() // temproray fix to get rid of all sord of warning
export default function App() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}


