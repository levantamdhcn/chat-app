import React, { Children, ReactElement, useState} from 'react';
import NavBar from './nav/index';
import Profile from './profile';

const SideBar = () => {
  const [currentTab, setCurrentTab]= useState({
    title: "My Profile",
    children: <Profile />,
    headerActionIcon: <span className='icon-more'></span>
  })

  const { title, children, headerActionIcon } = currentTab

  console.log('currentTab',currentTab)
  return (
    <div className='side-bar'>
        <NavBar 
          currentTab={currentTab}
          setCurrenTab={setCurrentTab}
        />
        <div className="tab-content-wrapper">
          <div className="tab-content-header">
            <h1 className="title">{title}</h1>
            <div className="tab-content-actions">
              {headerActionIcon}
            </div>
          </div>
          {children}
        </div>
    </div>
  )
};

export default SideBar;
