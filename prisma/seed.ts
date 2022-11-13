import { PrismaClient, Role } from "@prisma/client";
import { hash } from "../utils/password";

const prisma = new PrismaClient();

const main = async () => {
  const admin = await prisma.user.upsert({
    where: {
      email: "admin@thcnsut.com",
    },
    update: {},
    create: {
      name: "admin",
      email: "admin@thcnsut.com",
      password: hash("admin"),
      role: Role.ADMIN,
    },
  });

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: "Default" },
      update: {},
      create: { name: "Default" },
    }),
    await prisma.category.upsert({
      where: { name: "Comic" },
      update: {},
      create: { name: "Comic" },
    }),
    await prisma.category.upsert({
      where: { name: "Travel" },
      update: {},
      create: { name: "Travel" },
    }),
    await prisma.category.upsert({
      where: { name: "Fashion" },
      update: {},
      create: { name: "Fashion" },
    }),
    await prisma.category.upsert({
      where: { name: "College Life" },
      update: {},
      create: { name: "College Life" },
    }),
    await prisma.category.upsert({
      where: { name: "Technology" },
      update: {},
      create: { name: "Technology" },
    }),
    await prisma.category.upsert({
      where: { name: "Relationship" },
      update: {},
      create: { name: "Relationship" },
    }),
    await prisma.category.upsert({
      where: { name: "Love" },
      update: {},
      create: { name: "Love" },
    }),
    await prisma.category.upsert({
      where: { name: "Political" },
      update: {},
      create: { name: "Political" },
    }),
  ]);

  console.log({ admin, categories });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
