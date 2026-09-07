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
      // Fetch all data in parallel with proper includes
      const [paises, allCronologia, allParticipaciones] = await Promise.all([
        prisma.paises.findMany({
          orderBy: {
            nombre: 'asc'
          }
        }),
        prisma.cronologia.findMany({
          select: {
            id: true,
            copa_prId: true
          }
        }),
        prisma.participaciones.findMany({
          orderBy: {
            fecha: 'asc'
          },
          include: {
            pais: true,
            equipo: true
          }
        })
      ]);

      // Create lookup maps for faster processing
      const cronologiaMap = allCronologia.reduce((acc, cron) => {
        if (!acc[cron.copa_prId]) {
          acc[cron.copa_prId] = [];
        }
        acc[cron.copa_prId].push(cron.id);
        return acc;
      }, {} as Record<string, number[]>);

      const participacionesMap = allParticipaciones.reduce((acc, part) => {
        if (!acc[part.paisId]) {
          acc[part.paisId] = [];
        }
        acc[part.paisId].push(part);
        return acc;
      }, {} as Record<string, typeof allParticipaciones>);

      return paises.map((p) => {
        const participaciones = participacionesMap[p.id] || [];
        const cronologia = cronologiaMap[p.id] || [];
        
        return {
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
        };
      });
    } catch (error) {
      console.error(error);
      return [];
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