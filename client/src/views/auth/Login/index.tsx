import React, { useState } from "react";
import InputCheckbox from "../../../components/Form/InputCheckbox";
import InputPassword from "../../../components/Form/InputPassword";
import InputText from "../../../components/Form/InputText";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          value={email}
          setValue={setEmail}
        />
        <InputPassword
          label="Password"
          placeholder="Enter Password"
          value={password}
          setValue={setPassword}
        />
        <InputCheckbox onChange={() => {}} label={"Remember me"}/>

        <button className="mt-4 main-btn w-full rounded py-3">Sign in</button>
      </div>

      <div className="text-center mt-12">
        <span className="text-muted">Don't have an account ?</span>
        <span className="ml-2"><a href="/register" className="text-main">Signup now</a></span>
        <div className="text-muted mt-5">© 2023 Chatvia. Crafted with by Themesbrand</div>
      </div>
    </div>
  );
};

export default Login;
