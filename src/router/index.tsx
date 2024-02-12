import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import SearchCar from '../pages/SearchCar';

export const APP_ROUTES = {
  home: '/',
  searchCar: '/search-cars',
};

export default function Router() {
  return useRoutes([
    {
      path: APP_ROUTES.home,
      element: <Home />,
    },
    {
      path: APP_ROUTES.searchCar,
      element: <SearchCar />,
    },
  ]);
}
