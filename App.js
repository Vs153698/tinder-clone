
import { AuthProvider } from './hooks/useAuth';
import RootNavigation from './Navigation';

export default function App() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}


