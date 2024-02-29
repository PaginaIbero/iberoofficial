import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from '@/lib/db'

export const cronologiaRouter = router({
  getByID: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    return await prisma.resultados.findFirst({
      where: {
        id: input.id
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