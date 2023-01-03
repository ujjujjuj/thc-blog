import jwt from "jsonwebtoken";

export const sign = (data: object): string => {
  return jwt.sign(data, process.env.JWT_TOKEN as string, { expiresIn: "2d" });
};

export const decode = (token: string): Object => {
  return jwt.verify(token, process.env.JWT_TOKEN as string);
};
