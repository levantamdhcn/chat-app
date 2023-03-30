import axios from 'axios';
// import { isValidToken } from '../store/reducers/auth';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(function (config) {
  config.baseURL = process.env.REACT_APP_SERVER_ENDPOINT;

  const token = localStorage.getItem('accessToken');
  if(token) {
    // if(!isValidToken(token)) {
    //   const refreshToken = axios.post()
    // }
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
})

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      // window.location.reload();
    }
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong',
    )
  }
);

export default axiosInstance;