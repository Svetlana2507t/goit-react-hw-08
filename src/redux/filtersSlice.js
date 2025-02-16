import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    name: '',
  },
};
const slice = createSlice({
  name: 'filtersSlice',
  initialState,
  reducers: {
    filter: (state, action) => {
      state.filters.name = action.payload;
      // state.contacts.items = state.contacts.items.filter(item =>
      //   item.name.toLowerCase().includes(action.payload.toLowerCase())
      //);
    },
  },
});

export const filtersSliceReducer = slice.reducer;
export const { filter } = slice.actions;
