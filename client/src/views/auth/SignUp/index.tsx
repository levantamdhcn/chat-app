import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

import InputCheckbox from "../../../components/Form/InputCheckbox";
import InputPassword from "../../../components/Form/InputPassword";
import InputText from "../../../components/Form/InputText";
import { register } from "../../../store/reducers/auth";

export interface SignUpInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const setField = (field: string,  value: string) => {
    setData({
      ...data,
      [field]: value
    })
  }

  const onSubmit = () => {
    dispatch(register({ data }));
  };

  return (
    <div className="login">
      <div className="text-center mb-7">
        <h4 className="text-21 font-bold mb-2 text-grey-700">Sign up</h4>
        <span className="text-muted">Get your Chatvia account now.</span>
      </div>
      <div className="login-form rounded bg-card-dark p-10">
        <InputText
          label="Email"
          placeholder="Enter Email"
          value={data.email}
          setValue={(e) => setField("email", e.target.value)}
        />
        <InputText
          label="First name"
          placeholder="Enter first name"
          value={data.firstName}
          setValue={(e) => setField("firstName", e.target.value)}
        />
        <InputText
          label="Last name"
          placeholder="Enter last name"
          value={data.lastName}
          setValue={(e) => setField("lastName", e.target.value)}
        />
        <InputPassword
          label="Password"
          placeholder="Enter Password"
          value={data.password}
          setValue={(e) => setField("password", e.target.value)}
        />
        <InputCheckbox onChange={() => {}} label={"Remember me"} />

        <button className="mt-4 main-btn w-full rounded py-3" onClick={onSubmit}>Sign up</button>
        <div className="mt-12">
          <span className="text-muted text-base">
            By registering you agree to the Chatvia
          </span>
          <span>
            <a href="/register" className="text-main">
              {" "}
              Terms of Use
            </a>
          </span>
        </div>
      </div>

      <div className="text-center mt-12">
        <span className="text-muted">Already have an account ?</span>
        <span className="ml-2">
          <a href="/login" className="text-main">
            Signin
          </a>
        </span>
        <div className="text-muted mt-5">
          © 2023 Chatvia. Crafted with by Themesbrand
        </div>
      </div>
    </div>
  );
};

export default Signup;
