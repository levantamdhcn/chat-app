import axios from 'axios';
import { isValidToken, setSession } from '../store/reducers/auth';

const axiosInstance = axios.create();

const refreshAccessToken = async (token: string): Promise<{
  accessToken: string,
  refreshToken: string
}> => {
  const tokens = await axios.post(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/auth/refreshToken/${token}`)
  return tokens.data;
}

axiosInstance.interceptors.request.use(function (config) {
  config.baseURL = `${process.env.REACT_APP_SERVER_ENDPOINT}/api`;

  const token = localStorage.getItem('accessToken');
  config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = 'application/json';
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'

  return config;
}, function (error) {
  return Promise.reject(error);
})

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry && storedRefreshToken) {
      if (!isValidToken(storedRefreshToken)) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      };
      originalRequest._retry = true;
      const { accessToken, refreshToken } = await refreshAccessToken(storedRefreshToken);
      setSession(accessToken, refreshToken);
      axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
      return axiosInstance(originalRequest);
    }
    return error.response;
  }
);

export default axiosInstance;