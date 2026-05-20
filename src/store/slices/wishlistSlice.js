import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;

      const exists = state.wishlistItems.find(
        (item) => item.id === product.id
      );

      if (exists) {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item.id !== product.id
        );
      } else {
        state.wishlistItems.push(product);
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload
      );
    },

    clearWishlist: (state) => {
      state.wishlistItems = [];
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;