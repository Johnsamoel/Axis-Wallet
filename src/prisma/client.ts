import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connect = async () => {
  try {
    await prisma.$connect();
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};

const closeClientConnect = async () => {
  await prisma.$disconnect();
};

export { prisma, connect, closeClientConnect, PrismaClient };
