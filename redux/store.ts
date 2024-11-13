import userReducer from "@/redux/slices/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: process.env.NODE_ENV! !== "production",
});

export default store;
