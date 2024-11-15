"use client";
import { selectorStateType } from "@/types";
import axios from "axios";
import { useSelector } from "react-redux";

const axiosSecure = axios.create({
  baseURL: process.env.BASE_URL,
});

const useAxiosSecure = () => {
  const { userInfo } = useSelector((state: selectorStateType) => state.user);
  axiosSecure.interceptors.request.use(
    async (config) => {
      const token = userInfo.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  return axiosSecure;
};
export default useAxiosSecure;
