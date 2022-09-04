import React from 'react';

interface DotLoadingProp {
  style?: Object
}

const DotLoading = ({ style }: DotLoadingProp) => {
  return (
    <div className='dot-falling' style={style}>
      
    </div>
  );
};

export default DotLoading;
