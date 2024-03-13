import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "@/lib/db";
import { Medalla } from "@prisma/client";

export const cargaDatosRouter = router({
  cargaPaises: publicProcedure.query(async () => {
    console.log('starting cargaPaises...')
    await prisma.paises.deleteMany()
    return (
      fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ86K20BUs_pgthBhAUcLTRR2yGVson6GfYvhAFVInY5vlg8B-YfKuJSKQneKdRXJrLYSYZvM5BNgDc/pub?gid=0&single=true&output=tsv')
        .then(response => response.text())
        .then(async text => {
          let paises: string[][] = text.split('\n').slice(1).map(line => line.split('\t'))
          for (let p of paises) {
            await prisma.paises.create({
              data: {
                id: p[0],
                nombre: p[1],
                contacto: p[2],
                sitio: p[3]
              }
            })
            console.log('ended loading: ', p[1])
          }
          return 'successful'
        })
    )
  }),
  cargaResultadosPorFecha: publicProcedure.input(z.number()).query(async ({ input }) => {
    console.log('starting cargaResultados / fecha: ', input)
    await prisma.resultados.deleteMany({where: { fecha: input }})
    await prisma.participaciones.deleteMany({where: { fecha: input }})
    return (
      fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRXg53PKiTHMxPfo0Z_Gh-juc2TwOAxFgcaafw-PlGKgUzltMcGM2MnqkZ86cjkiJ0sxzEdIeZRcAuB/pub?gid=0&single=true&output=tsv')
        .then(response => response.text())
        .then(async text => {
          let paises: string[] = []
          let equipos: string[][][] = []
          let totales: number[] = []
          text.split('\n').slice(1).map(line => {
            const data = line.split('\t')
            if (!paises.includes(data[3])) {
              paises.push(data[3])
              equipos.push([])
            }
            equipos[paises.indexOf(data[3])].push(data)
          })
          for (let i = 0; i < paises.length; i++) {
            totales.push(equipos[i].reduce((acc, c) => acc + parseInt(c[11]), 0))
            await prisma.participaciones.create({
              data: {
                fecha: input,
                pais: {
                  connect: {
                    id: paises[i]
                  }
                },
                ranking: 0,
                prob1: equipos[i].reduce((acc, c) => acc + parseInt(c[5]), 0),
                prob2: equipos[i].reduce((acc, c) => acc + parseInt(c[6]), 0),
                prob3: equipos[i].reduce((acc, c) => acc + parseInt(c[7]), 0),
                prob4: equipos[i].reduce((acc, c) => acc + parseInt(c[8]), 0),
                prob5: equipos[i].reduce((acc, c) => acc + parseInt(c[9]), 0),
                prob6: equipos[i].reduce((acc, c) => acc + parseInt(c[10]), 0),
                total: equipos[i].reduce((acc, c) => acc + parseInt(c[11]), 0),
                premios: [
                  equipos[i].filter(c => c[12] === 'g').length,
                  equipos[i].filter(c => c[12] === 's').length,
                  equipos[i].filter(c => c[12] === 'b').length,
                  equipos[i].filter(c => c[12] === 'hm').length,
                ],
                nombreLider: 'n/a',
                nombreTutor: 'n/a',
                equipo: {
                  create: equipos[i].map(c => ({ 
                    fecha: input,
                    ranking: parseInt(c[0]),
                    nombreCompleto: c[1],
                    pais: c[3],
                    num: parseInt(c[4]),
                    prob1: parseInt(c[5]),
                    prob2: parseInt(c[6]),
                    prob3: parseInt(c[7]),
                    prob4: parseInt(c[8]),
                    prob5: parseInt(c[9]),
                    prob6: parseInt(c[10]),
                    total: parseInt(c[11]),
                    premio: c[12] as Medalla,
                  }))
                }
              }
            })
          }
          for (let i = 0; i < paises.length; i++) {
            await prisma.participaciones.updateMany({
              where: {
                fecha: input,
                paisId: paises[i]
              },
              data: {
                ranking: totales.filter(t => t > totales[i]).length + 1
              }
            })
          }
          console.log('finished loading!')
          return true
        })
    )
  })
})