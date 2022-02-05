import React, { useState } from 'react';
import Avatar from '../../../assets/images/avatar.jpg'
import Accordion from '../../../components/Accordion';
import ModalStatus from '../../../components/DropDownMenu';
import Help from '../help/Help';
import About from '../profile/About';
import Privacy from './privacy/Privacy';
import Security from './security/Security';

const Settings = () => {
  const [openAccordion, setOpenAccordion] = useState(null)
  const [currentStatus, setCurrentStatus] = useState('Available')
  return (
    <div className='settings'>
      <div className="profile-top">
        <div className="avatar">
            <img src={Avatar} alt="avatar" />
            <div className='edit-action hover-effect'>
              <span className="icon-pencil"></span>
            </div>
        </div>
        <div className="username">
            Patricia Smith
        </div>
        <ModalStatus 
          options={['Available','Busy']}
          currentValue={currentStatus}
          setCurrentValue={setCurrentStatus}
        />
      </div>
      <div className="settings-content">
        <Accordion
          id={1}
          title={"Personal Info"}
          children={<About />}
          isOpen={openAccordion === 1}
          setIsOpen={setOpenAccordion}
          action={
            <>
              <span className='icon-edit'></span>
                Edit
            </>
          }
        />
        <Accordion
          id={2}
          title={"Privacy"}
          children={<Privacy />}
          isOpen={openAccordion === 2}
          setIsOpen={setOpenAccordion}
        />
        <Accordion
          id={3}
          title={"Security"}
          children={<Security />}
          isOpen={openAccordion === 3}
          setIsOpen={setOpenAccordion}
        />
        <Accordion
          id={4}
          title={"Help"}
          children={<Help />}
          isOpen={openAccordion === 4}
          setIsOpen={setOpenAccordion}
        />
      </div>
    </div>
  );
};

export default Settings;
