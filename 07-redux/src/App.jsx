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
import combineReducers from '../../04-redux/node_modules/.pnpm/redux@5.0.1/node_modules/redux/src/combineReducers';

// 1. Action 객체 생성
const increment1 = {
  type: 'increment1',
};
const decrement1 = {
  type: 'decrement1',
};
const increment2 = {
  type: 'increment2',
};
const decrement2 = {
  type: 'decrement2',
};

// 2. Reducer 함수 생성
const counterReducer1 = (state = 0, action) => {
  switch (action.type) {
    case 'increment1':
      return state + 1;
    case 'decrement1':
      return state - 1;
    default:
      return state;
  }
};
const counterReducer2 = (state = 0, action) => {
  switch (action.type) {
    case 'increment2':
      return state + 1;
    case 'decrement2':
      return state - 1;
    default:
      return state;
  }
};

// 여러 개의 Reducer를 하나로 합치기
const rootReducer = combineReducers({ counterReducer1, counterReducer2 });

// 3. 상태 저장소(Store) 생성
export const store = createStore(rootReducer); // Reducer를 인자로 전달  *참고: createStore는 이제 사용할 수 없음

const App = () => {
  // 5. useSelector로 상태 가져오기
  const counter1 = useSelector((state) => state.counterReducer1);
  const counter2 = useSelector((state) => state.counterReducer2);

  // 6-1. useDispatch로 Action 객체 전달하기(사용하기) - useDispatch 함수를 변수에 저장
  const dispatch = useDispatch();

  return (
    // 0. UI 생성
    <>
      <div>Counter1 : {counter1}</div>
      {/* 6-2. seDispatch로 Action 객체 전달하기(사용하기) - dispatch 함수의 인자로 Action 전달 */}
      <button onClick={() => dispatch(increment1)}>+</button>
      <button onClick={() => dispatch(decrement1)}>-</button>

      <div>Counter2 : {counter2}</div>
      <button onClick={() => dispatch(increment2)}>+</button>
      <button onClick={() => dispatch(decrement2)}>-</button>
    </>
  );
};

export default App;
