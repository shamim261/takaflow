"use client";
import { createSlice } from "@reduxjs/toolkit";

interface userInfoType {
  name: string;
  email: string;
  phone: string;
  role: "user" | "agent" | "admin";
  isAdmin: boolean;
  token: string;
}

const initialState: { userInfo: userInfoType | null } = {
  userInfo:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo")!)
      : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      if (typeof window !== undefined) {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      }
    },
    logout: (state, action) => {
      state.userInfo = null;
      if (
        typeof window !== undefined &&
        JSON.parse(localStorage.getItem("userInfo")!)
      ) {
        localStorage.removeItem("userInfo");
      }
    },
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
