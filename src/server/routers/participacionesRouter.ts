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
  getByPais: publicProcedure.input(z.string()).query(async ({input}) => {
    return await prisma.participaciones.findMany({
      where: {
        paisId: input,
      },
      orderBy: {
        fecha: 'asc'
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
    const paises = await prisma.paises.findMany();
    const data = []
    for (let p of paises) {
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
        primera: participaciones[0].fecha,
        concursantes: participaciones.reduce((acc, p) => acc + p.equipo.length, 0),
        premios: [
          participaciones.reduce((acc, p) => acc + p.premios[0], 0),
          participaciones.reduce((acc, p) => acc + p.premios[1], 0),
          participaciones.reduce((acc, p) => acc + p.premios[2], 0),
          participaciones.reduce((acc, p) => acc + p.premios[3], 0)
        ]
      });
    }
    return data;
  }),
  getAcumuladoByPais: publicProcedure.input(z.string()).query(async ({ input }) => {
    const p = await prisma.paises.findUnique({
      where: {
        id: input
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
      ]
    }
  }),
})