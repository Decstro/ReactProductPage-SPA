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
      state.currentTransaction = {
        ...action.payload,
        status: 'pending',
        createdAt: new Date().toISOString(),
        payment: null,
        shipping: null,
        metadata: {} // For any additional data
      };
    },
    updateTransaction: (state, action) => {
      if (state.currentTransaction) {
        state.currentTransaction = {
          ...state.currentTransaction,
          ...action.payload,
          // Preserve status unless explicitly updated
          status: action.payload.status || state.currentTransaction.status,
          updatedAt: new Date().toISOString()
        };
      }
    },
    completeTransaction: (state) => {
      if (state.currentTransaction) {
        state.items.push({
          ...state.currentTransaction,
          status: 'completed',
          completedAt: new Date().toISOString()
        });
        state.currentTransaction = null;
      }
    },
    clearTransaction: (state) => {
      state.currentTransaction = null;
    }
  }
});

export const {
  startTransaction,
  updateTransaction,
  completeTransaction,
  clearTransaction
} = transactionSlice.actions;

export default transactionSlice.reducer;
