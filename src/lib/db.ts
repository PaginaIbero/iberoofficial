import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
}

const prisma = global.prismadb || new PrismaClient();

if (process.env.NODE_ENV === 'production') global.prismadb = prisma;

export default prisma