import React, { useState } from 'react';
import InputPassword from '../../../../components/Form/InputPassword';
import InputText from '../../../../components/Form/InputText';

const EditUserModal = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
    })
    const setField = (field: string, data: any) => {
        setFormData((state) => ({
            ...state,
            [field]: data
        }))
    }
  return (
      <div className="edit-user-modal">
          <InputText
            label='Email'
            placeholder='Email'
            value={formData.email} 
            setValue={(e) => setField("email", e.target.value)}
          />
          <InputText
            label='Username'
            placeholder='Username'
            value={formData.username} 
            setValue={(e) => setField("username", e.target.value)}
          />
          <InputPassword
            label='Password'
            placeholder='Password'
            value={formData.password} 
            setValue={(e) => setField("password", e.target.value)}
          />
      </div>
  );
};

export default EditUserModal;
