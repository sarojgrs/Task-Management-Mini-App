import prisma from "../prisma/prismaClient";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};
