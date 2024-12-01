import { createSlice } from '@reduxjs/toolkit';

const deckSlice = createSlice({
  name: 'deck',
  initialState: {
    selectedItem: null,
  },
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
});

export const { setSelectedItem } = deckSlice.actions;

export default deckSlice.reducer;