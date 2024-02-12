import { TCarForm } from '../../types';
import { RootState } from '../store';

export const selectCars = (state: RootState): Array<TCarForm> =>
  state.carStore.cars;
