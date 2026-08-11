import { AppRouter } from './routes';
import { Toaster } from 'sonner';
import { AuthProvider } from './store/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
