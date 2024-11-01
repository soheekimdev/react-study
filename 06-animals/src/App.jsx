import { lazy, Suspense, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
// import Main from './pages/Main';
// import Details from './pages/Details';
// import Search from './pages/Search';
const Main = lazy(() => import('./pages/Main'));
const Details = lazy(() => import('./pages/Details'));
const Search = lazy(() => import('./pages/Search'));

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  return (
    <>
      <header>
        <h1>💚 동물 조아 💚</h1>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
            navigate(`/search?animal=${event.target.value}`);
          }}
        />
        <button onClick={() => navigate(`/search?animal=${inputValue}`)}>검색</button>
      </header>

      <Suspense fallback={<h1>로딩 중...</h1>}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Suspense>

      <footer>all rights reserved to OZ</footer>
    </>
  );
};

export default App;
