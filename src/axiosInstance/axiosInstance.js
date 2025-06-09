import axios from 'axios';
import { store } from '../redux/store';
import { updateAccessToken, logout } from '../redux/slices/authSlice';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = store.getState().auth.refreshToken;
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/refresh/`, {
          refresh_token: refreshToken,
        });
        const newAccessToken = response.data.access_token;
        store.dispatch(updateAccessToken(newAccessToken));
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (e) {
        store.dispatch(logout());
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
