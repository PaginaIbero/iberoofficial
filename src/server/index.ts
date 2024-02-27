import { cronologiaRouter } from "./routers/cronologiaRouter";
import { router } from "./trpc";
import { z } from 'zod';

export const appRouter = router({
    cronologia: cronologiaRouter
})

export type AppRouter = typeof appRouter