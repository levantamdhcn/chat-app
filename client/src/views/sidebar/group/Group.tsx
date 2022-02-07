import React from 'react';
import ModalWrapper from '../../../components/ModalWrapper/ModalWrapper';
import CreateGroup from './CreateGroup/CreateGroup';

interface GroupProps {
    name: string,
    status: string
}

const Group = ({ name, status }: GroupProps) => {
  return (
    <div className='groups-item'>
        <div className="groups-item-left">
            <div className="groups-item-label">
                {name && name[0]}
            </div>
            <div className="groups-item-name">
                #{name && name}
            </div>
        </div>
        <div className="groups-item-right">
            <div className="groups-item-status">
                { status && status}
            </div>
        </div>
    </div>
  );
};

export default Group;
