import React from 'react';

const SwitchStatus = () => {
  return (
      <label htmlFor="switch-status" className='switch-status-label'>
        <input type="checkbox" className='switch-status' name="switch-status"/>
        <span>
            <i className='icon-circle-fullfil'></i>
        </span>
      </label>
  );
};

export default SwitchStatus;
