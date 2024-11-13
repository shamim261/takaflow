"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState: object = {
  userInfo:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo")!)
      : null, // {{ edit_1 }}
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {},
    logout: (state, action) => {},
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
