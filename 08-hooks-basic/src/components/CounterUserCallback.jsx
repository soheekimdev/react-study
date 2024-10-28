import React, { useState, useCallback } from 'react';

// 자식 컴포넌트
const CounterButton = React.memo(({ onClick, count }) => {
  console.log('자식 컴포넌트 1 렌더링');
  return <button onClick={onClick}>자식 컴포넌트 1의 상태값 변경: {count}</button>;
});

const CounterButton2 = ({ onClick, count }) => {
  console.log('자식 컴포넌트 2 렌더링');
  return <button onClick={onClick}>자식 컴포넌트 2의 상태값 변경: {count}</button>;
};

// 부모 컴포넌트
const CounterUserCallback = () => {
  console.log('부모 컴포넌트 렌더링');

  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);

  // useCallback을 이용해서 handleClick 함수를 재사용
  const handleClick = useCallback(() => {
    console.log('handleClick 호출');

    setCount((prevCount) => prevCount + 1);
  }, []); // 의존성 배열이 빈 배열이므로 처음 렌더링 시에만 생성됨

  // 다른 상태 변경 함수
  const handleOtherStateChange = () => {
    console.log('handleOtherStateChange 호출');
    setNumber((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <CounterButton onClick={handleClick} count={count} />
      <br />
      <CounterButton2 onClick={handleClick} count={count} />
      <br />
      <button onClick={handleOtherStateChange}>부모 컴포넌트의 상태값 변경: {number}</button>
    </div>
  );
};

export default CounterUserCallback;
