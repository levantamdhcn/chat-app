import React, { useState } from 'react';
import InputPassword from '../../../components/Form/InputPassword';
import InputText from '../../../components/Form/InputText';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

  return (
    <div className='login'>
        <div className="login-heading">
            <div className="login-title">
                Sign In
            </div>
        </div>
        <div className="login-form">
            <InputText
                label='Email' 
                placeholder='Enter Password'
                value={email}
                setValue={setEmail}
            />
            <InputPassword
                label='Password' 
                placeholder='Enter Password'
                value={email}
                setValue={setEmail}
            />
        </div>
    </div>
  );
};

export default Login;
