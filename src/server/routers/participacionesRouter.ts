import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from '@/lib/db'

export const participacionesRouter = router({
  getByFecha: publicProcedure.input(z.number()).query(async ({ input }) => {
    const rawData = await prisma.participaciones.findMany({
      where: {
        date: input
      },
      orderBy: {
        ranking: 'asc'
      },
      include: {
        equipo: true
      }
    });
    return rawData.map((pais) => ({
      ...pais,
      P1: pais.equipo.reduce((acc, cur) => acc + cur.P1, 0),
      P2: pais.equipo.reduce((acc, cur) => acc + cur.P2, 0),
      P3: pais.equipo.reduce((acc, cur) => acc + cur.P3, 0),
      P4: pais.equipo.reduce((acc, cur) => acc + cur.P4, 0),
      P5: pais.equipo.reduce((acc, cur) => acc + cur.P5, 0),
      P6: pais.equipo.reduce((acc, cur) => acc + cur.P6, 0),
      g: 0,
      s: 0,
      b: 0,
      hm: 0
    }));
  }),
})