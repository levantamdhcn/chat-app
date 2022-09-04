import React, { useState } from 'react';
import Avatar from '../../../assets/images/avatar.jpg'
import Accordion from '../../../components/Accordion';
import ModalWrapper from '../../../components/ModalWrapper/ModalWrapper';
import About from './About/About';
import Attach from './Attach/Attach';
import EditUserModal from './EditUser';

const Profile = () => {
    const [openAccordion, setOpenAccordion] = useState(null)
    const [openProfileOption, setOpenProfileOption] = useState(false)
    const [openEditUser, setOpenEditUser] = useState(false)

    const handleOpenEditUser = () => {
        setOpenEditUser(true)
        setOpenProfileOption(false)
    }
  return (
    <div className='profile'>
        <div className="tab-content-header">
          <h1 className="title">Profile</h1>
          <div className="tab-content-actions">
            <span className='icon-three-dots-stand' onClick={() => setOpenProfileOption(prev => !prev)}></span>
            {
                openProfileOption ? (
                                        <div className="profile-actions">
                                            <div 
                                                className="status-option" 
                                                onClick={() => handleOpenEditUser()}
                                            >
                                                Edit
                                            </div>
                                            <div className="status-option">Log out</div>
                                        </div>
                                    ) 
                                    : ""
            }
          </div>
        </div>
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
        <ModalWrapper
            title={"Edit User"} 
            isOpen={openEditUser}
            onClose={() => setOpenEditUser(false)}
            styles={{ width: "498px"}}
            children={<EditUserModal />}
        />
    </div>);
};

export default Profile;
