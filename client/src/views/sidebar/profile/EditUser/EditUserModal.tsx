import React, { useState } from 'react';
import InputPassword from '../../../../components/Form/InputPassword';
import InputText from '../../../../components/Form/InputText';
import useAuth from '../../../../hooks/useAuth';

const EditUserModal = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    email: user?.email,
    password: undefined,
    firstName: user?.firstName,
    lastName: user?.lastName,
  });
  const setField = (field: string, data: any) => {
    setFormData((state) => ({
      ...state,
      [field]: data,
    }));
  };
  return (
    <div className="edit-user-modal">
      <InputText
        label="Email"
        placeholder="Email"
        value={formData.email}
        setValue={(e) => setField('email', e.target.value)}
        required={false}
      />
      <InputText
        label="First Name"
        placeholder="First Name"
        value={formData.firstName}
        setValue={(e) => setField('firstName', e.target.value)}
        required={false}
      />
      <InputText
        label="Last Name"
        placeholder="Last Name"
        value={formData.lastName}
        setValue={(e) => setField('lastName', e.target.value)}
        required={false}
      />
      <InputPassword
        label="Password"
        placeholder="Password"
        value={formData.password}
        setValue={(e) => setField('password', e.target.value)}
        required={false}
      />
    </div>
  );
};

export default EditUserModal;
