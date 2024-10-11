import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from '@/lib/db'

export const cronologiaRouter = router({
  getAll: publicProcedure.query(async () => {
    return await prisma.cronologia.findMany({
      orderBy: {
        id: 'desc'
      },
      include: {
        copa_pr: true
      }
    })
  }),
  getByID: publicProcedure.input(z.number()).query(async ({ input }) => {
    return await prisma.cronologia.findFirst({
      where: {
        id: input
      }
    });
  }),
  getGeneralInfoByID: publicProcedure.input(z.number()).query(async ({ input }) => {
    return await prisma.cronologia.findFirst({
      where: {
        id: input
      },
      select: {
        id: true,
        ciudad: true,
        pais: true,
        fecha: true,
        paises: true,
        concursantes: true
      }
    });
  }),
  getCortesByID: publicProcedure.input(z.number()).query(async ({ input }) => {
    const data = await prisma.cronologia.findFirst({
      where: {
        id: input
      },
      select: {
        cortes: true
      }
    })
    return data?.cortes || [0, 0, 0]
  }),
})