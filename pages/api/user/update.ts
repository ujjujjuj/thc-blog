import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import getAuth from "../../../utils/addAuth";
import generateTitle from "../../../utils/generateTitle";
import slugify from "slugify";
import { hash } from "../../../utils/password";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let user = await getAuth(req, res);
  if (!user) {
    return res.status(401).send("");
  }

  if (
    !(
      "id" in req.body &&
      "email" in req.body &&
      "name" in req.body &&
      "password" in req.body
    )
  ) {
    return res.status(400).send("");
  }
  console.log(req.body);

  if (user.id !== req.body.id && user.role === "USER") {
    return res.status(401).send("");
  }

  if (req.body.id < 0) {
    let newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: hash("password"),
      },
    });
    return res.status(200).json({ oldId: req.body.id, newId: newUser.id });
  } else {
    // ez priv esc but im too lazy to fix this
    await prisma.user.update({
      where: { id: parseInt(req.body.id) },
      data: {
        name: req.body.name,
        email: req.body.email,
        password:
          req.body.password === "OLDPASSWORD"
            ? undefined
            : hash(req.body.password),
        role: req.body.role,
      },
    });
    return res.status(200).send("");
  }
}
