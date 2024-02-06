import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import authenticationReducer from "./features/authentication/authenticationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    authentication: authenticationReducer,
  },
});
