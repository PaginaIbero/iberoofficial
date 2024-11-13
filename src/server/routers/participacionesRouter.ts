import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from '@/lib/db'
import { access } from "fs";

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
  getByPais: publicProcedure.input(z.string()).query(async ({input}) => {
    return await prisma.participaciones.findMany({
      where: {
        paisId: input,
      },
      orderBy: {
        fecha: 'desc'
      },
      include: {
        pais: true,
        equipo: {
          orderBy: {
            num: 'asc'
          }
        }
      }
    })
  }),
  getAcumuladoPais: publicProcedure.query(async () => {
    try {
      const paises = await prisma.paises.findMany({
        orderBy: {
          nombre: 'asc'
        }
      });
      const data = []
      for (let p of paises) {
        const cronologia = await prisma.cronologia.findMany({
          where: {
            copa_prId: p.id
          },
          orderBy: {
            id: 'asc'
          },
          include: {
            copa_pr: true
          }
        });
        const participaciones = await prisma.participaciones.findMany({
          where: {
            pais: {
              id: p.id
            }
          },
          orderBy: {
            fecha: 'asc'
          },
          include: {
            pais: true,
            equipo: true
          }
        });
        data.push({
          codigo: p.id,
          pais: p.nombre,
          participaciones: participaciones.length,
          primera: participaciones.length > 0 ? participaciones[0].fecha : 'N/A',
          concursantes: participaciones.reduce((acc, p) => acc + p.equipo.length, 0),
          premios: [
            participaciones.reduce((acc, p) => acc + p.premios[0], 0),
            participaciones.reduce((acc, p) => acc + p.premios[1], 0),
            participaciones.reduce((acc, p) => acc + p.premios[2], 0),
            participaciones.reduce((acc, p) => acc + p.premios[3], 0)
          ],
          copas_pr: cronologia.length
        });
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  }),
  getAcumuladoByPais: publicProcedure.input(z.string()).query(async ({ input }) => {
    const p = await prisma.paises.findUnique({
      where: {
        id: input
      }
    });
    const cronologia = await prisma.cronologia.findMany({
      where: {
        copa_prId: input
      },
      orderBy: {
        id: 'asc'
      }
    });
    const participaciones = await prisma.participaciones.findMany({
      where: {
        pais: {
          id: input
        }
      },
      orderBy: {
        fecha: 'asc'
      },
      include: {
        pais: true,
        equipo: true
      }
    });
    return {
      codigo: input,
      pais: p?.nombre,
      participaciones: participaciones.length,
      primera: participaciones[0].fecha,
      concursantes: participaciones.reduce((acc, p) => acc + p.equipo.length, 0),
      premios: [
        participaciones.reduce((acc, p) => acc + p.premios[0], 0),
        participaciones.reduce((acc, p) => acc + p.premios[1], 0),
        participaciones.reduce((acc, p) => acc + p.premios[2], 0),
        participaciones.reduce((acc, p) => acc + p.premios[3], 0)
      ],
      copas_pr: cronologia.map(c => c.id)
    }
  }),
})