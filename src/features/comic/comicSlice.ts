import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

// Define a type for the slice state
interface ComicState {
  page: number;
}

// Define the initial state using that type
const initialState: ComicState = {
  page: 1,
};

export const comicSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.page += 1;
    },
  },
});

export const { increment } = comicSlice.actions;

export default comicSlice.reducer;
