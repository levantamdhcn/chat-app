import React from 'react';

interface ContactGroupProps {
    groupName: string
    contactsList: Array<string>
}

const ContactGroup = ({ groupName, contactsList }: ContactGroupProps) => {
  return (
    <div className='contacts-group'>
        <div className="contacts-group-name">
            {groupName}
        </div>
        <ul className="contacts-list">
            {
                contactsList && contactsList.map((el: string) => {
                    return (
                        <li className='contact' key={el}>
                            {el}
                            <span className='icon-three-dots-stand'></span>
                        </li>
                    )
                })
            }
        </ul>
    </div>
  );
};

export default ContactGroup;
