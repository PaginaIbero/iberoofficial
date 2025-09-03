import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from '@/lib/db'

export const paisesRouter = router({
  getAll: publicProcedure.query(async () => {
    const paises = await prisma.paises.findMany({
      orderBy: {
        nombre: 'asc'
      },
      include: {
        participaciones: {
          orderBy: {
            fecha: 'asc'
          },
          take: 1
        }
      }
    });

    // Get all cronologia data in a single query
    const allCronologia = await prisma.cronologia.findMany({
      select: {
        id: true,
        pais: true
      }
    });

    // Create a map for faster lookup
    const cronologiaMap = allCronologia.reduce((acc, cron) => {
      if (!acc[cron.pais]) {
        acc[cron.pais] = [];
      }
      acc[cron.pais].push(cron.id);
      return acc;
    }, {} as Record<string, number[]>);

    return paises.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      contacto: p.contacto,
      sitio: p.sitio,
      anfitrion: cronologiaMap[p.nombre] || [],
      primera: p.participaciones[0]?.fecha || '-',
    }));
  }),
  getByID: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.paises.findUnique({
      where: {
        id: input
      }
    })
  }),
})