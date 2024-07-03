import { createSlice } from '@reduxjs/toolkit';
import authApi from './authApi';

import { SerializedError } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  error: null as SerializedError | null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
