import React from 'react';
import NavBar from '../../views/sidebar/nav/NavBar';
import TabContent from '../../views/sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
      <div className="main-panel">
          <div className="children-wrapper">
            <Outlet />
          </div>
      </div>
  )
};

export default MainLayout;
