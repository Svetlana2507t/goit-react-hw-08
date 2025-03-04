import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const apiContacts = axios.create({
  baseURL: `https://67b4a19ca9acbdb38ecfc7e8.mockapi.io/contacts/`,
});
//axios.defaults.baseURL = `https://67b4a19ca9acbdb38ecfc7e8.mockapi.io/contacts/`;

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  //async ({ signal }, thunkAPI) => {
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          'https://67b4a19ca9acbdb38ecfc7e8.mockapi.io/contacts/contacts'
        )}`
      );
      const parsedData = JSON.parse(response.data.contents);

      // const response = await apiContacts.get('/contacts', { signal });
      console.log('API Response:', response);
      console.log('API Response Data:', response.data);
      return parsedData;

      //return response.data;
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

export const addContacts = createAsyncThunk(
  'contacts/addContact',
  async (body, thunkAPI) => {
    try {
      const response = await apiContacts.post('/contacts', body);
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
      const response = await apiContacts.delete(`/contacts/${id}`);
      return response.data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await apiContacts.patch(`/contacts/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
