import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    setUserAsLogin: (state, action) => {
      state.authentication = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.authentication = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserAsLogin, logoutUser } = authenticationSlice.actions;
export const selectUser = (state) => state.authentication.user;
export const selectIsAuthenticated = (state) =>
  state.authentication.isAuthenticated;

export default authenticationSlice.reducer;
