import { publicProcedure, router } from "../trpc";
import prisma from '@/lib/db'


export const cronologiaRouter = router({
    getAll: publicProcedure.query(async () => {
        return await prisma.cronologia.findMany({
            orderBy: {
                id: 'desc'
            },
        })
    })
})