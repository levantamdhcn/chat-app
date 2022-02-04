import React from 'react';
import Group from './Group';
import Search from '../../../components/Search';

const Groups = () => {
  return (
      <div className='groups'>
          <div className="groups-search">
            <Search
              placeholder='Search groups...'
            />
          </div>
          <div className="groups-list">
            <Group
              name={"General"} 
              status={"New"}
            />
          </div>
      </div>
  );
};

export default Groups;
