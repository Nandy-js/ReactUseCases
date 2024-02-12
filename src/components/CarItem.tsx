import { useDispatch } from 'react-redux';
import React from 'react';
import { removeCar } from '../redux/cars/slice';
import { TCarForm } from '../types';

type CarItemProps = {
  fromSearch?: boolean;
  cars?: TCarForm[];
};

const RenderCarItems = ({ fromSearch = false, cars = [] }: CarItemProps) => {
  const dispatch = useDispatch();

  return (
    <ul
      role="list"
      className="flex h-[450px] flex-col gap-2 overflow-y-auto p-2"
    >
      {cars.map((item) => (
        <li
          key={item.id}
          className="h-fit rounded-lg px-6 py-4 ring-1 ring-zinc-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                {item.model}
              </span>
              <span className="text-xs text-gray-500">{item.location}</span>
            </div>
            {!fromSearch && (
              <button
                type="button"
                className="text-red-600 hover:text-red-500"
                onClick={() => dispatch(removeCar(item?.id))}
              >
                Remove
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RenderCarItems;
