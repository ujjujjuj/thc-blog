import { User } from "@prisma/client";
import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../prisma/db";
import { decode } from "./jwt";

export default async function addAuth(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<User | undefined> {
  const cookies = new Cookies(req, res);
  if (cookies.get("auth")) {
    let id: number;
    try {
      let decoded: any = decode(cookies.get("auth") ?? "");
      id = decoded.id;
    } catch (e) {
      console.log(e);
      return undefined;
    }
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (user) {
      return user;
    }
  }

  return undefined;
}
