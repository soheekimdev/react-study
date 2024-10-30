// Redux에서 관리할 상태 정의
const initialState = {
  count: 10,
};

// 1. Action
import { legacy_createStore } from 'redux';
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// 2. Action Creator
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

// 3. Reducer
function myReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}

// 4. Store
const store = legacy_createStore(myReducer);

// 5. Dispatch

// 6. Subscribe
store.subscribe(() => {
  const state = store.getState();
  console.log('상태가 변경되었습니다', state);
});

// 강제 디스패치
store.dispatch(increment());
store.dispatch(decrement());
