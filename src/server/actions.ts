'use server';

import { Medalla } from "@prisma/client"
import prisma from "@/lib/db"

export async function loadData({ year, url, pass }: {
  year: number
  url: string
  pass: string
}) {
  console.group('Carga de resultados por fecha | Año: ', year)

  await prisma.cronologia.deleteMany({ where: { id: year } })
  await prisma.resultados.deleteMany({ where: { fecha: year } })
  await prisma.participaciones.deleteMany({ where: { fecha: year } })

  if (pass !== 'pass') return false

  try {
    console.info("Fetching data from: ", url)

    const raw = await fetch(url)
    const text = await raw.text()
    const data = text.split('\n').slice(1).map(line => line.split('\t'))

    console.group('Lines: ', data.length)
    console.table(data.slice(0, 5))
    console.groupEnd()
    console.log('Creating resultados')

    const resultados = data.filter(linea => linea[2].length > 0).map(linea => ({
      fecha: year,
      ranking: parseInt(linea[0]),
      nombreCompleto: linea[2],
      pais: linea[1].slice(0, 3),
      num: parseInt(linea[1].slice(3, 4)),
      prob1: parseInt(linea[3]),
      prob2: parseInt(linea[4]),
      prob3: parseInt(linea[5]),
      prob4: parseInt(linea[6]),
      prob5: parseInt(linea[7]),
      prob6: parseInt(linea[8]),
      total: parseInt(linea[9]),
      premio: (linea[10] as Medalla),
    }))
    
    const paises = data.filter(linea => linea[15].length > 0)
    paises.forEach(async (linea, i) => {
      await prisma.participaciones.create({
        data: {
          fecha: year,
          pais: {
            connect: {
              id: linea[15]
            }
          },
          ranking: parseInt(linea[14]),
          prob1: parseInt(linea[17]),
          prob2: parseInt(linea[18]),
          prob3: parseInt(linea[19]),
          prob4: parseInt(linea[20]),
          prob5: parseInt(linea[21]),
          prob6: parseInt(linea[22]),
          total: parseInt(linea[23]),
          premios: [
            resultados.filter(r => r.pais === linea[15] && r.premio === 'ORO' as Medalla).length,
            resultados.filter(r => r.pais === linea[15] && r.premio === 'PLATA' as Medalla).length,
            resultados.filter(r => r.pais === linea[15] && r.premio === 'BRONCE' as Medalla).length,
            resultados.filter(r => r.pais === linea[15] && r.premio === 'MENCION' as Medalla).length
          ],
          nombreLider: linea[25],
          nombreTutor: linea[26],
          equipo: {
            create: resultados.filter(r => r.pais === linea[15])
          }
        }
      })
    })
    
    await prisma.cronologia.create({
      data: {
        id: year,
        ciudad: data[0][28],
        pais: data[1][28],
        fecha: data[2][28],
        paises: paises.length,
        concursantes: resultados.length,
        hombres: 0,
        mujeres: 0, 
        cortes: data[0].slice(11, 14).map(c => parseInt(c)),
        premios: [
          resultados.filter(r => r.premio === 'ORO' as Medalla).length,
          resultados.filter(r => r.premio === 'PLATA' as Medalla).length,
          resultados.filter(r => r.premio === 'BRONCE' as Medalla).length,
          resultados.filter(r => r.premio === 'MENCION' as Medalla).length
        ]
      }
    })

    console.groupEnd()
    console.log('Data loaded successfully')
  } catch (e) {
    console.error('Error while fetching data: ', e)
    return false
  }
}