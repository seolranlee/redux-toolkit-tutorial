import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComicRankItem } from '../../services/comic';
import { filters } from '../../models/filter';
export interface Filter {
  label: string;
  id: string;
  key: string;
  isSelected: boolean;
}
interface ComicState {
  page: number;
  comics: ComicRankItem[];
  filters: Filter[];
  filteredComics: ComicRankItem[];
}

// Define the initial state using that type
const initialState: ComicState = {
  page: 1,
  comics: [],
  filters,
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
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filters.map(filter => {
        if (action.payload.label === filter.label) {
          filter.isSelected = !filter.isSelected;
        }
        if (action.payload.key === 'scheduled') {
          if (filter.key === 'completed') filter.isSelected = false;
        }
        if (action.payload.key === 'completed') {
          if (filter.key === 'scheduled') filter.isSelected = false;
        }
      });
    },
  },
});

export const { addPage, addComic, setFilter } = comicSlice.actions;

export default comicSlice.reducer;
