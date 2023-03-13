import React from 'react';

interface InputPasswordProp {
    label: string
    setValue: (e: any) => void
    value: string
    placeholder: string
    disabled?: boolean
}
const InputFile = ({ label, setValue, placeholder, disabled }: InputPasswordProp) => {
  return (
    <div className='custom-input'>
        <label htmlFor="" className="custom-input-label">{label}</label>
        <input 
            type="file" 
            placeholder={placeholder}
            onChange={setValue}
            disabled={disabled}
            className="custom-input-field"
        />
    </div>  
  );
};

export default InputFile;
