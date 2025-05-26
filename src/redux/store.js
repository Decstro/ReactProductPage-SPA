import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import productReducer from './product/productSlice';
import transactionReducer from './transaction/transactionSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['products', 'transactions'], // Only persist these slices
  version: 1,
  migrate: (state) => Promise.resolve(state)
};

// Combine reducers
const rootReducer = combineReducers({
  products: productReducer,
  transactions: transactionReducer
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

export const persistor = persistStore(store);
