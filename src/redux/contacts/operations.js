import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const apiContacts = axios.create({
  baseURL: 'https://connections-api.goit.global/',
});

export const setContactsHeader = token => {
  apiContacts.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  console.log(
    '🔐 Contacts Auth header set:',
    apiContacts.defaults.headers.common['Authorization']
  );
};

export const clearContactsHeader = () => {
  apiContacts.defaults.headers.common.Authorization = ``;
  console.log('🔓 Contacts Auth headers cleared.');
};

// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchAll',
//   async ({ signal }, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.token;
//       if (!token) {
//         console.warn('🚨 No token found. User might not be logged in.');
//         return thunkAPI.rejectWithValue('No authentication token found');
//       }
//       //set token:
//       setContactsHeader(token);

//       console.log('🚀 Fetching contacts with token:', token);

//       const res = await apiContacts.get('/contacts', { signal });

//       console.log('✅ API Response:', res);
//       console.log('✅ Contacts fetched:', res.data);

//       return res.data;
//     } catch (error) {
//       if (axios.isCancel(error)) {
//         console.log('Request cancelled with AbortController');
//       } else {
//         console.error('Error fetching contacts:', error);

//         return thunkAPI.rejectWithValue(error.message);
//       }
//     }
//   }
// );

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) {
        console.warn('🚨 No token found. User might not be logged in.');
        return thunkAPI.rejectWithValue('No authentication token found');
      }
      //set token:
      setContactsHeader(token);

      console.log('🚀 Fetching contacts with token:', token);

      const res = await apiContacts.get('/contacts');

      console.log('✅ API Response:', res);
      console.log('✅ Contacts fetched:', res.data);

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

export const addContacts = createAsyncThunk(
  'contacts/addContact',
  async (body, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) {
        return thunkAPI.rejectWithValue('No authentication token found');
      }
      setContactsHeader(token);
      console.log('📤 Sending contact data:', body);

      const response = await apiContacts.post('/contacts', body);

      console.log('✅ Contact added:', response.data);
      return response.data;
    } catch (error) {
      console.error(' Error adding contact:', error);
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
      console.log('Editing contact id:', id);

      const response = await apiContacts.patch(`/contacts/${id}`, updatedData);
      console.log('updatedData: response', response);

      return response.data;
    } catch (error) {
      console.error('Error editing contact:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
