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
})