import React from 'react';
import BrandList from './BrandList';
import CarDetailsForm from './CarDetailsForm';
import { SelectedCarContext } from '../../app';

const Home: React.FC = () => {
  const { selectedCar } = React.useContext(SelectedCarContext);
  return (
    <div>
      <BrandList />
      {selectedCar && <CarDetailsForm />}
    </div>
  );
};

export default Home;
