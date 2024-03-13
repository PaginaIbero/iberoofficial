import { cronologiaRouter } from "./routers/cronologiaRouter";
import { resultadosRouter } from "./routers/resultadosRouter";
import { participacionesRouter } from "./routers/participacionesRouter";
import { paisesRouter } from "./routers/paisesRouter";
import { cargaDatosRouter } from "./routers/cargaDatosRouter";
import { router } from "./trpc";

export const appRouter = router({
  cronologia: cronologiaRouter,
  resultados: resultadosRouter,
  participaciones: participacionesRouter,
  paises: paisesRouter,
  cargaDatos: cargaDatosRouter
});

export type AppRouter = typeof appRouter