import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
// import './redux_basic/exercise.js';
// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './modules/root.js';
import { Provider } from 'react-redux';
import store from './redux_toolkit/rtStore.js';

// Store 등록
// const store = configureStore({
//   reducer: rootReducer,
// });

// console.log(('state = ', store.getState()));

createRoot(document.getElementById('root')).render(
  // 모든 컴포넌트가 Store의 state를 조회할 수 있도록 설정
  <Provider store={store}>
    <App />
  </Provider>
);
