import React, { ReactElement } from 'react';

interface AccordionProp {
  id: number
  icon?: ReactElement
  title: string
  children: ReactElement
  isOpen?: any
  setIsOpen: (arg: any) => void
  action?: ReactElement
} 



const Accordion = ({ id, icon, title, children, isOpen, setIsOpen, action }: AccordionProp) => {

  const handleToggle = (id: any) => {
    setIsOpen((state: any) => {
      return state === id ? null : id
    })
  }
  return (
    <div className='accordion-wrapper'>
      <div 
        className={`accordion-title ${isOpen ? 'open' : ''}`} 
        onClick={() => handleToggle(id)}
      >
        <div className='accordion-label'>
          {icon}
          {title}
        </div>
        <span className="icon-arrow-right"></span>
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content">
          {
            action && <div className="accordion-action">
                        {action}
                      </div>
          }
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
