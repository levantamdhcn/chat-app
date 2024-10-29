import { ThunkDispatch } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputCheckbox from '../../../components/Form/InputCheckbox';
import InputPassword from '../../../components/Form/InputPassword';
import InputText from '../../../components/Form/InputText';
import LoadingScreen from '../../../components/LoadingScreen';
import useAuth from '../../../hooks/useAuth';
import { login } from '../../../store/reducers/auth';
import Logo from "../../../assets/_icon/logo.svg";

export interface SigninInput {
  email: string;
  password: string;
}

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { isFetching, isInitialised, isAuthenticated, errorMessage } =
    useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if(isFetching) return;
    if (isInitialised && isAuthenticated) {
      navigate('/');
      return;
    }
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialised, isAuthenticated]);

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
    <div className="col col-span-12 md:col-span-4 col-start-0 md:col-start-5">
      <div className="text-center mb-4">
        <div className="logo mb-12">
          <img src={Logo} alt="logo" />
          <span className="font-bold text-2xl ml-2 text-bsDark">Chatvia</span>
        </div>
      </div>
      <div className="authorization-content">
        <div className="login">
          <div className="text-center mb-7">
            <h4 className="text-21 font-bold mb-2 text-bsDark">Sign in</h4>
            <span className="text-muted text-bsDark">
              Sign in to continue to Chatvia.
            </span>
          </div>
          <div className="login-form rounded bg-borderColor shadow-md p-10">
            <InputText
              label="Email"
              placeholder="Enter Email"
              value={data.email}
              setValue={(e) => setField('email', e.target.value)}
              required
            />
            <InputPassword
              label="Password"
              placeholder="Enter Password"
              value={data.password}
              setValue={(e) => setField('password', e.target.value)}
              required
            />
            {error !== '' && (
              <span className="mb-4 block text-red-400">{error}</span>
            )}
            <InputCheckbox onChange={() => {}} label={'Remember me'} />

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
            <span className="text-muted text-bsDark">
              Don't have an account ?
            </span>
            <span className="ml-2">
              <a href="/register" className="text-main">
                Signup now
              </a>
            </span>
            <div className="text-muted mt-5 text-bsDark">
              © 2023 Chatvia. Crafted with by Themesbrand
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
