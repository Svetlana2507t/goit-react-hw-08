import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const apiContacts = axios.create({
  baseURL: 'https://connections-api.goit.global/',
});

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async ({ signal }, thunkAPI) => {
    try {
      const res = await apiContacts.get('/contacts', { signal });
      console.log('API Response:', res);
      console.log('API Response Data:', res.data);
      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request cancelled with AbortController');
      } else {
        console.error('Error fetching contacts:', error);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
