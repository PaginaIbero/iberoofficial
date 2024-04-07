'use client'

import { trpc } from "@/app/_trpc/client"
import { Suspense } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { InformacionGeneralSkeleton, TitleSkeleton } from "@/app/ui/skeletons"
import Chips from "@/app/ui/resultados/chips"
import Table from "@/app/ui/table"
import { formatPremio } from "@/lib/formatStrings"

export default function Page({ params: { id } }: {
  params: {
    id: string
  }
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = new URLSearchParams(useSearchParams())
  if (!['estadisticas', 'equipo', 'individuales'].includes(searchParams.get('section') || '')) {
    searchParams.set('section', 'estadisticas')
    router.push(`${pathname}?${searchParams.toString()}`)
  }
  const {
    data: dataPais,
    isLoading: isLoadingPais
  } = trpc.paises.getByID.useQuery(id)
  const {
    data: dataResultados,
    isLoading: isLoadingResultados
  } = trpc.participaciones.getByPais.useQuery(id)
  return (
    <>
      {isLoadingPais ? <TitleSkeleton /> :
        <div className='flex flex-col'>
          <h1 className='text-2xl lg:text-4xl text-center text-black'>
            <span className='font-semibold'>{dataPais?.nombre}</span>
          </h1>
          <h2 className='text-2xl lg:text-4xl text-center text-black'>
            {dataPais?.id}
          </h2>
        </div>
      }
      <Chips chips={[{
        text: 'Estadísticas',
        href: 'estadisticas'
      }, {
        text: 'Individuales',
        href: 'individuales'
      }, {
        text: 'Por equipo',
        href: 'equipo'
      }]} />
      {searchParams.get('section') === 'estadisticas' && <Estadisticas id={id} />}
      {searchParams.get('section') === 'individuales' && <>
        <Table
          headers={['Código', 'Concursante', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'Total', 'Ranking', 'Premio']}
          data={
            dataResultados ? (new Array).concat(...dataResultados.map((res) =>
              res.equipo.map((item) => [
                item.pais + item.num,
                item.nombreCompleto,
                item.prob1.toString(),
                item.prob2.toString(),
                item.prob3.toString(),
                item.prob4.toString(),
                item.prob5.toString(),
                item.prob6.toString(),
                item.total.toString(),
                item.ranking.toString(),
                formatPremio(item.premio),
              ])
            )) : []
          }
          isLoading={isLoadingResultados}
        />
      </>}
      {searchParams.get('section') === 'equipo' && <>
        <Table
          headers={['Año', 'T', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'Total', 'Ranking', 'Premios', 'Líder', 'Tutor']}
          data={
            dataResultados ? dataResultados.map((item) => [
              item.fecha.toString(),
              item.equipo.length.toString(),
              item.prob1.toString(),
              item.prob2.toString(),
              item.prob3.toString(),
              item.prob4.toString(),
              item.prob5.toString(),
              item.prob6.toString(),
              item.total.toString(),
              item.ranking.toString(),
              item.premios.join(', '),
              item.nombreLider,
              item.nombreTutor
            ]) : []
          }
          href={dataResultados ? dataResultados.map((item) => `/resultados/${item.fecha}`) : []}
          isLoading={isLoadingResultados}
        />
      </>}
    </>
  )
}

function Estadisticas({ id }: {
  id: string
}) {
  return (
    <>
      <h3 className='text-xl font-semibold text-black'>
        Información general
      </h3>
      <Suspense fallback={<InformacionGeneralSkeleton />}>
        <InformacionGeneral id={id} />
      </Suspense>
      <h3 className='text-xl font-semibold text-black mt-2'>
        Resultados
      </h3>
      <Suspense fallback={<InformacionGeneralSkeleton />}>
        <Resultados id={id} />
      </Suspense>
    </>
  )
}

function InformacionGeneral({ id }: {
  id: string
}) {
  const [data, _] = trpc.paises.getByID.useSuspenseQuery(id)
  return (
    <ul className='list-disc pl-6 text-black'>
      <li>Nombre: {data?.nombre}</li>
      <li>Contacto: {data?.contacto}</li>
      <li>Sitio OM nacional: {data?.sitio}</li>
    </ul>
  )
}

function Resultados({ id }: {
  id: string
}) {
  const [data, _] = trpc.participaciones.getAcumuladoByPais.useSuspenseQuery(id)
  return (
    <ul className='list-disc pl-6 text-black'>
      <li>Participaciones: {data?.participaciones}</li>
      <li>Primera participación: {data?.primera}</li>
      <li>Concursantes: {data?.concursantes}</li>
      <li>
        Premios:
        Oros ({data?.premios[0]}) |
        Platas ({data?.premios[1]}) |
        Bronces ({data?.premios[2]}) |
        Menciones de honor ({data?.premios[3]})
      </li>
    </ul>
  )
}