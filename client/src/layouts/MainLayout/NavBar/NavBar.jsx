import React from 'react';
import Avatar from '../../../assets/images/avatar.jpg'

const navTop = [
  {
    icon: 'user',
  },
  {
    icon: 'message',
  },
  {
    icon: 'group',
  },
  {
    icon: 'contact',
  },
  {
    icon: 'settings',
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

const NavBar = () => {
  return (
    <div className='navbar'>
      <div className="logo">
        <span className='icon-logo'></span>
      </div>
      <div className="nav-top">
        {
          navTop.map(el => (
            <div className='nav-item' key={el.icon}>
              <span className={`icon-${el.icon} hover-effect`}></span>
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
