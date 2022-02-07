import React, { useState } from 'react';
import InputText from '../../../../components/Form/InputText';

interface AddContactProp {
    onClose: () => void
}

const AddContact = ({ onClose }: AddContactProp) => {
    const [email, setEmail] = useState("")
  return (
      <div className='create-group-modal'>
        <InputText
          label='Email'
          placeholder='Enter Email'
          setValue={setEmail} 
          value={email}
        />
        <div className="custom-input">
          <label htmlFor="group-desc" className='custom-input-label'>Invatation Message</label>
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

export default AddContact;
