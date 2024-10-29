import { createRoot } from 'react-dom/client';
import './index.css';
import App, { store } from './App.jsx';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  // 3. Provider로 App 감싸고 store 연결
  <Provider store={store}>
    <App />
  </Provider>
);
