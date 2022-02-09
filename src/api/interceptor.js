import axios from "axios";
import { useSelector } from "react-redux";
import { selectUserToken } from "../features/user/userSlice";
import getAccessToken from "../utils/accessToken";

const currentUserAccessToken = useSelector(selectUserToken);

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${currentUserAccessToken}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const originalRequest = err.config;

    if (err.response.status === 401 && !originalRequest._retry) {
      const newAccessToken = await getAccessToken();

      originalRequest._retry = true;
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

      return instance(originalRequest);
    }

    return Promise.reject(err);
  }
);

export default instance;
