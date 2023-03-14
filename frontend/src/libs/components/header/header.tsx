import '~/assets/css/header.scss';

import React from 'react';

type Properties<T> = T;

const Header: React.FC<Properties<React.PropsWithChildren>> = ({ children }) => {
  return (
     <header>
       <div className='logo__container'>
         <div className='header__logo'/>
         <span className='header__logo__text'>logo</span>
       </div>
       <div className='children__container'>{ children }</div>
     </header>
  );
};

export { Header };
