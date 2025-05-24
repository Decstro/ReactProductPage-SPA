import { configureStore } from '@reduxjs/toolkit';
import productReducer from './product/productSlice';
import transactionReducer from './transaction/transactionSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    transactions: transactionReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store;
