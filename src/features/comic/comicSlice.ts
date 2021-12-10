import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComicRankItem } from '../../services/comic';

// Define a type for the slice state
interface ComicState {
  page: number;
  comics: ComicRankItem[];
}

// Define the initial state using that type
const initialState: ComicState = {
  page: 1,
  comics: [],
};

export const comicSlice = createSlice({
  name: 'comic',
  initialState,
  reducers: {
    addPage: state => {
      state.page += 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addComic: (state, action: PayloadAction<ComicRankItem[]>) => {
      console.log('addComic');
      state.comics = state.comics.concat(action.payload);
    },
  },
});

export const { addPage, addComic } = comicSlice.actions;

export default comicSlice.reducer;
