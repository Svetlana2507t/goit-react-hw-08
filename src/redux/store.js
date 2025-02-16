import { configureStore } from '@reduxjs/toolkit';
import { contactsSliceReducer } from './contactsSlice';
import { filtersSliceReducer } from './filtersSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsSliceReducer,
    filters: filtersSliceReducer,
  },
});

// state = {
//   contacts: {
//        contacts: { items: [/* ... */] }
//              },
//   filters: {
//        filters: {name: ...}
//            }
// }
