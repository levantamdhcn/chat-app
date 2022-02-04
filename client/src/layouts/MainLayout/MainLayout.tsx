import React from 'react';
import NavBar from './NavBar/NavBar';
import TabContent from '../../views/sidebar';

interface MainLayoutProp {
  children : Node
}

const MainLayout = ({ children }: MainLayoutProp) => {
  return (
      <div className="main-panel">
          <NavBar />
          <div className="children-wrapper">
            {children}
          </div>
      </div>
  )
};

export default MainLayout;
