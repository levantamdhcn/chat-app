import React, { useState } from 'react';
import Avatar from '../../../assets/images/avatar.jpg'
import Accordion from '../../../components/Accordion';
import About from './About/About';
import Attach from './Attach/Attach';

const Profile = () => {
    const [openAccordion, setOpenAccordion] = useState(null)
  return (
    <div className='profile'>
        <div className="profile-top">
            <div className="avatar">
                <img src={Avatar} alt="avatar" />
            </div>
            <div className="username">
                Patricia Smith
            </div>
            <div className="status">
                <span className='icon-circle-fullfil'></span>
                 Active
            </div>
        </div>
        <div className="profile-bottom">
            <div className="text-warning">
                If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.
            </div>
            <div className="profile-accordion">
                <Accordion
                    id={1}
                    icon={<span className='icon-user'></span>}
                    title='About'
                    children={<About />} 
                    isOpen={openAccordion === 1}
                    setIsOpen={setOpenAccordion}
                />
                <Accordion
                    id={2}
                    icon={<span className='icon-attach'></span>}
                    title='Attached Files'
                    children={<Attach />} 
                    isOpen={openAccordion === 2}
                    setIsOpen={setOpenAccordion}
                />
            </div>
        </div>
    </div>);
};

export default Profile;
