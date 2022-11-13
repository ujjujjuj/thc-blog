import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import getAuth from "../../../utils/addAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let user = await getAuth(req, res);
  if (!user) {
    return res.status(401).send("");
  }

  let id = req.body.id;
  if (!id) {
    return res.status(400).send("");
  }
  await prisma.blog.delete({ where: { id: parseInt(id) } });

  return res.send("");
}
