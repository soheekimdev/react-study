import './App.css';
import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

// 1. 액션 타입, 액션 생성자, 리듀서를 한 번에 생성
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment(state, action) {
      return (state += 1);
    },
    decrement(state, action) {
      return (state -= 1);
    },
  },
});

// 7. RTK thunk 사용해보기
const slowIncrementThunk = createAsyncThunk('counter/slowIncrement', (value, { dispatch }) => {
  setTimeout(() => {
    dispatch(counterSlice.actions.increment());
  }, 1000);
});

// 2. Store 생성
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// 3. main.jsx에서 Provider로 App 감싸고 store 연결
const App = () => {
  console.log(counterSlice);

  // 4. store에서 상태를 가져와서 사용
  const counter = useSelector((state) => state.counter);

  // 5. dispatch로 상태를 변경할 수 있는 함수 받기
  const dispatch = useDispatch();

  return (
    <>
      <div>Counter: {counter}</div>
      {/* 6. dispatch 함수를 사용해서 상태 변경 */}
      <button
        onClick={() => {
          dispatch(counterSlice.actions.increment());
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch(counterSlice.actions.decrement());
        }}
      >
        -
      </button>

      {/* 8. RTK thunk 사용해보기 */}
      <button
        onClick={() => {
          dispatch(slowIncrementThunk());
        }}
      >
        slow +
      </button>
    </>
  );
};

export default App;
