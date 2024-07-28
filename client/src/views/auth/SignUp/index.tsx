import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useFormik } from 'formik';

import { register } from '../../../store/reducers/auth';
import useAuth from '../../../hooks/useAuth';

import InputText from '../../../components/Form/InputText';
import InputCheckbox from '../../../components/Form/InputCheckbox';
import InputPassword from '../../../components/Form/InputPassword';
import LoadingScreen from '../../../components/LoadingScreen';

import Logo from '../../../assets/_icon/logo.svg';
import { SignUpInput } from '../../../interfaces/auth';
import { signUpValidationSchema } from '../validation';
import { useNavigate } from 'react-router';

const SignUp: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const { isFetching, errorMessage, isAuthenticated, isInitialised, isUserActive } = useAuth();
  const handleSubmit = (data: SignUpInput) => {
    dispatch(register({ data }));
  };

  useEffect(() => {
    if (isInitialised && isAuthenticated && !isUserActive) {
      navigate('/resend-mail');
    }
  }, [isInitialised, isAuthenticated, isUserActive, navigate]);

  const formik = useFormik<SignUpInput>({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
    onSubmit: handleSubmit,
    validationSchema: signUpValidationSchema,
  });

  return (
    <div className="col col-span-12 md:col-span-6 col-start-0 md:col-start-4">
      <div className="text-center mb-4">
        <div className="logo mb-12">
          <img src={Logo} alt="logo" />
          <span className="font-bold text-2xl ml-2 text-bsDark">Chatvia</span>
        </div>
      </div>
      <div className="authorization-content">
        <div className="login">
          <div className="text-center mb-7">
            <h4 className="text-21 font-bold mb-2 text-bsDark">Sign up</h4>
            <span className="text-muted text-bsDark">
              Get your Chatvia account now.
            </span>
          </div>
          <div className="login-form rounded bg-borderColor shadow-md p-10">
            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4">
                <InputText
                  label="Email"
                  placeholder="Enter Email"
                  value={formik.values.email}
                  setValue={formik.handleChange}
                  error={formik.errors.email}
                  required
                  name="email"
                />
                <InputText
                  label="First name"
                  placeholder="Enter first name"
                  value={formik.values.firstName}
                  setValue={formik.handleChange}
                  error={formik.errors.firstName}
                  required
                  name="firstName"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4">
                <InputText
                  label="Last name"
                  placeholder="Enter last name"
                  value={formik.values.lastName}
                  setValue={formik.handleChange}
                  error={formik.errors.lastName}
                  required
                  name="lastName"
                />
                <InputPassword
                  label="Password"
                  placeholder="Enter Password"
                  value={formik.values.password}
                  error={formik.errors.password}
                  required
                  setValue={formik.handleChange}
                  name="password"
                />
              </div>

              <InputCheckbox onChange={() => {}} label={'Remember me'} />

              {errorMessage && <p className="text-red-500 pt-2">{errorMessage}</p>}

              {isFetching ? (
                <LoadingScreen />
              ) : (
                <button
                  className="mt-4 main-btn w-full rounded py-3"
                  type="submit"
                >
                  Sign Up
                </button>
              )}
            </form>
            <div className="mt-12">
              <span className="text-muted text-base text-bsDark">
                By registering you agree to the Chatvia
              </span>
              <span>
                <a href="/register" className="text-main">
                  {' '}
                  Terms of Use
                </a>
              </span>
            </div>
          </div>

          <div className="text-center mt-8">
            <span className="text-muted text-bsDark">
              Already have an account ?
            </span>
            <span className="ml-2">
              <a href="/login" className="text-main">
                Signin
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

export default SignUp;
