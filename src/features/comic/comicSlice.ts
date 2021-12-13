import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComicRankItem } from '../../services/comic';
import { filters } from '../../models/filter';
// Define a type for the slice state
interface FilterItem {
  label: string;
  key: string;
  checked: boolean;
  condition: (comic: ComicRankItem) => boolean;
}
interface ComicState {
  page: number;
  comics: ComicRankItem[];
  filters: FilterItem[];
}

// Define the initial state using that type
const initialState: ComicState = {
  page: 1,
  comics: [],
  // filter배열
  filters,
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

      filters.map(filter => {
        if (filter.checked) {
          state.comics = state.comics.filter(filter.condition);
        } else {
          return false;
        }
      });
      // // 연재중
      // if (state.filters.includes('free')) {
      //   state.comics = state.comics.filter(
      //     (comic: ComicRankItem) => comic.freedEpisodeSize >= 3
      //   );
      // }

      // // 무료회차 3화 이상
      // if (state.filters.includes('free')) {
      //   state.comics = state.comics.filter(
      //     (comic: ComicRankItem) => comic.freedEpisodeSize >= 3
      //   );
      // }
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

export const { addPage, addComic } = comicSlice.actions;

export default comicSlice.reducer;
