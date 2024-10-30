import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';

function App() {
  const [number, setNumber] = useState(0);
  const [rerender, setRerender] = useState(false);

  // const plus1 = (number) => {
  //   console.log('plus1 실행됨');
  //   return number + 1;
  // };

  // useCallback 사용
  const plus1 = useCallback((number) => {
    console.log('plus1 실행됨');
    return number + 1;
  }, []);

  // const numberPlus1 = plus1(number);

  // useMemo 사용
  const numberPlus1 = useMemo(() => {
    return plus1(number);
  }, [number]);

  useEffect(() => {
    console.log('plus1 생성됨');
  }, [plus1]);

  return (
    <>
      <NumberDisplay number={number} />
      <div>numberPlus1: {numberPlus1}</div>
      <button onClick={() => setNumber(number + 1)}>number + 1</button>
      <button onClick={() => setRerender(!rerender)}>Rerender</button>
    </>
  );
}

const NumberDisplay = React.memo(function NumberDisplay({ number }) {
  console.log('NumberDisplay 렌더링');
  return <div>number: {number}</div>;
});

export default App;
