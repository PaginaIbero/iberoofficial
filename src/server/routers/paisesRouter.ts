import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from '@/lib/db'

export const participacionesRouter = router({
  getAll: publicProcedure.query(async () => {
    return await prisma.participaciones.findMany({
      orderBy: {
        nombrePais: 'asc'
      },
    })
  }),
})