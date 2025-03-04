import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const apiAuth = axios.create({
  baseURL: `https://connections-api.goit.global/`,
});
//axios.defaults.baseURL = `https://connections-api.goit.global/`;

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (body, thunkAPI) => {
    try {
      console.log('Sending body:', body);
      const { data } = await apiAuth.post('users/signup', body);
      //const { data } = await axios.post('users/signup', body);
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      if (error.response?.data?.code === 11000) {
        return 'This email is already registered.';
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (body, thunkAPI) => {
    try {
      console.log('Log-in:', body);
      const { data } = await apiAuth.post('users/login', body);
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (body, thunkAPI) => {
    try {
      console.log('Log-out:', body);
      const { data } = await apiAuth.post('users/logout', body);
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCurrentThunk = createAsyncThunk(
  'auth/current',
  async (body, thunkAPI) => {
    try {
      console.log('Get current user info:', body);
      const { data } = await apiAuth.get('users/current', body);
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await apiAuth.get('/contacts');
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     } //
//   }
// );
