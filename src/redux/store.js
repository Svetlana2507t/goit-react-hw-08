import { configureStore } from '@reduxjs/toolkit';
import { contactsSliceReducer } from './contacts/contactsSlice';
import { filtersSliceReducer } from './filters/filtersSlice';
import { authReducer } from './auth/authSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsSliceReducer,
    filters: filtersSliceReducer,
    auth: authReducer,
  },
});
