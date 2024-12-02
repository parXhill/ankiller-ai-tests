import { createSlice } from '@reduxjs/toolkit';

const deckSlice = createSlice({
  name: 'deck',
  initialState: {
    selectedDeck: null,
  },
  reducers: {
    setSelectedDeck: (state, action) => {
      state.selectedDeck = action.payload;
    },
  },
});

export const { setSelectedDeck } = deckSlice.actions;

export default deckSlice.reducer;