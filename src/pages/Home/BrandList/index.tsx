import React from 'react';
import { SelectedCarContext } from '../../../app';
import clsx from 'clsx';
import { staticData } from '../../input-values';

const BrandList = () => {
  const { selectedCar, setSelectedCar } = React.useContext(SelectedCarContext);

  return (
    <div className="grid grid-cols-5 justify-center gap-4">
      {staticData.brand.map((b) => (
        <button
          key={b.id}
          onClick={() => setSelectedCar(b.name)}
          tabIndex={0}
          className={clsx(
            'flex transform cursor-pointer flex-col items-center justify-center rounded-md  bg-white p-2 shadow-sm ring-2 ring-zinc-300 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-blue-600 focus:outline-none',
            { 'bg-blue-50 ring-2 ring-blue-500': selectedCar === b.name },
          )}
        >
          <img src={b.logo} alt={`${b.name} Logo`} className="h-fit w-16" />
          <p>{b.name}</p>
        </button>
      ))}
    </div>
  );
};

export default BrandList;
