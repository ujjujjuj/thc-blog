import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import getAuth from "../../../utils/addAuth";
import { Formidable } from "formidable";
import Jimp from "jimp";
import path from "path";
import slugify from "slugify";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: any = await new Promise((resolve, reject) => {
    const form = new Formidable();

    form.parse(req, (err, fields, files) => {
      if (err) reject({ err });
      resolve({ err, fields, files });
    });
  });
  console.log(data);
  if (!data.fields.blogId) {
    return res.status(400).send("");
  }

  let user = await getAuth(req, res);
  if (!user) {
    return res.status(401).send("");
  }
  let blogId = parseInt(data.fields.blogId);
  let blog = await prisma.blog.findUnique({ where: { id: blogId } });
  if (!blog || (user.id !== 1 && blog.authorId !== user.id)) {
    return res.status(401).send("");
  }
  if (data.files.coverImage) {
    await Jimp.read(data.files.coverImage.filepath).then((lenna) => {
      lenna.write(path.join(process.cwd(), "public/uploads", `${blogId}.jpg`));
    });
    data.fields.coverImage = `/uploads/${blogId}.jpg`;
  } else {
    data.fields.coverImage = blog.coverImage;
  }

  await prisma.blog.update({
    where: { id: blogId },
    data: {
      content: data.fields.content,
      published: data.fields.published === "true",
      title: data.fields.title,
      slug: slugify(data.fields.title, { lower: true, strict: true }),
      priority: parseInt(data.fields.priority),
      coverImage: data.fields.coverImage,
      category: { connect: { name: data.fields.category } },
    },
  });

  return res.send("");
}
