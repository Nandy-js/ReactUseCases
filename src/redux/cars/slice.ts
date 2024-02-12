import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCarForm } from '../../types';

export interface CarState {
  cars: Array<TCarForm>;
}

const initialState: CarState = {
  cars: [],
};

export const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addCar: (state, action: PayloadAction<TCarForm>) => {
      state.cars = [...state.cars, action.payload];
    },
    removeCar: (state, action: PayloadAction<string>) => {
      state.cars = state.cars.filter((car) => car.id !== action.payload);
    },
  },
});

export const { addCar, removeCar } = carSlice.actions;

export default carSlice.reducer;
