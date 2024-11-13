import axios from "axios";
import { cookies } from "next/headers";

const axiosSecure = axios.create({
  baseURL: process.env.BASE_URL,
});

const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(
    async (config) => {
      const cookie = (await cookies()).get(process.env.COOKIE_NAME!);
      const token = cookie ? JSON.parse(process.env.COOKIE_NAME!) : null;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
};
export default useAxiosSecure;
