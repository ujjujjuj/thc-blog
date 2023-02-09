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

  if (!("id" in req.body)) {
    return res.status(400).send("");
  }

  if (user.role === "USER") {
    return res.status(401).send("");
  }

  // transfer all blogs to the admin and unpublish them
  await prisma.blog.updateMany({
    where: { authorId: parseInt(req.body.id) },
    data: { authorId: 1, published: false },
  });

  await prisma.user.delete({ where: { id: parseInt(req.body.id) } });

  return res.status(200).send("");
}
