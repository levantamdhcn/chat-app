import axios from "axios";
import QueryString from "qs";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: {
    serialize: (params) => {
        return QueryString.stringify(params, { arrayFormat: 'repeat' })
    }
}
});

axiosClient.interceptors.request.use(async (config) => {
  const customHeaders: any = {};

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    customHeaders.Authorization = `Bearer ${accessToken}`;
  }

  return {
    ...config,
    headers: {
      ...customHeaders,  // auto attach token
      ...config.headers, // but you can override for some requests
    }
  };
});

export default axiosClient;