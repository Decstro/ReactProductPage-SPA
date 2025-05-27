import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 'xbox-series-x',
      name: 'Xbox Series X',
      price: 499.99,
      images: [],
      rating: 4.5,
      description: 'Experience next-gen 4K gaming at 120 FPS'
    },
    {
      id: 'xbox-series-s',
      name: 'Xbox Series S',
      price: 299.99,
      images: [],
      rating: 4.3,
      description: 'All-digital 1440p gaming'
    }
  ],
  selectedProduct: null,
  status: 'idle'
};
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
    }
  }
});

export const { setSelectedProduct, updateProductImages } = productSlice.actions;
export default productSlice.reducer;
