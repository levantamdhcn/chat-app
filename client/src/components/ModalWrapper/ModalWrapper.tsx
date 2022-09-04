import React, { ReactElement } from 'react';

interface ModalWrapperStyle {
    width: string
}

interface ModalWrapperProp {
    title: string
    children?: ReactElement
    onClose: () => void
    styles: ModalWrapperStyle
    isOpen?: boolean
}

const ModalWrapper = ({ title, children, onClose, styles, isOpen }: ModalWrapperProp) => {
    if(!isOpen) {
        return <></>
    }
  return (
    <div className="modal-wrapper">
        <div className="modal-bg">
            
        </div>
        <div className="modal-content" style={styles}>
            <div className="modal-header">
                <span className='modal-header-title'>{title}</span>
                <div 
                    className='modal-header-action'
                    onClick={onClose}
                >
                    <span className="icon-close"></span>
                </div>
            </div>
            <div className="modal-body">
                {children}
            </div>
            <div className="modal-footer">
                <div className='cancel-btn btn' onClick={onClose}>
                    Close
                </div>
                <div className="main-btn btn">
                    Create Group
                </div>
                </div>
            </div>  
    </div>
  );
};

export default ModalWrapper;
