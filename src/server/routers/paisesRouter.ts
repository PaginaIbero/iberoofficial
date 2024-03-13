import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from '@/lib/db'

export const paisesRouter = router({
  getAll: publicProcedure.query(async () => {
    return await prisma.paises.findMany({
      orderBy: {
        nombre: 'asc'
      },
    })
  }),
  getByID: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.paises.findUnique({
      where: {
        id: input
      }
    })
  }),
})