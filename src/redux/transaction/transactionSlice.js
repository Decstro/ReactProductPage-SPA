import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  currentTransaction: null,
  status: 'idle',
  currentStep: 0
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
        metadata: {},
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
      }
    },
    clearTransaction: (state) => {
      state.currentTransaction = null;
    },
    setPaymentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetPaymentStep: (state) => {
      state.currentStep = 0;
    },
    openPaymentModal: (state) => {
      state.isPaymentOpen = true;
    },
    closePaymentModal: (state) => {
      state.isPaymentOpen = false;
    },
  }
});

export const {
  startTransaction,
  updateTransaction,
  completeTransaction,
  clearTransaction,
  setPaymentStep,
  resetPaymentStep,
  openPaymentModal,
  closePaymentModal,
} = transactionSlice.actions;

export default transactionSlice.reducer;
