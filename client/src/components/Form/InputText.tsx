import React from 'react';

interface InputTextProp {
  label: string;
  setValue: (e: any) => void;
  value?: string;
  placeholder: string;
  disabled?: boolean;
  name?: string;
  error?: string;
  required?: boolean;
}
const InputText = ({
  value,
  label,
  setValue,
  placeholder,
  disabled,
  name,
  error,
  required = false,
}: InputTextProp) => {
  return (
    <div className="custom-input">
      <label htmlFor="" className="custom-input-label">
        {label}
        {required && <span className="text-red-400 text-sm"> * </span>}
      </label>
      <input
        name={name}
        type="text"
        placeholder={placeholder}
        onChange={setValue}
        value={value}
        disabled={disabled}
        className="custom-input-field"
      />

      {error && <span className="text-red-400 text-sm">{error}</span>}
    </div>
  );
};

export default InputText;
