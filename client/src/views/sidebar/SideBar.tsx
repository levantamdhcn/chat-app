import React, { useState } from 'react';
import useConversation from '../../hooks/useConversation';
import ChatBox from '../chat/ChatBox/ChatBox';
import NavBar from './nav/index';
import Profile from './profile';
import { EmptyChat } from '../chat/EmptyChat';

const SideBar = () => {
  const { currentConversation } = useConversation();
  const [currentTab, setCurrentTab] = useState({
    title: 'My Profile',
    children: <Profile />,
    headerActionIcon: <span className="icon-more"></span>,
  });

  const { children } = currentTab;

  return (
    <div className="side-bar">
      <NavBar currentTab={currentTab} setCurrenTab={setCurrentTab} />
      <div className="tab-content-wrapper scroll-wrapper">{children}</div>
      {currentConversation ? (
        <ChatBox conversation={currentConversation} />
      ) : (
        <EmptyChat />
      )}
    </div>
  );
};

export default SideBar;
