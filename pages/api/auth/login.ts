import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { sign } from "../../../utils/jwt";
import { compare } from "../../../utils/password";
import Cookies from "cookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("");
  }
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  if (user === null || !compare(req.body.password, user.password)) {
    return res.status(401).send("");
  } else {
    const cookies = new Cookies(req, res);
    cookies.set("auth", sign({ id: user.id }));
    return res.status(200).send("");
  }
}
