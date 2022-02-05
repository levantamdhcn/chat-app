import React, { useState } from 'react';

interface DropDownMenuProp {
    options: Array<string>
    currentValue: string
    setCurrentValue: (arr: string) => void
}

const ModalStatus = ({ options, currentValue, setCurrentValue }: DropDownMenuProp) => {
    const [openModal, setOpenModal] = useState(false)
    
    const handleSelectOption = (option: string) => {
        setCurrentValue(option)
        setOpenModal(false)
    }
  return (
      <div className='modal-status-wrapper'>
          <div className="current-status" onClick={() => setOpenModal(prev => !prev)}>
            {currentValue}
            <span className='icon-arrow-down'></span>
          </div>
          {
              openModal ? (<div className="modal-status">
                                {
                                    options.map((el) => <div className='status-option' key={el} onClick={() => handleSelectOption(el)}>{el}</div>)
                                }
                            </div>)
                        : ""
          }
      </div>
  );
};

export default ModalStatus;
