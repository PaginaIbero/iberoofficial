import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "@/lib/db";

export const resultadosRouter = router({
  getByFecha: publicProcedure.input(z.number()).query(async ({ input }) => {
    return await prisma.resultados.findMany({
      where: {
        date: input
      },
      orderBy: {
        ranking: 'asc'
      },
    });
  }),
  getByPais: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.resultados.findMany({
      where: {
        pais: input
      },
      orderBy: {
        date: 'asc'
      },
    });
  }),
  getByPaisAndFecha: publicProcedure.input(z.object({
    pais: z.string(),
    fecha: z.number()
  })).query(async ({ input }) => {
    return await prisma.resultados.findMany({
      where: {
        pais: input.pais,
        date: input.fecha
      },
      orderBy: {
        ranking: 'asc'
      },
    });
  }),
  getPuntajesByFecha: publicProcedure.input(z.number()).query(async ({ input }) => {
    return (await prisma.resultados.findMany({
      where: {
        date: input
      },
      select: {
        P1: true,
        P2: true,
        P3: true,
        P4: true,
        P5: true,
        P6: true,
      }
    })).map((p) => [p.P1, p.P2, p.P3, p.P4, p.P5, p.P6])
  }),
  getProblemByFecha: publicProcedure.input(z.number()).query(async ({ input }) => {
    let puntajes: number[][] = [[0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]];
     for (let problem = 1; problem < 7; problem++) {
      for (let puntaje = 0; puntaje < 8; puntaje++) {
        puntajes[problem-1][puntaje] = await prisma.resultados.count({
          where: {
            date: input,
            [`P${problem}`]: puntaje
          },
        });
      }
   }
   return puntajes
  }),
})