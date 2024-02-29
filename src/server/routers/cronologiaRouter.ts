import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from '@/lib/db'

export const cronologiaRouter = router({
  getByID: publicProcedure.input(z.number()).query(async ({ input }) => {
    return await prisma.cronologia.findFirst({
      where: {
        id: input
      }
    });
  }),
  getAll: publicProcedure.query(async () => {
    return await prisma.cronologia.findMany({
      orderBy: {
        id: 'desc'
      },
    })
  })
})