import React, { useState } from 'react';
import ChatBox from '../chat/ChatBox/ChatBox';
import NavBar from './nav/index';
import Profile from './profile';

const SideBar = () => {
  const [currentTab, setCurrentTab]= useState({
    title: "My Profile",
    children: <Profile />,
    headerActionIcon: <span className='icon-more'></span>
  })

  const { title, children, headerActionIcon } = currentTab

  return (
    <div className='side-bar'>
        <NavBar 
          currentTab={currentTab}
          setCurrenTab={setCurrentTab}
        />
        <div className="tab-content-wrapper scroll-wrapper">
          <div className="tab-content-header">
            <h1 className="title">{title}</h1>
            <div className="tab-content-actions">
              {headerActionIcon}
            </div>
          </div>
          {children}
        </div>
        <ChatBox />
    </div>
  )
};

export default SideBar;
