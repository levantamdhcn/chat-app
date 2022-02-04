import React from 'react';
import InfoField from './Info';

const About = () => {
  return (
      <div>
        <InfoField 
            title={"Name"} 
            content={"Patricia Smith"}
        />
        <InfoField 
            title={"Email"} 
            content={"adc@123.com"}
        />
        <InfoField 
            title={"Time"} 
            content={"40 AM"}
        />
        <InfoField 
            title={"Location"} 
            content={"California, USA"}
        />
      </div>
  );
};

export default About;
