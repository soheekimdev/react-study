/*
  0. UI 생성
  1. Action 객체 생성
  2. Reducer 함수 생성
  3. 상태 저장소(Store) 생성
  -------지금까지는 Redux 기능만 사용-------
  -------이제 React-Redux 사용할 것-------
  4. App 컴포넌트를 Provider로 감싸기 (main.jsx) => 이제 상태 연결됨
  5. useSelector 사용해서 상태 가져오기
  6. useDispatch로 Action 객체 전달하기(사용하기)
 */

import { useDispatch, useSelector } from 'react-redux';

// 1. Action 객체 생성
const increment = {
  type: 'increment',
};
const decrement = {
  type: 'decrement',
};

// 2. Reducer 함수 생성
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
};

// 3. 상태 저장소(Store) 생성
export const store = createStore(counterReducer); // 2번에서 만든 Reducer를 인자로 전달  *참고: createStore는 이제 사용할 수 없음

const App = () => {
  // 5. useSelector로 상태 가져오기
  const counter = useSelector((state) => state);
  // 6-1. useDispatch로 Action 객체 전달하기(사용하기) - useDispatch 함수를 변수에 저장
  const dispatch = useDispatch();

  return (
    // 0. UI 생성
    <>
      <div>Counter : {counter}</div>
      {/* 6-2. seDispatch로 Action 객체 전달하기(사용하기) - dispatch 함수의 인자로 Action 전달 */}
      <button onClick={() => dispatch(increment)}>+</button>
      <button onClick={() => dispatch(decrement)}>-</button>
    </>
  );
};

export default App;
