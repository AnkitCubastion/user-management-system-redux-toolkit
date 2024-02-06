import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    updateUserList: (state, { payload }) => {
      state.users = payload;
    },
  },
});

export const { updateUserList } = userSlice.actions;
export const selectUsers = (state) => state.user.users;

export default userSlice.reducer;
