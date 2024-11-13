import jwt from "jsonwebtoken";
// const jwt = require("jsonwebtoken");

export interface tokenDataTypes {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "agent" | "admin";
  isAdmin: boolean;
}

export const generateToken = ({
  _id,
  name,
  email,
  phone,
  role,
  isAdmin,
}: tokenDataTypes) => {
  const secret = "XdJzbcCjLnLoXzHS645odEe";
  const userObj = {
    _id,
    name,
    email,
    phone,
    role,
    isAdmin,
  };

  if (secret) {
    try {
      return jwt.sign(userObj, secret.toString(), {
        expiresIn: "7d", // customize based on your requirement
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new Error("Secret not found!");
  }
};

export const isValidToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

export const isTokenExpired = (token: string) => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split(".")[1]));
  const currentTime = Date.now() / 1000; // Current time in seconds
  return payload.exp < currentTime;
};
