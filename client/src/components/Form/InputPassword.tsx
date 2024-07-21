import React from 'react';

interface InputPasswordProp {
    label: string
    setValue: (e: any) => void
    value?: string
    placeholder: string
    disabled?: boolean
}
const InputPassword = ({ value, label, setValue, placeholder, disabled }: InputPasswordProp) => {
  return (
    <div className='custom-input'>
        <label htmlFor="" className="custom-input-label">{label}</label>
        <input 
            type="password" 
            placeholder={placeholder}
            onChange={setValue}
            disabled={disabled}
            value={value}
            className="custom-input-field"
        />
    </div>  
  );
};

export default InputPassword;
