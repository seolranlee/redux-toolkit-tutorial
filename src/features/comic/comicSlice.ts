import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComicRankItem } from '../../services/comic';
interface ComicState {
  page: number;
  comics: ComicRankItem[];
  filters: string[];
  filteredComics: ComicRankItem[];
}

// Define the initial state using that type
const initialState: ComicState = {
  page: 1,
  comics: [],
  filters: [],
  filteredComics: [],
  // filter배열
};

export const comicSlice = createSlice({
  name: 'comic',
  initialState,
  reducers: {
    addPage: state => {
      state.page += 1;
    },
    addComic: (state, action: PayloadAction<ComicRankItem[]>) => {
      state.comics = state.comics.concat(action.payload);
    },
    filterComics: state => {
      if (state.filters.includes('free')) {
        state.filteredComics = state.comics.filter(
          comic => comic.freedEpisodeSize >= 10
        );
      } else {
        state.filteredComics = state.comics;
      }
    },
    setFilters: state => {
      if (state.filters.includes('free'))
        state.filters = state.filters.filter(filter => filter !== 'free');
      else state.filters.push('free');
    },
  },
});

export const { addPage, addComic, filterComics, setFilters } =
  comicSlice.actions;

export default comicSlice.reducer;
