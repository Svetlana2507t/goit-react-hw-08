import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
};
const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload;
      // state.contacts.items = state.contacts.items.filter(item =>
      //   item.name.toLowerCase().includes(action.payload.toLowerCase())
      //);
    },
  },
});

export const filtersSliceReducer = slice.reducer;
export const { changeFilter } = slice.actions;
