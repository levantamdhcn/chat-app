import React, { useState } from 'react';
import DropDownMenu from '../../../../components/DropDownMenu';
import SwitchStatus from '../../../../components/SwitchStatus';
import PrivacyField from './PrivacyField';

const Privacy = () => {
  const [currentProfilePhoto, setCurrentProfilePhoto] = useState("Everyone")

  const privacies = [
    {
      name: 'Profile photo',
      actions: <DropDownMenu 
                options={["Everyone", "Nobody"]}
                currentValue={currentProfilePhoto}
                setCurrentValue={setCurrentProfilePhoto}
              />
    },
    {
      name: 'Last seen',
      actions: <SwitchStatus />
    },
    {
      name: 'Status',
      actions: <DropDownMenu 
                options={["Everyone", "Nobody"]}
                currentValue={currentProfilePhoto}
                setCurrentValue={setCurrentProfilePhoto}
              />
    },
    {
      name: 'Read receipts',
      actions: <SwitchStatus />
    },
    {
      name: 'Groups',
      actions: <DropDownMenu 
                options={["Everyone", "Nobody"]}
                currentValue={currentProfilePhoto}
                setCurrentValue={setCurrentProfilePhoto}
              />
    },
  ]
  return (
    <div className='privacy'>
      {
        privacies.map((field) => {
          return (
            <PrivacyField
              fieldName={field.name} 
              actions={field.actions}
            />
          )
        })
      }
    </div>
  );
};

export default Privacy;
