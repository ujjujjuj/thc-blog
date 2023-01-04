import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import getAuth from "../../../utils/addAuth";
import { hash } from "../../../utils/password";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let user = await getAuth(req, res);
  if (!user) {
    return res.status(401).send("");
  }

  if (!("id" in req.body)) {
    return res.status(400).send("");
  }

  if (user.role === "USER") {
    return res.status(401).send("");
  }

  await prisma.user.update({
    where: { id: parseInt(req.body.id) },
    data: {
      password: hash("password"),
    },
  });

  return res.status(200).send("");
}
