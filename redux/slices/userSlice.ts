"use client";
import { userInfoType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

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
    logout: (state) => {
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
