import React from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

import Avatar from '../../../assets/images/avatar.jpg';
import useAuth from '../../../hooks/useAuth';
import Chat from '../chat/Chat';
import Contacts from '../contacts';
import Groups from '../group/Groups';
import Profile from '../profile';
import Settings from '../setting';
import { NavbarHelper } from './NavbarHelper';

const navTop = [
  {
    icon: 'user',
    title: 'My Profile',
    component: <Profile />,
    action: <span className="icon-three-dots-stand"></span>,
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
    action: <span className="icon-group"></span>,
  },
  {
    icon: 'contact',
    title: 'Contacts',
    component: <Contacts />,
    action: <span className="icon-add-user"></span>,
  },
  {
    icon: 'settings',
    title: 'Settings',
    component: <Settings />,
  },
];

const navBottom = [
  {
    icon: 'global',
  },
  {
    icon: 'light-mode',
  },
  {
    image: Avatar,
  },
];

const NavBar = ({ currentTab, setCurrenTab }) => {
  const { user } = useAuth();

  const [openHelper, setOpenHelper] = React.useState(false);
  const ref = useDetectClickOutside({ onTriggered: () => setOpenHelper(false) });

  return (
    <div className="navbar">
      <div className="logo">
        <span className="icon-logo"></span>
      </div>
      <div className="nav-top">
        {navTop.map((el) => (
          <div
            className={`nav-item ${
              currentTab?.title === el.title ? 'active' : ''
            }`}
            key={el.icon}
            onClick={(state) =>
              setCurrenTab({
                ...state,
                title: el.title,
                children: el.component,
                headerActionIcon: el.action,
              })
            }
          >
            <span className={`icon-${el.icon} !w-[24px] !h-[24px] cursor-pointer text-rockBlue`}></span>
          </div>
        ))}
      </div>
      <div className="nav-bottom">
        {navBottom.map((el) => (
          <div className="nav-item relative" key={el.icon} ref={!el.icon ? ref : undefined}>
            {el.icon ? (
              <span className={`icon-${el.icon} hover-effect`}></span>
            ) : (
              <>
                <img
                  src={user.avatar || Avatar}
                  alt="user"
                  className='cursor-pointer'
                  onClick={() => setOpenHelper((prev) => !prev)}
                />
                {openHelper && (
                  <div className="absolute bottom-[60px] shadow-md left-1/4 w-[160px] border-borderColor bg-darkColor">
                    <NavbarHelper setCurrenTab={setCurrenTab} />
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
