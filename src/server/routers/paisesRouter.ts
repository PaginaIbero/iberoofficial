import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from '@/lib/db'

export const paisesRouter = router({
  getAll: publicProcedure.query(async () => {
    const paises = await prisma.paises.findMany({
      orderBy: {
        nombre: 'asc'
      },
    });

    const data = paises.map(async (p) => {
      const cron = await prisma.cronologia.findMany({
        where: {
          pais: p.nombre
        },
        orderBy: {
          fecha: 'asc'
        }
      });
      const part = await prisma.participaciones.findFirst({
        where: {
          pais: {
            id: p.id
          }
        },
        orderBy: {
          fecha: 'asc'
        }
      });

      return {
        id: p.id,
        nombre: p.nombre,
        contacto: p.contacto,
        sitio: p.sitio,
        anfitrion: cron.map(c => c.id),
        primera: part?.fecha || '-',
      }
    })

    return Promise.all(data)
  }),
  getByID: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.paises.findUnique({
      where: {
        id: input
      }
    })
  }),
})