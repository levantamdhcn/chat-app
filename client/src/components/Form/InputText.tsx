import React from 'react';

interface InputTextProp {
    label: string
    setValue: (e: any) => void
    value?: string
    placeholder: string
    disabled?: boolean
}
const InputText = ({ value, label, setValue, placeholder, disabled }: InputTextProp) => {
  return (
    <div className='custom-input'>
        <label htmlFor="" className="custom-input-label">{label}</label>
        <input 
            type="text" 
            placeholder={placeholder}
            onChange={setValue}
            value={value}
            disabled={disabled}
            className="custom-input-field"
        />
    </div>  
  );
};

export default InputText;
