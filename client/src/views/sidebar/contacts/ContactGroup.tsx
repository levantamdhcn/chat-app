import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { IContact } from '../../../store/reducers/auth/types';

interface ContactGroupProps {
  groupName: string;
  contactsList: IContact[];
}

const ContactGroup = ({ groupName, contactsList }: ContactGroupProps) => {
  const { user } = useAuth();

  return (
    <div className="contacts-group">
      <div className="contacts-group-name">{groupName}</div>
      <ul className="contacts-list">
        {user &&
          contactsList &&
          contactsList.map((el: IContact) => {
            const otherPerson = el.members.find((el) => el._id !== user._id);
            return (
              <li className="contact" key={el._id}>
                {otherPerson?.firstName || ""} {otherPerson?.lastName || ""}
                <span className="icon-three-dots-stand"></span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ContactGroup;
