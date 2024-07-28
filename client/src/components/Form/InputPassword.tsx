import React from 'react';

interface InputPasswordProp {
  label: string;
  setValue: (e: any) => void;
  value?: string;
  placeholder?: string;
  name?: string;
  error?: string;
  disabled?: boolean;
  required: boolean;
}
const InputPassword = ({
  value,
  label,
  setValue,
  placeholder,
  disabled,
  name,
  error,
  required = false,
}: InputPasswordProp) => {
  return (
    <div className="custom-input">
      <label htmlFor="" className="custom-input-label">
        {label}
        {required && <span className="text-red-400 text-sm"> * </span>}
      </label>
      <input
        name={name}
        type="password"
        placeholder={placeholder}
        onChange={setValue}
        disabled={disabled}
        value={value}
        className="custom-input-field"
      />

      {error && <span className="text-red-400 text-sm">{error}</span>}
    </div>
  );
};

export default InputPassword;
