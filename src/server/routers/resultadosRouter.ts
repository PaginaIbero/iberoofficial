import { z } from "zod";
import { publicProcedure, router } from "../trpc";


export const resultadosRouter = router({
    getByFecha: publicProcedure.input(z.number()).query(async ({input}) => {
        return await prisma.resultados.findMany({
            where: {
                date: input
            },
            orderBy: {
                ranking: 'asc'
            },
        });
    }),
    getByPais: publicProcedure.input(z.string()).query(async ({input}) => {
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
    })).query(async ({input}) => {
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
});