import React, { ReactElement } from 'react';

interface PrivacyFieldProp {
    fieldName: string
    actions?: ReactElement
}

const PrivacyField = ({ fieldName, actions }: PrivacyFieldProp) => {
  return (
    <div className='privacy-field'>
        <div className="privacy-field-name">
            {fieldName && fieldName}
        </div>
        {
            actions && <div className='privacy-field-action'>
                            {actions}
                        </div>
        }
    </div>
  );
};

export default PrivacyField;
