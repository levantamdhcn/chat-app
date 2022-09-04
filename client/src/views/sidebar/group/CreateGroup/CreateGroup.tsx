import React, { useState } from 'react';
import InputText from '../../../../components/Form/InputText';

interface CreateGroupProp {
  onClose: () => void
}

const CreateGroup = ({ onClose }: CreateGroupProp) => {
  const [groupName, setGroupName] = useState("")
  return (
    <div className='create-group-modal'>
        <InputText
          label='Group Name'
          placeholder='Enter Group Name'
          setValue={(e) => setGroupName(e.target.value)} 
          value={groupName}
        />
        <div className="custom-input">
          <label htmlFor="toggle-accordion-btn" className='custom-input-label'>Group Members</label>
          <div className="toggle-accordion-btn">
            <button>
              Select Members
            </button>
          </div>
        </div>
        <div className="custom-input">
          <label htmlFor="group-desc" className='custom-input-label'>Description</label>
          <textarea 
            name="group-desc" rows={5} 
            className="group-desc"
            placeholder='Enter Description'
          >

          </textarea>
        </div>
    </div>
  );
};

export default CreateGroup;
