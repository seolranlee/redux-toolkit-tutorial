import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComicRankItem } from '../../services/comic';
import { filters } from '../../models/filter';
export interface Filter {
  label: string;
  key: string;
  isSelected: boolean;
}
interface ComicState {
  comics: ComicRankItem[];
  filters: Filter[];
}

// Define the initial state using that type
const initialState: ComicState = {
  comics: [],
  filters,
};

export const comicSlice = createSlice({
  name: 'comic',
  initialState,
  reducers: {
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

export const { addComic, setFilter } = comicSlice.actions;

export default comicSlice.reducer;
