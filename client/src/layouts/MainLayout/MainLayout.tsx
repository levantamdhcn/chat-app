import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const MainLayout = () => {
  const navigate = useNavigate()
  const { isInitialised, isAuthenticated } = useAuth()

  console.log('isAuthenticated', isAuthenticated)
  console.log('isInitialised', isInitialised)
  

  if (isInitialised && !isAuthenticated) {
    navigate('/login')
    return;
  }

  return (
      <div className="main-panel">
          <div className="children-wrapper">
            <Outlet />
          </div>
      </div>
  )
};

export default MainLayout;
