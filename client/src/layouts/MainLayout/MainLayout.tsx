import React from 'react';
import NavBar from '../../views/sidebar/nav/NavBar';
import TabContent from '../../views/sidebar';

interface MainLayoutProp {
  children : Node
}

const MainLayout = ({ children }: MainLayoutProp) => {
  return (
      <div className="main-panel">
          <div className="children-wrapper">
            {children}
          </div>
      </div>
  )
};

export default MainLayout;
