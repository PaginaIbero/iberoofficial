import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "@/lib/db";

export const resultadosRouter = router({
  getByFecha: publicProcedure.input(z.number()).query(async ({ input }) => {
    return await prisma.resultados.findMany({
      where: {
        fecha: input
      },
      orderBy: {
        ranking: 'asc'
      },
    });
  }),
  getByPais: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.resultados.findMany({
      where: {
        pais: input
      },
      orderBy: {
        fecha: 'asc'
      },
    });
  }),
  getByPaisAndFecha: publicProcedure.input(z.object({
    pais: z.string(),
    fecha: z.number()
  })).query(async ({ input }) => {
    return await prisma.resultados.findMany({
      where: {
        pais: input.pais,
        fecha: input.fecha
      },
      orderBy: {
        ranking: 'asc'
      },
    });
  }),
  getPuntajesByFecha: publicProcedure.input(z.number()).query(async ({ input }) => {
    const data = await prisma.resultados.findMany({
      where: {
        fecha: input
      },
      select: {
        prob1: true,
        prob2: true,
        prob3: true,
        prob4: true,
        prob5: true,
        prob6: true,
      }
    })
    return data.map((p) => [p.prob1, p.prob2, p.prob3, p.prob4, p.prob5, p.prob6])
  }),
  getDistribucionPuntajesByFecha: publicProcedure.input(z.number()).query(async ({ input }) => {
    const puntajeMaximo = input < 2000 ? 10 : 7
    const dataPuntajes = await prisma.resultados.findMany({
      where: {
        fecha: input
      },
      select: {
        prob1: true,
        prob2: true,
        prob3: true,
        prob4: true,
        prob5: true,
        prob6: true,
      }
    })
    const dataCortes = await prisma.cronologia.findFirst({
      where: {
        id: input
      },
      select: {
        cortes: true
      }
    })
    const puntajes = dataPuntajes.map((p) => [p.prob1, p.prob2, p.prob3, p.prob4, p.prob5, p.prob6])
    const cortes = dataCortes?.cortes || [0, 0, 0]
    var chartData = [...Array(puntajeMaximo * 6 + 1)].map((_, index) => ({
      name: index,
      no: 0, hm: 0, b: 0, s: 0, g: 0
    }))
    for (let p of puntajes) {
      const suma = p.reduce((a, b) => a + b, 0)
      if (suma < cortes[2] && !p.includes(puntajeMaximo))
        chartData[suma].no += 1
      else if (suma < cortes[2] && p.includes(puntajeMaximo))
        chartData[suma].hm += 1
      else if (suma < cortes[1])
        chartData[suma].b += 1
      else if (suma < cortes[0])
        chartData[suma].s += 1
      else chartData[suma].g += 1
    }
    return chartData
  }),
  getProblemStatsByFecha: publicProcedure.input(z.number()).query(async ({ input }) => {
    const puntajeMaximo = input < 2000 ? 10 : 7
    const data = await prisma.resultados.findMany({
      where: {
        fecha: input
      },
      select: {
        prob1: true,
        prob2: true,
        prob3: true,
        prob4: true,
        prob5: true,
        prob6: true,
      }
    })
    const puntajes = data.map((p) => [p.prob1, p.prob2, p.prob3, p.prob4, p.prob5, p.prob6])
    const chartData = [...Array(6)].map((_, probno) => {
      var cantPorPuntos = [...Array(puntajeMaximo + 1)].map((_, index) => ({
        name: index,
        c: 0
      }))
      for (let p of puntajes)
        cantPorPuntos[p[probno]].c += 1
      return cantPorPuntos
    })
    return chartData
  })
})