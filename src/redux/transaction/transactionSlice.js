import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  currentTransaction: null,
  status: 'idle'
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    startTransaction: (state, action) => {
      state.currentTransaction = action.payload;
    },
    completeTransaction: (state, action) => {
      state.items.push(action.payload);
      state.currentTransaction = null;
    },
    clearTransaction: (state) => {
      state.currentTransaction = null;
    }
  }
});

export const { startTransaction, completeTransaction, clearTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
