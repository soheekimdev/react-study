import { configureStore } from '@reduxjs/toolkit';
import rtcounterSlice from './rtcounterSlice';

export const store = configureStore({
  reducer: {
    rtcounter: rtcounterSlice, //reducer 등록
  },
});

export default store;
