import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App, { store } from './App.jsx';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 4. App 컴포넌트를 Provider로 감싸기 */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
