import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from './contactsOps';
import { addContacts, deleteContacts } from './contactsOps';
import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter } from './filtersSlice';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',

  initialState,

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload || [];
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addContacts.pending, state => {
        state.loading = true;
      })
      .addCase(addContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContacts.pending, state => {
        state.loading = true;
      })
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const contactsSliceReducer = contactsSlice.reducer;

export const selectContactsState = state => state.contacts;

export const selectLoading = createSelector(
  selectContactsState,
  contacts => contacts.loading
);

export const selectError = createSelector(
  selectContactsState,
  contacts => contacts.error
);

//export const selectContacts = state => state.contacts?.items || [];
//export const selectLoading = state => state.contacts.loading;
//export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [state => selectContactsState(state)?.items || [], selectNameFilter],
  (contacts, nameFilter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(nameFilter.trim().toLowerCase())
    );
  }
);
