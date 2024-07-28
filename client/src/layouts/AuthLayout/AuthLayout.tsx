import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="authorization-layout my-9 sm:pt-9 bg-body-dark">
      <div className="container mx-auto">
        <div className="justify-center grid grid-cols-12 gap-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
