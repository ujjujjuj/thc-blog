import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import getAuth from "../../../utils/getAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.body.blogId) {
    return res.status(400).send("");
  }
  req.body.blogId = parseInt(req.body.blogId);

  let user = await getAuth(req, res);
  if (!user) {
    return res.status(401).send("");
  }

  let blog = await prisma.blog.update({
    where: { id: req.body.blogId },
    data: { content: req.body.content, published: req.body.published },
  });

  return res.send("");
}
