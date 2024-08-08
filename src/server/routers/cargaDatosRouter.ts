import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "@/lib/db";
import { Medalla } from "@prisma/client";

export const cargaDatosRouter = router({
  // mejorar y hacer server action
  cargarPaises: publicProcedure.query(async () => {
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
  })
})