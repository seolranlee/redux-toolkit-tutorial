import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComicRankItem } from '../../services/comic';

// Define a type for the slice state
interface ComicState {
  page: number;
  comics: ComicRankItem[];
  filters: string[];
}

// Define the initial state using that type
const initialState: ComicState = {
  page: 1,
  comics: [],
  // filter배열
  filters: [],
};

export const comicSlice = createSlice({
  name: 'comic',
  initialState,
  reducers: {
    addPage: state => {
      state.page += 1;
    },
    addComic: (state, action: PayloadAction<ComicRankItem[]>) => {
      if (state.filters.includes('free'))
        state.comics = state.comics
          .concat(action.payload)
          .filter((comic: ComicRankItem) => comic.freedEpisodeSize >= 10);
      else state.comics = state.comics.concat(action.payload);
    },

    setFilter: state => {
      state.filters = state.filters.concat(['free']);
      if (state.filters.includes('free'))
        state.comics = state.comics.filter(
          (comic: ComicRankItem) => comic.freedEpisodeSize >= 10
        );
    },
    // setFilter: state => {
    //   state.filters = state.filters.concat(['free']);
    //   console.log(state.filters);
    //   if (state.filters.includes('free'))
    //     state.comics = state.comics.filter(
    //       (comic: ComicRankItem) => comic.freedEpisodeSize >= 10
    //     );
    // },
    // filterComicFree: state => {
    //   state.comics = state.comics.filter(
    //     (comic: ComicRankItem) => comic.freedEpisodeSize >= 10
    //   );
    // },
    // filterComicState: state => {
    //   state.comics = state.comics.filter(
    //     (comic: ComicRankItem) => comic.contentsState === 'scheduled'
    //   );
    // },
  },
});

export const { addPage, addComic, setFilter } = comicSlice.actions;

export default comicSlice.reducer;
