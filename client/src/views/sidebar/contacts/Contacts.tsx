import React, { useState } from 'react';
import ModalWrapper from '../../../components/ModalWrapper/ModalWrapper';
import Search from '../../../components/Search';
import useAuth from '../../../hooks/useAuth';
import AddContact from './AddContact';
import ContactGroup from './ContactGroup';

const Contacts = () => {
  const { contacts } = useAuth();
  const [openAddContact, setOpenAddContact] = useState(false);

  return (
    <div className="contacts">
      <div className="tab-content-header">
        <h1 className="title">Contacts</h1>
        <div
          className="tab-content-actions"
          onClick={() => setOpenAddContact(true)}
        >
          <span className="icon-add-user"></span>
        </div>
      </div>
      <Search placeholder="Search users..." />
      <ul className="contacts-group-list">
        <ContactGroup groupName={'A'} contactsList={contacts} />
      </ul>
      <ModalWrapper
        title={'Add Contacts'}
        isOpen={openAddContact}
        onClose={() => setOpenAddContact(false)}
        children={<AddContact onClose={() => setOpenAddContact(false)} />}
        styles={{ width: '498px' }}
      />
    </div>
  );
};

export default Contacts;
