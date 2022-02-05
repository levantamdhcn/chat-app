import React from 'react';
import SwitchStatus from '../../../../components/SwitchStatus';
import PrivacyField from '../privacy/PrivacyField';

const Security = () => {
  return (
    <PrivacyField
              fieldName={"Show security notification"} 
              actions={<SwitchStatus />}
            />
  );
};

export default Security;
