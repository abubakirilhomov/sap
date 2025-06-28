import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axiosInstance/axiosInstance';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  updateAccessToken,
  logout,
} from './authSlice';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(loginStart());
      const response = await axios.post('/auth/login', credentials);
      const data = response.data;

      dispatch(loginSuccess(data));
      return data;
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || 'Login failed'));
      return rejectWithValue(err.response?.data);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const refreshToken = getState().auth.refreshToken;

    if (!refreshToken) {
      dispatch(logout());
      return rejectWithValue('No refresh token');
    }

    try {
      const response = await axios.post('/auth/refresh', { refreshToken });
      const { accessToken } = response.data;

      dispatch(updateAccessToken(accessToken));
      return accessToken;
    } catch (err) {
      dispatch(logout());
      return rejectWithValue('Unable to refresh token');
    }
  }
);
