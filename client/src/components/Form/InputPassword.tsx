import React from 'react';

interface InputPasswordProp {
    label: string
    setValue: (e: any) => void
    value: string
    placeholder: string
    disabled?: boolean
}
const InputPassword = ({ label, value, setValue, placeholder, disabled }: InputPasswordProp) => {
  return (
    <div className='custom-input'>
        <label htmlFor="" className="custom-input-label">{label}</label>
        <input 
            type="password" 
            placeholder={placeholder}
            onChange={setValue}
            value={value}
            disabled={disabled}
            className="custom-input-field"
        />
    </div>  
  );
};

export default InputPassword;
