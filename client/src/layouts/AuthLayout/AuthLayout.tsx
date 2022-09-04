import React, { ReactElement } from 'react';
import Logo from '../../assets/_icon/logo.svg'

interface AuthLayoutProp {
    children: ReactElement
}

const AuthLayout = ({ children }: AuthLayoutProp) => {
  return (
      <div className="authorization-layout">
          <div className="logo">
              <img src={Logo} alt="logo" />
              <span>Chatvia</span>
          </div>
          <div className="authorization-content">
              {children}
          </div>
      </div>
  );
};

export default AuthLayout;
