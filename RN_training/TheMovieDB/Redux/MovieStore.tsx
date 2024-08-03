import {configureStore} from '@reduxjs/toolkit';
import {MovieReducer} from './MovieSlice';
export const MovieStore = configureStore({
  reducer: {MovieReducer},
});
export type RootState = ReturnType<typeof MovieStore.getState>;
export type AppDispatch = typeof MovieStore.dispatch;
