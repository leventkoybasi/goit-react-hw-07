import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
//Modern Normalize
import 'modern-normalize/modern-normalize.css';
//Redux Provider
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </StrictMode>
);
