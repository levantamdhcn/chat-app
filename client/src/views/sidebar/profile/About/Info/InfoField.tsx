import React from 'react';

interface InfoFieldProps {
  title: string
  content: string
}

const InfoField = ({ title, content}: InfoFieldProps) => {
  return (
    <div className='info-field-wrapper'>
      <div className="info-field-title">
        {title}
      </div>
      <div className="info-field-content">
        {content}
      </div>
    </div>
  );
};

export default InfoField;
