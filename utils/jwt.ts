import jwt from "jsonwebtoken";
import crypto from "crypto";

const secret =
  process.env.NODE_ENV === "production"
    ? crypto.randomBytes(16).toString("hex")
    : "token";

export const sign = (data: object): string => {
  return jwt.sign(data, secret, { expiresIn: "2d" });
};

export const decode = (token: string): Object => {
  return jwt.verify(token, secret);
};
