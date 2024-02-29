import { cronologiaRouter } from "./routers/cronologiaRouter";
import { resultadosRouter } from "./routers/resultadosRouter";
import { router } from "./trpc";
import { z } from 'zod';

export const appRouter = router({
  cronologia: cronologiaRouter,
  resultados: resultadosRouter,
});

export type AppRouter = typeof appRouter