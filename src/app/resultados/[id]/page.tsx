'use client'

import { trpc } from "@/app/_trpc/client"
import Chips from "@/app/ui/resultados/chips";
import { IndividualesTable, PorPaisTable } from "@/app/ui/resultados/table";
import { DistribucionProblemas, DistribucionPuntajes } from "@/app/ui/resultados/charts";
import { DistribucionProblemasSkeleton, DistribucionPuntajesSkeleton, InformacionGeneralSkeleton, TitleSkeleton } from "@/app/ui/skeletons";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import MobileInvidividualesTable from "@/app/ui/resultados/mobile";

export default function Page({ params }: {
  params: {
    id: number
  }
}) {
  const searchParams = new URLSearchParams(useSearchParams())
  const {
    data: dataCronologia,
    isLoading: isLoadingCronologia
  } = trpc.cronologia.getByID.useQuery(Number(params.id))
  const {
    data: dataPuntajes,
    isLoading: isLoadingPuntajes
  } = trpc.resultados.getPuntajesByFecha.useQuery(Number(params.id)) // Esta query tarda como 10s
  return (
    <>
      {isLoadingCronologia ? <TitleSkeleton/> :
        <>
          <h1 className='text-2xl lg:text-4xl text-center'>
            <span className='font-semibold'>{dataCronologia?.ciudad}</span>, {dataCronologia?.pais}
          </h1>
          <h2 className='text-2xl lg:text-4xl text-center'>
            {dataCronologia?.id}
          </h2>
        </>
      }
      <Chips id={params.id} />
      {searchParams.get('section') === 'estadisticas' && <Estadisticas id={Number(params.id)}/>}
      {searchParams.get('section') === 'individuales' && <>
        <div className='hidden md:block'>
          <IndividualesTable id={Number(params.id)}/>
        </div>
        <div className='block md:hidden'>
          <MobileInvidividualesTable id={Number(params.id)}/>
        </div>
      </>}
      {searchParams.get('section') === 'por-pais' && <PorPaisTable id={Number(params.id)}/>}
    </>
  )
}

function Estadisticas({ id }: {
  id: number
}) {
  const {
    data: dataCortes,
    isLoading: isLoadingCortes
  } = trpc.cronologia.getCortesByID.useQuery(id)
  return (
    <>
      <h3 className='text-xl font-semibold'>
        Información general
      </h3>
      <Suspense fallback={<InformacionGeneralSkeleton />}>
        <InformacionGeneral id={id} />
      </Suspense>
      <h3 className='text-xl font-semibold mt-5 text-black'>
        Distribución de puntajes
      </h3>
      <Suspense fallback={<DistribucionPuntajesSkeleton/>}>
        <DistribucionPuntajes id={id}/>
      </Suspense>
      <h3 className='text-xl font-semibold mt-5 text-black'>
        Distribución por problema
      </h3>
      <Suspense fallback={<DistribucionProblemasSkeleton/>}>
        <DistribucionProblemas id={id}/>
      </Suspense>
    </>
  )
}

function InformacionGeneral({ id }: {
  id: number
}) {
  const [data, _] = trpc.cronologia.getGeneralInfoByID.useSuspenseQuery(id)
  return (
    <ul className='list-disc pl-6'>
      <li>Sede: {data?.ciudad}, {data?.pais} ({data?.fecha})</li>
      <li>Países participantes: {data?.paises}</li>
      <li>Concursantes: {data?.participantes}</li>
    </ul>
  )
}