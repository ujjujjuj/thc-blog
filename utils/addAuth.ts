import { User } from "@prisma/client";
import Cookies from "cookies";
import { IncomingMessage, ServerResponse } from "http";
import { JsonWebTokenError } from "jsonwebtoken";
import { prisma } from "../prisma/db";
import { decode } from "./jwt";

export default async function addAuth(
  req: IncomingMessage,
  res: ServerResponse
): Promise<User | null> {
  const cookies = new Cookies(req, res);
  if (cookies.get("auth")) {
    let id: number;
    try {
      let decoded: any = decode(cookies.get("auth") ?? "");
      id = decoded.id;
    } catch (e) {
      console.log(e);
      console.log(cookies.get("auth"));
      return null;
    }
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (user) {
      return user;
    }
  }

  return null;
}
