import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { Blog } from "@prisma/client";

const PAGE_SIZE = 6;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    !req.body.hasOwnProperty("category") ||
    !req.body.hasOwnProperty("page")
  ) {
    return res.status(400).send("");
  }

  const blogs = await prisma.blog.findMany({
    where: {
      published: true,
      categoryName: req.body.category !== "All" ? req.body.category : undefined,
    },
    skip: PAGE_SIZE * req.body.page,
    take: PAGE_SIZE,
    include: { author: { select: { name: true } } },
    orderBy: [{ createdAt: "desc" }],
  });

  // TODO: do this in a transaction
  const totalBlogs = await prisma.blog.count();

  return res.json({ blogs, totalBlogs });
}
