import { createSlice } from '@reduxjs/toolkit';
import { registerThunk } from './authOperations';
import { loginThunk } from './authOperations';

const initialState = {
  //not contact! user!
  user: {
    name: '',
    email: '',
  },
  token: null,
  loading: false,
  error: null,
  isLoggedIn: false,
  isRefreshing: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerThunk.pending, state => {
        state.loading = true;
      })
      .addCase(loginThunk.pending, state => {
        state.loading = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const authReducer = authSlice.reducer;
