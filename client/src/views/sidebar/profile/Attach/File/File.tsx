import React, { ReactElement } from 'react';

interface FileProp {
    icon: ReactElement
    name: string
    size: number
}

const File = ({ icon, name, size }: FileProp) => {
  return (
      <div className='file-wrapper'>
          <div className="file-icon">
              {icon}
          </div>
          <div className="file-details">
              <h1 className="file-name">{name}</h1>
              <div className="file-size">{size} MB</div>
          </div>
          <div className="file-actions">
              <span className='icon-download'></span>
              <span className='icon-more'></span>
          </div>
      </div>
  );
};

export default File;
