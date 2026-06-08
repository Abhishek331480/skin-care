import { createSlice } from "@reduxjs/toolkit";

const savedCompareItems =
  JSON.parse(localStorage.getItem("compareItems")) || [];

const initialState = {
  compareItems: savedCompareItems,
};

const compareSlice = createSlice({
  name: "compare",

  initialState,

  reducers: {
    addToCompare: (state, action) => {
      const product = action.payload;

      const exists = state.compareItems.find(
        (item) => item._id === product._id
      );

      if (exists) return;

      if (state.compareItems.length >= 3) return;

      state.compareItems.push(product);

      localStorage.setItem(
        "compareItems",
        JSON.stringify(state.compareItems)
      );
    },

    removeFromCompare: (state, action) => {
      state.compareItems = state.compareItems.filter(
        (item) => item._id !== action.payload
      );

      localStorage.setItem(
        "compareItems",
        JSON.stringify(state.compareItems)
      );
    },

    clearCompare: (state) => {
      state.compareItems = [];

      localStorage.removeItem("compareItems");
    },
  },
});

export const {
  addToCompare,
  removeFromCompare,
  clearCompare,
} = compareSlice.actions;

export default compareSlice.reducer;