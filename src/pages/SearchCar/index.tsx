import React, { useState } from 'react';
import Card from '../../components/Card';
import { staticData } from '../input-values';
import { Divider } from '../../components/Divider';
import { useSelector } from 'react-redux';
import { selectCars } from '../../redux/cars/selector';
import RenderCarItems from '../../components/CarItem';
import { TCarForm } from '../../types';

const SearchCar: React.FC = () => {
  const cars = useSelector(selectCars);

  const [filteredCars, setFilteredCars] = useState<TCarForm[]>();

  const [search, setSearch] = useState('');
  const [bodyType, setBodyType] = useState(staticData.bodyType);

  type TFilter = {
    location?: string;
    bodyType?: string;
    model?: string;
    owner?: string;
    fuelType?: string;
    transmission?: string;
  };

  const [filter, setFilter] = useState<TFilter>({
    location: '',
    bodyType: '',
    model: '',
    owner: '',
    fuelType: '',
    transmission: '',
  });

  const hanldeLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, location: e.target.value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const filteredBodyType = staticData.bodyType.filter((b) =>
      b.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setBodyType(filteredBodyType);
  };

  const handleBodyTypeSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    setFilter({ ...filter, bodyType: e.currentTarget.textContent ?? '' });
    setSearch('');
    setBodyType(staticData.bodyType);
  };

  const hanldeFilterCar = () => {
    const filteredCars = cars.filter((car) => {
      return Object.entries(filter).every(([key, value]) => {
        if (value) {
          return (car as any)[key] === value;
        }
        return true;
      });
    });
    setFilteredCars(filteredCars);
  };

  return (
    <div className="grid grid-cols-10 gap-3">
      <Card className="col-span-3">
        <div className="flex flex-row items-center justify-between ">
          <h1 className="mb-3 text-2xl font-bold">Search</h1>
          <div className="flex flex-row justify-end gap-2">
            <button
              type="button"
              className="disabled:focus-visible:outline-disabled rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600 disabled:focus-visible:outline-2 disabled:focus-visible:outline-offset-2 disabled:focus-visible:outline-blue-600"
              onClick={hanldeFilterCar}
            >
              Filter
            </button>
          </div>
        </div>
        <Divider />
        <div className="h-[80vh] overflow-auto">
          <div className="flex w-full flex-col gap-2">
            <div className="w-full">
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Location
              </label>
              <div className="">
                <select
                  id="location"
                  name="location"
                  autoComplete="location-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={hanldeLocationChange}
                >
                  {staticData.location.map((l) => (
                    <option key={l.id} value={l.name}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Body Type
              </label>
              <div className="rind-1 rounded-md border-2 ring-zinc-300">
                <div className="p-1">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder='Search "Sedan", "Hatchback", "SUV", "MUV", "Convertible"'
                    autoComplete="given-name"
                    className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="p-2">
                  <ul>
                    {bodyType.map((b) => (
                      <li
                        key={b.id}
                        className="flex cursor-pointer items-center justify-between p-1"
                        onClick={handleBodyTypeSelect}
                        data-value={b.name}
                      >
                        <p>{b.name}</p>
                        {filter.bodyType === b.name && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-4 w-4 text-blue-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Brand
              </label>
              <div className="p-1">
                {staticData.brand.map((brand, index) => (
                  <div key={index} className="flex flex-row gap-1">
                    <input
                      type="checkbox"
                      id={String(brand.name)}
                      name={String(brand.name)}
                      value={brand.name}
                    />
                    <label
                      className=" text-sm font-medium text-gray-900"
                      htmlFor={String(brand.name)}
                    >
                      {brand.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full">
              <fieldset>
                <legend className="text-sm font-semibold  text-gray-900">
                  Owners
                </legend>
                <div className="">
                  {staticData.owner.map((owner) => (
                    <div className="flex items-center gap-x-3" key={owner.id}>
                      <input
                        id={String(owner.name)}
                        name={String(owner.name)}
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                      />
                      <label
                        htmlFor={String(owner.name)}
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {owner.name}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className="w-full">
              <fieldset>
                <legend className="text-sm font-semibold  text-gray-900">
                  Fuel Type
                </legend>
                <div className="">
                  {staticData.fuelType.map((ft) => (
                    <div className="flex items-center gap-x-3" key={ft.id}>
                      <input
                        id={String(ft.name)}
                        name={String(ft.name)}
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                      />
                      <label
                        htmlFor={String(ft.name)}
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {ft.name}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className="w-full">
              <fieldset>
                <legend className="text-sm font-semibold  text-gray-900">
                  Transmission
                </legend>
                <div className="">
                  {staticData.transmission.map((ft) => (
                    <div className="flex items-center gap-x-3" key={ft.id}>
                      <input
                        id={String(ft.name)}
                        name={String(ft.name)}
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                      />
                      <label
                        htmlFor={String(ft.name)}
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {ft.name}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </Card>
      <Card className="col-span-7">
        <div className="flex w-full flex-col">
          {filteredCars && filteredCars?.length > 0 ? (
            <RenderCarItems cars={filteredCars} fromSearch />
          ) : (
            <p>No Cars Found</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SearchCar;
