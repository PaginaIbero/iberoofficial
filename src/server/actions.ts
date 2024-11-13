'use server';

import { Medalla } from "@prisma/client"
import prisma from "@/lib/db"

export async function loadPaises(link: string): Promise<string> {
  let response = ''

  console.group('Carga de países')
  response += 'Carga de países\n'

  try {
    const raw = await fetch(link)
    const text = await raw.text()
    const data = text.split('\n').slice(1).map(line => line.split('\t'))

    console.log('Líneas: ', data.length)
    response += 'Líneas: ' + data.length + '\n'
    console.log('Creando países: ')
    response += 'Creando países: \n'

    data.forEach(async linea => {
      if (await prisma.paises.findUnique({ where: { id: linea[0] } })) 
        return
      await prisma.paises.create({
        data: {
          id: linea[0],
          nombre: linea[1],
          contacto: linea[2],
          sitio: linea[3]
        }
      })
    })

    console.groupEnd()
    console.log('Datos cargados exitosamente')
    response += 'Datos cargados exitosamente'
    return response
  } catch (e) {
    console.error('Error en la carga de datos: ', e)
    response += 'Error en la carga de datos: ' + e
    return response
  }
}

export async function loadData({ year, url, pass }: {
  year: number
  url: string
  pass: string
}): Promise<string> {
  let response = ''

  console.group('Carga de resultados por fecha | Año: ', year)
  response += 'Carga de resultados por fecha | Año: ' + year + '\n'

  // TODO: Change for God's sake
  if (pass !== 'pass') {
    console.error('Contraseña incorrecta.')
    response += 'Contraseña incorrecta.'
    return response
  }

  await prisma.cronologia.deleteMany({ where: { id: year } })
  await prisma.resultados.deleteMany({ where: { fecha: year } })
  await prisma.participaciones.deleteMany({ where: { fecha: year } })

  try {
    const raw = await fetch(url)
    const text = await raw.text()
    const data = text.split('\n').slice(1).map(line => line.split('\t'))

    console.log('Líneas: ', data.length)
    response += 'Líneas: ' + data.length + '\n'
    console.log('Creando resultados:')
    response += 'Creando resultados:\n'

    const resultados = data
      .filter(linea => {
        if (linea.length < 11) return false
        if (linea[2].length > 0) return true
        else return false
      })
      .map(linea => ({
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

    const paises = (await prisma.paises.findMany({ select: { id: true } }))
      .map(pais => pais.id)
    
    data
      .filter(linea => linea.length > 15 && linea[15].length > 0)
      .forEach(async linea => {
        const paisId = linea[15]

        if (!paises.includes(paisId)) {
          console.error('Pais no encontrado: ', paisId)
          response += 'Pais no encontrado: ' + paisId + '\n'
          return
        }

        const equipo = resultados.filter(r => r.pais === paisId)
        if (equipo.length === 0) {
          console.info('Equipo vacío: ', paisId)
          response += 'Equipo vacío: ' + paisId + '\n'
          return
        }

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
            nombreLider: linea[26],
            nombreTutor: linea[25],
            equipo: {
              create: equipo
            }
          }
        })
    })
    
    await prisma.cronologia.create({
      data: {
        id: year,
        ciudad: data[1][27],
        pais: data[0][27],
        fecha: data[2][27],
        paises: paises.filter(pais => resultados.some(r => r.pais === pais)).length,
        concursantes: resultados.length,
        hombres: 0,
        mujeres: 0, 
        cortes: data[0].slice(11, 14).map(c => parseInt(c) || 0),
        premios: [
          resultados.filter(r => r.premio === 'ORO' as Medalla).length,
          resultados.filter(r => r.premio === 'PLATA' as Medalla).length,
          resultados.filter(r => r.premio === 'BRONCE' as Medalla).length,
          resultados.filter(r => r.premio === 'MENCION' as Medalla).length
        ],
        copa_prId: data[4][27] || null,
        website: data[3][27],
      }
    })

    console.groupEnd()
    console.log('Datos cargados exitosamente')
    response += 'Datos cargados exitosamente'
    return response
  } catch (e) {
    console.error('Error en la carga de datos: ', e)
    response += 'Error en la carga de datos: ' + e
    return response
  }
}