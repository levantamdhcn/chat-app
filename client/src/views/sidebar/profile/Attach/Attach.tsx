import React from 'react';
import File from './File';

const Attach = () => {
  return (
      <div>
        <File
            icon={<span className='icon-image'></span>}
            name={"Admin-A.zip"}
            size={12.5}
        />
      </div>
  );
};

export default Attach;
