import clsx from 'clsx';
import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={clsx(
        'rounded-md bg-white p-5 shadow-sm ring-1 ring-zinc-200',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
