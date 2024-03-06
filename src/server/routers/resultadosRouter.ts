import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "@/lib/db";
import { Data, ExcelData } from "../types/excelData";
import { Medalla } from "@prisma/client";

export const resultadosRouter = router({
  getByFecha: publicProcedure.input(z.number()).query(async ({ input }) => {
    return await prisma.resultados.findMany({
      where: {
        date: input
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
        date: 'asc'
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
        date: input.fecha
      },
      orderBy: {
        ranking: 'asc'
      },
    });
  }),
  getPuntajesByFecha: publicProcedure.input(z.number()).query(async ({ input }) => {
    const data = await prisma.resultados.findMany({
      where: {
        date: input
      },
      select: {
        P1: true,
        P2: true,
        P3: true,
        P4: true,
        P5: true,
        P6: true,
      }
    })
    return data.map((p) => [p.P1, p.P2, p.P3, p.P4, p.P5, p.P6])
  }),
  getDistribucionPuntajesByFecha: publicProcedure.input(z.number()).query(async ({ input }) => {
    const dataPuntajes = await prisma.resultados.findMany({
      where: {
        date: input
      },
      select: {
        P1: true,
        P2: true,
        P3: true,
        P4: true,
        P5: true,
        P6: true,
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
    const puntajes = dataPuntajes.map((p) => [p.P1, p.P2, p.P3, p.P4, p.P5, p.P6])
    const cortes = dataCortes?.cortes || [0, 0, 0]
    var chartData = [...Array(43)].map((_, index) => ({
      name: index,
      no: 0, hm: 0, b: 0, s: 0, g: 0
    }))
    for (let p of puntajes) {
      const suma = p.reduce((a, b) => a + b, 0)
      if (suma < cortes[0] && !p.includes(7))
        chartData[suma].no += 1
      else if (suma < cortes[0] && p.includes(7))
        chartData[suma].hm += 1
      else if (suma < cortes[1])
        chartData[suma].b += 1
      else if (suma < cortes[2])
        chartData[suma].s += 1
      else chartData[suma].g += 1
    }
    return chartData
  }),
  getProblemStatsByFecha: publicProcedure.input(z.number()).query(async ({ input }) => {
    const data = await prisma.resultados.findMany({
      where: {
        date: input
      },
      select: {
        P1: true,
        P2: true,
        P3: true,
        P4: true,
        P5: true,
        P6: true,
      }
    })
    const puntajes = data.map((p) => [p.P1, p.P2, p.P3, p.P4, p.P5, p.P6])
    const chartData = [...Array(6)].map((_, probno) => {
      var cantPorPuntos = [...Array(8)].map((_, index) => ({
        name: index,
        c: 0
      }))
      for (let p of puntajes)
        cantPorPuntos[p[probno]].c += 1
      return cantPorPuntos
    })
    return chartData
  }),
  getAcumuladoPaisByFecha: publicProcedure.input(z.number()).query(async ({ input }) => {
    return await prisma.resultados.findMany({
      where: {
        date: input
      },
      orderBy: {
        ranking: 'asc'
      },
      select: {
        P1: true,
        P2: true,
        P3: true,
        P4: true,
        P5: true,
        P6: true,
        medalla: true,
      }
    });
  }),
  excelToBD: publicProcedure.query(async () => {
    return fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRXg53PKiTHMxPfo0Z_Gh-juc2TwOAxFgcaafw-PlGKgUzltMcGM2MnqkZ86cjkiJ0sxzEdIeZRcAuB/pub?gid=0&single=true&output=tsv')
    .then(response => response.text())
    .then(text => {
      const data: ExcelData[] = text.split('\n').slice(1).map(line => {
        const [nombre, indice, pais, numeracion, P1, P2, P3, P4, P5, P6, total, medalla] = line.split('\t')
        return {
          nombre, indice, pais, numeracion, P1, P2, P3, P4, P5, P6, total, medalla
        }
      })
      async function SendData() {
        for (let index = 0; index < data.length; index++) {
          await prisma.resultados.create({
            data: {
              date: 2023,
              ranking: index + 1,
              nombreCompleto: data[index].nombre,
              pais: data[index].pais,
              numeracion: parseInt(data[index].numeracion),
              P1: parseInt(data[index].P1),
              P2: parseInt(data[index].P2),
              P3: parseInt(data[index].P3),
              P4: parseInt(data[index].P4),
              P5: parseInt(data[index].P5),
              P6: parseInt(data[index].P6),
              medalla: 'ORO'
            }
          })
        }
        console.log('Data sent')
      }
      SendData()
      return data
    })
  })
})