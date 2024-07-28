import { useState } from 'react';

import LoadingScreen from '../../../components/LoadingScreen';
import useAuth from '../../../hooks/useAuth';
import axiosInstance from '../../../configuration/axios';

import Logo from '../../../assets/_icon/logo.svg';

export interface SigninInput {
  email: string;
  password: string;
}

export const ResendMail = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const onSubmit = async () => {
    setLoading(true);
    try {
      await axiosInstance.post(
        `${
          process.env.REACT_APP_SERVER_ENDPOINT as string
        }/api/auth/resendMail`,
        { email: user?.email }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col col-span-12 md:col-span-5 col-start-0 md:col-start-5">
      <div className="text-center mb-4">
        <div className="logo mb-12">
          <img src={Logo} alt="logo" />
          <span className="font-bold text-2xl ml-2 text-bsDark">Chatvia</span>
        </div>
      </div>
      <div className="authorization-content">
        <div className="login">
          <div className="text-center mb-7">
            <h4 className="text-21 font-bold mb-2 text-bsDark capitalize">
              Your email has been sent successfully!
            </h4>
            <span className="text-bsDark">
              Check your email for activation OR
            </span>
          </div>
          <div className="login-form rounded bg-card-dark p-10">
            {loading ? (
              <LoadingScreen />
            ) : (
              <button
                className="mt-4 main-btn w-full rounded py-3"
                onClick={onSubmit}
              >
                Resend Email
              </button>
            )}
          </div>

          <div className="text-center mt-12">
            <span className="text-bsDark">Already have an account ?</span>
            <span className="ml-2">
              <a href="/login" className="text-main">
                Sign In
              </a>
            </span>
            <div className="text-bsDark mt-5">
              © 2023 Chatvia. Crafted with by Themesbrand
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
