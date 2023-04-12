import React from 'react';

type Properties = {
  isDisabled: boolean;
  children: React.ReactNode;
};

const Disabled: React.FC<Properties> = ({ isDisabled, children }) => {
  const disabledDiv = React.createElement(
    'div',
    {
      disabled: true,
      style: { opacity: 0.5, pointerEvents: 'none' },
    },
    children,
  );

  return isDisabled ? disabledDiv : <>{children}</>;
};

export { Disabled };
