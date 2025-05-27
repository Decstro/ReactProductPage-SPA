import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  selectedProduct: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'xbox-series-x',
            name: 'Xbox Series X',
            price: 499.99,
            stock: 15,
            images: [],
            rating: 4.5,
            description: 'Experience next-gen 4K gaming at 120 FPS'
          },
          {
            id: 'xbox-series-s',
            name: 'Xbox Series S',
            price: 299.99,
            stock: 8,
            images: [],
            rating: 4.3,
            description: 'All-digital 1440p gaming'
          }
        ]);
      }, 500); // Simulate network delay
    });
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    updateProductImages: (state, action) => {
      const { productId, images } = action.payload;
      const product = state.items.find(item => item.id === productId);
      if (product) {
        product.images = images;
      }
    },
    updateStock: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.items.find(item => item.id === productId);
      if (product) {
        product.stock -= quantity;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setSelectedProduct, updateProductImages } = productSlice.actions;
export default productSlice.reducer;
