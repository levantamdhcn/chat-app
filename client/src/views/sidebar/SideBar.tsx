import React, { useState } from 'react';
import useConversation from '../../hooks/useConversation';
import ChatBox from '../chat/ChatBox/ChatBox';
import NavBar from './nav/index';
import Profile from './profile';

const SideBar = () => {
  const { currentConversation } = useConversation();
  const [currentTab, setCurrentTab] = useState({
    title: 'My Profile',
    children: <Profile />,
    headerActionIcon: <span className="icon-more"></span>,
  });

  const { title, children, headerActionIcon } = currentTab;

  console.log('currentConversation', currentConversation);

  return (
    <div className="side-bar">
      <NavBar currentTab={currentTab} setCurrenTab={setCurrentTab} />
      <div className="tab-content-wrapper scroll-wrapper">{children}</div>
      {currentConversation && <ChatBox conversation={currentConversation} />}
    </div>
  );
};

export default SideBar;
