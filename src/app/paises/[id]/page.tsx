'use client'

import { trpc } from "@/app/_trpc/client"
import { Suspense } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { InformacionGeneralSkeleton, TitleSkeleton } from "@/app/ui/skeletons"
import Chips from "@/app/ui/resultados/chips"
import Table from "@/app/ui/table"
import { formatPremio } from "@/lib/formatStrings"
import { PaisIndividualesTable, PaisPorEquipoTable } from "@/app/ui/paises/table"
import { PaisIndividualesMobileTable, PaisPorEquipoMobileTable } from "@/app/ui/paises/mobile"

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
        <div className='hidden md:block'>
          <PaisIndividualesTable id={id}/>
        </div>
        <div className='block md:hidden'>
          {<PaisIndividualesMobileTable id={id}/>}
        </div>
      </>}
      {searchParams.get('section') === 'equipo' && <>
        <div className='hidden md:block'>
          <PaisPorEquipoTable id={id}/>
        </div>
        <div className='block md:hidden'>
          {<PaisPorEquipoMobileTable id={id}/>}
        </div>
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