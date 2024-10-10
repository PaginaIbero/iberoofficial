import { cronologiaRouter } from "./routers/cronologiaRouter";
import { resultadosRouter } from "./routers/resultadosRouter";
import { participacionesRouter } from "./routers/participacionesRouter";
import { paisesRouter } from "./routers/paisesRouter";
import { router } from "./trpc";

export const appRouter = router({
  cronologia: cronologiaRouter,
  resultados: resultadosRouter,
  participaciones: participacionesRouter,
  paises: paisesRouter
});

export type AppRouter = typeof appRouter