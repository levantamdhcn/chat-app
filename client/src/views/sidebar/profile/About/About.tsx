import React from 'react';
import InfoField from './Info';
import useAuth from '../../../../hooks/useAuth';

const About = () => {
    const { user } = useAuth();
  return (
      <div>
        <InfoField 
            title={"Name"} 
            content={`${user?.firstName || ''} ${user?.lastName || ''}`}
        />
        <InfoField 
            title={"Email"} 
            content={user?.email ?? ''}
        />
        <InfoField 
            title={"Role"} 
            content={user?.role ?? ''}
        />
      </div>
  );
};

export default About;
