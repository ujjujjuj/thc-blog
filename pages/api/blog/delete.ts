import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import getAuth from "../../../utils/addAuth";
import generateTitle from "../../../utils/generateTitle";
import slugify from "slugify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let user = await getAuth(req, res);
  if (!user) {
    return res.status(401).send("");
  }

  let title = generateTitle();
  let slug = slugify(title, { lower: true, strict: true });
  let blog = await prisma.blog.create({
    data: { authorId: user.id, title, slug },
  });

  return res.json({ id: blog.id });
}
