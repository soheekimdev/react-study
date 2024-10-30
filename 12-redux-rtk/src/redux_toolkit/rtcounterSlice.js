import { createSlice } from '@reduxjs/toolkit';

// 초기값 세팅
const initialState = {
  value: 0,
};

// Slice 생성 (액션 + 액션 생성함수 + 리덕스)
const rtcounterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// 액션과 리듀서 export
export const { increment, decrement } = rtcounterSlice.actions;
export default rtcounterSlice.reducer;
