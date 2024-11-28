import { configureStore } from '@reduxjs/toolkit';
// import authSlice from '../Slicer/AuthSlice'; // Create this in step 1.2
import authSlice from '../Slicer/AuthSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
