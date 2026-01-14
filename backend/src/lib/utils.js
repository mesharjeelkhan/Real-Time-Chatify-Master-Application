import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

console.log("🔥 utils.js LOADED");

export const generateToken = (userId, res) => {
  const JWT_SECRET = ENV.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  console.log("✅ JWT generated");

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: ENV.NODE_ENV !== "development",
  });

  return token;
};
