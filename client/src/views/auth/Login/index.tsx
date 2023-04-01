import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputCheckbox from "../../../components/Form/InputCheckbox";
import InputPassword from "../../../components/Form/InputPassword";
import InputText from "../../../components/Form/InputText";
import LoadingScreen from "../../../components/LoadingScreen";
import { AppDispatch } from "../../../configuration/store";
import useAuth from "../../../hooks/useAuth";
import { login } from "../../../store/reducers/auth";

export interface SigninInput {
  email: string;
  password: string;
}

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { isFetching, isSuccess, isError } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    if (isError) {
      setError("error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  const setField = (field: string, value: string) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  const onSubmit = (data: SigninInput) => {
    dispatch(login({ data }));
  };

  return (
    <div className="login">
      <div className="text-center mb-7">
        <h4 className="text-21 font-bold mb-2 text-grey-700">Sign in</h4>
        <span className="text-muted">Sign in to continue to Chatvia.</span>
      </div>
      <div className="login-form rounded bg-card-dark p-10">
        <InputText
          label="Email"
          placeholder="Enter Email"
          value={data.email}
          setValue={(e) => setField("email", e.target.value)}
        />
        <InputPassword
          label="Password"
          placeholder="Enter Password"
          value={data.password}
          setValue={(e) => setField("password", e.target.value)}
        />
        {error !== "" && <span>{error}</span>}
        <InputCheckbox onChange={() => {}} label={"Remember me"} />

        {isFetching ? (
          <LoadingScreen />
        ) : (
          <button
            className="mt-4 main-btn w-full rounded py-3"
            onClick={() => onSubmit(data)}
          >
            Sign in
          </button>
        )}
      </div>

      <div className="text-center mt-12">
        <span className="text-muted">Don't have an account ?</span>
        <span className="ml-2">
          <a href="/register" className="text-main">
            Signup now
          </a>
        </span>
        <div className="text-muted mt-5">
          © 2023 Chatvia. Crafted with by Themesbrand
        </div>
      </div>
    </div>
  );
};

export default Login;

