import { decodeJwt, jwtVerify, SignJWT } from "jose";
import encoder from "./encoder";

export interface tokenDataTypes {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "agent" | "admin";
  isAdmin: boolean;
}

export const generateToken = async ({
  _id,
  name,
  email,
  phone,
  role,
  isAdmin,
}: tokenDataTypes) => {
  const secret = encoder(process.env.JWT_SECRET!);
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
      const token = await new SignJWT(userObj)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);

      return token;
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new Error("Secret not found!");
  }
};

export const isValidToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(
      token,
      encoder(process.env.JWT_SECRET!)
    );

    return payload;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const isTokenExpired = (token: string) => {
  const { exp } = decodeJwt(token);

  // If there's no expiration (`exp`), consider it expired
  if (!exp) {
    return true;
  }

  // Compare `exp` with the current timestamp
  const currentTimestamp = Math.floor(Date.now() / 1000); // seconds
  return exp < currentTimestamp;
};
