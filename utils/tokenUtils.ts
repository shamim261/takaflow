import jwt from "jsonwebtoken";

interface tokenDataTypes {
  name: string;
  email: string;
  phone: string;
  role: "user" | "agent" | "admin";
  isAdmin: boolean;
}

export const generateToken = (data: tokenDataTypes) => {
  return jwt.sign(data, process.env.JWT_SECRET!, {
    expiresIn: "7d", // customize based on your requirement
  });
};

export const isValidToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
