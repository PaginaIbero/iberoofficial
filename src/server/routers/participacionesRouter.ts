import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from '@/lib/db'

export const participacionesRouter = router({
  getByFecha: publicProcedure.input(z.number()).query(async ({ input }) => {
    return await prisma.participaciones.findMany({
      where: {
        fecha: input
      },
      orderBy: [
        {
          ranking: 'asc'
        },
        {
          total: 'desc'
        }
      ],
      include: {
        pais: true,
        equipo: true
      }
    });
  }),
})