import { createSlice } from "@reduxjs/toolkit";

const savedWishList = JSON.parse(localStorage.getItem("wishlistItems")) || [];

const initialState = {
  wishlistItems: savedWishList,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;

      const exists = state.wishlistItems.find(
        (item) => item._id === product._id,
      );

      if (exists) {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item._id !== product._id,
        );
      } else {
        state.wishlistItems.push(product);
      }
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems),
      );
    },

    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== action.payload,
      );
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems),
      );
    },

    clearWishlist: (state) => {
      state.wishlistItems = [];
      localStorage.removeItem("wishlistItems");
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
