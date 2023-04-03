import axios from 'axios';

const axiosInstance = axios.create();

const refreshAccessToken = async (): Promise<{
  accessToken: string,
  refreshToken: string
}> => {
  const refreshToken = localStorage.getItem('refreshToken');

  const tokens = await axios.post(`/auth/refreshToken/${refreshToken}`)
  return tokens.data;
}

axiosInstance.interceptors.request.use(function (config) {
  config.baseURL = `${process.env.REACT_APP_SERVER_ENDPOINT}/api`;

  const token = localStorage.getItem('accessToken');
  console.log('token', token);
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
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokens = await refreshAccessToken();
      axios.defaults.headers.common.Authorization = 'Bearer ' + tokens.accessToken;
      return axiosInstance(originalRequest);
    }
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
    };
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong',
    )
  }
);

export default axiosInstance;