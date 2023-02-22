import React, { ReactElement } from "react";
import Logo from "../../assets/_icon/logo.svg";

interface AuthLayoutProp {
  children: ReactElement;
}

const AuthLayout = ({ children }: AuthLayoutProp) => {
  return (
    <div className="authorization-layout my-9 sm:pt-9 bg-body-dark">
      <div className="container mx-auto">
        <div className="justify-center grid grid-cols-12 gap-4">
          <div className="col col-span-4 col-start-5">
            <div className="text-center mb-4">
              <div className="logo mb-12">
                <img src={Logo} alt="logo" />
                <span className="font-bold text-2xl ml-2 text-grey-700">Chatvia</span>
              </div>
            </div>
            <div className="authorization-content">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
