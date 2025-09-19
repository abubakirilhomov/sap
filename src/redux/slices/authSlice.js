import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo } from './authThunk';

const initialState = {
  userInfo: null,
  role: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { userInfo, role, accessToken, refreshToken } = action.payload;
      state.loading = false;
      state.userInfo = userInfo;
      state.role = role;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.error = null;
      state.isAuthenticated = true;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", role);
      localStorage.setItem("isAuthenticated", true);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    restoreAuth: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.role = action.payload.role;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userInfo = null;
      state.role = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;

      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateAccessToken,
  restoreAuth,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
