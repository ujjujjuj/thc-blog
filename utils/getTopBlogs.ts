import { Blog } from "@prisma/client";
import { prisma } from "../prisma/db";

// TODO: return only necessary information
const getTopBlogs = async (
  number: number = 4,
  excludeId: number = -42
): Promise<Blog[]> => {
  return await prisma.blog.findMany({
    where: { published: true, id: { not: excludeId } },
    // orderBy: { clicks: "desc" }, // TODO: replace later
    orderBy: { priority: "desc" },
    take: number,
    include: { author: { select: { name: true } } },
  });
};

export default getTopBlogs;
