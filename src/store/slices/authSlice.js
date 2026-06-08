import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  authLoading: true,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    setUser: (state, action) => {
  state.user = action.payload;
  state.isAuthenticated = true;
  state.authLoading = false;
},
   logoutUser: (state) => {
  state.user = null;
  state.isAuthenticated = false;
  state.authLoading = false;
},
setAuthLoading: (state, action) => {
  state.authLoading = action.payload;
},

  },
});

export const { setUser, logoutUser ,setAuthLoading} =
  authSlice.actions;

export default authSlice.reducer;