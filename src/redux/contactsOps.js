import axios from 'axios';
//import { fetchInProgress, fetchSuccess, fetchError } from './contactsSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = `https://67b4a19ca9acbdb38ecfc7e8.mockapi.io/contacts/`;

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async ({ signal }, thunkAPI) => {
    try {
      const response = await axios.get('/contacts', { signal });
      // console.log('response.data:', response.data);

      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request cancelled with AbortController');
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const addContacts = createAsyncThunk(
  'contacts/addContact',
  async (body, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', body);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      return response.data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
