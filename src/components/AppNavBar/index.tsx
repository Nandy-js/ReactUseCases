import React from 'react';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../../router';

const navigation = [
  { name: 'Home', href: APP_ROUTES.home },
  { name: 'Search Car', href: APP_ROUTES.searchCar },
];

export default function AppNavBar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-10 w-full border-b-2  border-blue-500 shadow-sm backdrop-blur-md backdrop-filter sm:px-1">
      <div className="">
        <div className="flex flex-row justify-center p-2 ">
          <div className="flex flex-row justify-center space-x-4 ">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  item.href === location.pathname
                    ? 'bg-blue-400/10 text-blue-500 ring-1 ring-blue-500/20'
                    : 'text-gray-500 hover:bg-blue-400/10 hover:text-blue-500 hover:ring-1 hover:ring-blue-500/20',
                  'rounded-md px-2 py-1 text-sm font-medium',
                )}
                aria-current={
                  item.href === location.pathname ? 'page' : undefined
                }
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
