import { useState, useEffect } from 'react';
import './App.css';
import UseEffect from './pages/UseEffect';
import UseRef from './pages/UseRef';
import CustomHook from './pages/CustomHook';

const App = () => {
  return (
    <>
      {/* <UseEffect /> */}
      {/* <UseRef /> */}
      <CustomHook />
    </>
  );
};

export default App;
