import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from './pages/Main';
import Details from './pages/Details';
import Search from './pages/Search';
import { useState } from 'react';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  return (
    <>
      <header>
        <h1>💚 동물 조아 💚</h1>
        <input type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
        <button onClick={() => navigate(`/search?animal=${inputValue}`)}>검색</button>
      </header>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/search" element={<Search />} />
      </Routes>

      <footer>all rights reserved to OZ</footer>
    </>
  );
};

export default App;
