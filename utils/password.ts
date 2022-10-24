import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hash = (pass: string) => {
  return bcrypt.hashSync(pass, SALT_ROUNDS);
};

export const compare = bcrypt.compareSync;
