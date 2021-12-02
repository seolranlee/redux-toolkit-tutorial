import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
// import { todoApi } from './services/todo';
import { comicApi } from './services/comic';
import counterReducer from './features/couter/counterSlice';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    // [todoApi.reducerPath]: todoApi.reducer,
    [comicApi.reducerPath]: comicApi.reducer,
    counter: counterReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(comicApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
