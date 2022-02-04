import React from 'react';
import Profile from './profile';

interface TabContentProp {
    title: string,
}

const TabContent = ({ title }: TabContentProp) => {
  return (
    <div className='tab-content'>
        <div className="tab-content-header">
          <h1 className="title">My Profile</h1>
          <div className="tab-content-actions">
            <span className='icon-three-dots-stand'></span>
          </div>
        </div>
        <Profile />
    </div>
  )
};

export default TabContent;
