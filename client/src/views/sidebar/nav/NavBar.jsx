import React from 'react';
import Avatar from '../../../assets/images/avatar.jpg'
import Chat from '../chat/Chat';
import Contacts from '../contacts';
import Groups from '../group/Groups';
import Profile from '../profile';
import Settings from '../setting';

const navTop = [
  {
    icon: 'user',
    title: 'My Profile',
    component: <Profile />,
    action: <span className='icon-three-dots-stand'></span>,
  },
  {
    icon: 'message',
    title: 'Chats',
    component: <Chat />,
  },
  {
    icon: 'group',
    title: 'Group',
    component: <Groups />,
    action: <span className='icon-group'></span>,
  },
  {
    icon: 'contact',
    title: 'Contacts',
    component: <Contacts />,
    action: <span className='icon-add-user'></span>,
  },
  {
    icon: 'settings',
    title: 'Settings',
    component: <Settings />,
  },
]

const navBottom  = [
  {
    icon: 'global',
  },
  {
    icon: 'light-mode',
  },
  {
    image: Avatar,
  },
]

const NavBar = ({ currentTab, setCurrenTab }) => {
  return (
    <div className='navbar'>
      <div className="logo">
        <span className='icon-logo'></span>
      </div>
      <div className="nav-top">
        {
          navTop.map(el => (
            <div 
              className={`nav-item ${ currentTab?.title === el.title ? 'active' : ''}`} key={el.icon} 
              onClick={(state) => setCurrenTab({
                ...state,
                title: el.title,
                children: el.component,
                headerActionIcon: el.action
              })}>
              <span className={`icon-${el.icon}`}></span>
            </div>
          ))
        }
      </div>
      <div className="nav-bottom">
        {
          navBottom.map(el => (
            <div className='nav-item' key={el.icon}>
              {el.icon ? (<span className={`icon-${el.icon} hover-effect`}></span>) : <img src={Avatar} alt='user'/>}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default NavBar;
