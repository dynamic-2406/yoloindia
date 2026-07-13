import { BrowserRouter } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './components/ui/Toast';
import AppRoutes from './routes/AppRoutes';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </WishlistProvider>
    </BrowserRouter>
  );
}

export default App;
