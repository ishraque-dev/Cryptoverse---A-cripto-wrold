import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoAPI';
import { cryptoNewsApi } from '../services/cryptoNews.Api';
const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
});
export default store;
