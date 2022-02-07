import React, { useState } from 'react';
import Group from './Group';
import Search from '../../../components/Search';
import ModalWrapper from '../../../components/ModalWrapper/ModalWrapper';
import CreateGroup from './CreateGroup/CreateGroup';

const Groups = () => {
  const [openCreateGroup, setOpenCreateGroup] = useState(false)
  return (
      <div className='groups'>
        <div className="tab-content-header">
          <h1 className="title">Group</h1>
          <div className="tab-content-actions" onClick={() => setOpenCreateGroup(true)}>
            <span className='icon-group'></span>
          </div>
        </div>
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
          <ModalWrapper 
            title={"Create New Group"} 
            onClose={() => setOpenCreateGroup(false)} 
            children={<CreateGroup onClose={() => setOpenCreateGroup(false)}/>}
            styles={{ width: "498px" }}
            isOpen={openCreateGroup}
          />
      </div>
  );
};

export default Groups;
