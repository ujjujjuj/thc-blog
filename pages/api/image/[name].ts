import express from "express";

const handler = express();

handler.use("/api/image", express.static("public/uploads"));

export default handler;

export const config = {
  api: { externalResolver: true },
};
