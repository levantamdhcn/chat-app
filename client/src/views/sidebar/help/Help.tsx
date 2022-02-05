import React from 'react';
import PrivacyField from '../setting/privacy/PrivacyField';

const Help = () => {
  return (
    <>
        <PrivacyField
            fieldName={"FAQs"} 
        />
        <PrivacyField
            fieldName={"Contact"} 
        />
        <PrivacyField
            fieldName={"Terms & Privacy policy"} 
        />
    </>
  );
};

export default Help;