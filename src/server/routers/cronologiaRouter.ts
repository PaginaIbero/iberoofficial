import { publicProcedure, router } from "../trpc";


export const cronologiaRouter = router({
    getAll: publicProcedure.query(async () => {
        return await prismadb.cronologia.findMany({
            orderBy: {
                id: 'desc'
            },
        })
    })
})