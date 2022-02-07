import React from 'react';
import Search from '../../../components/Search';
import ContactGroup from './ContactGroup';

const Contacts = () => {
  return (
    <div className='contacts'>
        <Search placeholder='Search users...'/>
        <ul className="contacts-group-list">
            <ContactGroup groupName={"A"} contactsList={["Albert Rodarte", "Allison Etter"]}/>
            <ContactGroup groupName={"A"} contactsList={["Albert Rodarte", "Allison Etter"]}/>
        </ul>
    </div>
  );
};

export default Contacts;
