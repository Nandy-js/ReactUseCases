import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import carSlice from './cars/slice';

export const store = configureStore({
  reducer: {
    carStore: carSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
