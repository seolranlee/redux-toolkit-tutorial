import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { comicApi } from './services/comic';
import comicReducer from './features/comic/comicSlice';

export const store = configureStore({
  reducer: {
    [comicApi.reducerPath]: comicApi.reducer,
    comic: comicReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(comicApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
