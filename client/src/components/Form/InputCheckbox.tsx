import React from "react";

interface IInputCheckboxProps {
  onChange: () => void;
  label: string;
}

const InputCheckbox = ({ onChange, label }: IInputCheckboxProps) => {
  return (
    <label className="checkbox style-c">
      <div>
        <input type="checkbox" />
        <div className="checkbox__checkmark"></div>
      </div>
      <div className="checkbox__body mt-1 text-md">{label}</div>
    </label>
  );
};

export default InputCheckbox;
