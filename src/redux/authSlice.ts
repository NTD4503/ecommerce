import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile, loginUser } from "./authThunk";
import type { AuthState } from "../types";

const initialState: AuthState = {
  userData: null,
  loading: true,
  isAuthenticated: false,
  loginLoading: false,
  loginError: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      state.userData = null;
      state.isAuthenticated = false;
    },
    clearLoginError: (state) => {
      state.loginError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.userData = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = "";
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loginLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload as string;
      });
  },
});

export const { logout, clearLoginError } = authSlice.actions;
export default authSlice.reducer;
