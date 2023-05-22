import { configureStore } from '@reduxjs/toolkit';
import tutorsReducer from '../slices/tutorSlice';
import reserveReducer from '../slices/reservationSlice';

const store = configureStore({
  reducer: {
    tutors: tutorsReducer,
    reserves: reserveReducer,
  },
});

export default store;
