import React from 'react';

interface TabContentProp {
    title: string,
    children: Node
}

const TabContent = ({ title, children }: TabContentProp) => {
  return (
    <div className='tab-content'>
        <h1 className="title">{title}</h1>
        {children}
    </div>
  )
};

export default TabContent;
