import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from './contactsOps';
import { addContacts, deleteContacts, editContact } from './contactsOps';
import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter } from '../filters/filtersSlice';

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
        console.log('fetchContacts.fulfilled: Data received:', action.payload);
        state.loading = false;
        state.error = null;
        //state.items = action.payload;
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
        console.error('fetchContacts.rejected: Error:', action.payload);
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
      })
      .addCase(editContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
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

export const selectFilteredContacts = createSelector(
  [state => selectContactsState(state)?.items || [], selectNameFilter],
  (contacts, nameFilter) => {
    return contacts.length > 0
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(nameFilter.trim().toLowerCase())
        )
      : [];
  }
);

// export const selectFilteredContacts = createSelector(
//   [state => selectContactsState(state)?.items || [], selectNameFilter],
//   (contacts, nameFilter) => {
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(nameFilter.trim().toLowerCase())
//     );
//   }
// );
