import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { Formidable } from "formidable";
import { prisma } from "../../../prisma/db";
import Jimp from "jimp";
import getAuth from "../../../utils/getAuth";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const data: any = await new Promise((resolve, reject) => {
  //   const form = new Formidable();

  //   form.parse(req, (err, fields, files) => {
  //     if (err) reject({ err });
  //     resolve({ err, fields, files });
  //   });
  // });
  // console.log(data);

  // if (!data.files.image || !data.fields.blogId) {
  //   return res.status(400).send("");
  // }
  // data.fields.blogId = parseInt(data.fields.blogId);

  // let user = await getAuth(req, res);
  // if (!user) {
  //   return res.status(401).send("");
  // }

  // let blog = await prisma.blog.findUnique({
  //   where: { id: data.fields.blogId },
  // });
  // if (!blog) {
  //   return res.status(400).send("");
  // }
  // const image = await prisma.image.create({
  //   data: {
  //     author: { connect: { id: user.id } },
  //     blog: { connect: { id: data.fields.blogId } },
  //   },
  // });

  // await Jimp.read(data.files.image.filepath)
  //   .then((lenna) => {
  //     lenna.write(
  //       path.join(process.cwd(), "public/uploads", `${image.id}.jpg`)
  //     );
  //     res.json({ id: image.id });
  //   })
  //   .catch((err) => {
  //     res.status(500).send("");
  //     console.error(err);
  //   });
}
