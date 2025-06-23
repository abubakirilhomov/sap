import axios from 'axios';
import { store } from '../redux/store';
import { updateAccessToken, logout } from '../redux/slices/authSlice';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// === REQUEST INTERCEPTOR ===
instance.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// === RESPONSE INTERCEPTOR ===
instance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // --- Попытка обновить токен только один раз ---
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = store.getState().auth.refreshToken;

      if (!refreshToken) {
        store.dispatch(logout());
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/refresh/`,
          { refresh_token: refreshToken },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );

        const newAccessToken = response.data.access_token;
        store.dispatch(updateAccessToken(newAccessToken));

        // Повторный запрос с новым токеном
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);

      } catch (refreshError) {
        // Если не удалось обновить — принудительный выход
        store.dispatch(logout());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Обработка 403 и прочих случаев: если явно запрещено
    if (status === 403) {
      store.dispatch(logout());
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default instance;
