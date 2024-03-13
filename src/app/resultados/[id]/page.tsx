'use client'

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { trpc } from "@/app/_trpc/client"
import Chips from "@/app/ui/resultados/chips";
import MobileInvidividualesTable from "@/app/ui/resultados/mobile";
import { IndividualesTable, PorPaisTable } from "@/app/ui/resultados/table";
import { DistribucionProblemas, DistribucionPuntajes } from "@/app/ui/resultados/charts";
import { DistribucionProblemasSkeleton, DistribucionPuntajesSkeleton, InformacionGeneralSkeleton, TitleSkeleton } from "@/app/ui/skeletons";

export default function Page({ params }: {
  params: {
    id: number
  }
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = new URLSearchParams(useSearchParams())
  const {
    data: dataCronologia,
    isLoading: isLoadingCronologia
  } = trpc.cronologia.getByID.useQuery(Number(params.id))
  if (!['estadisticas', 'individuales', 'por-pais'].includes(searchParams.get('section') || '')) {
    searchParams.set('section', 'estadisticas')
    router.push(`${pathname}?${searchParams.toString()}`)
  }
  return (
    <>
      {isLoadingCronologia ? <TitleSkeleton/> :
        <div className='flex justify-center items-center gap-4'>
          <Link 
            href={`/resultados/${Number(params.id) - 1}?${searchParams}`}
            className='text-black hover:text-blue-800 transition-colors'
          >
            ◄
          </Link>
          <div className='flex flex-col'>
            <h1 className='text-2xl lg:text-4xl text-center text-black'>
              <span className='font-semibold'>{dataCronologia?.ciudad}</span>, {dataCronologia?.pais}
            </h1>
            <h2 className='text-2xl lg:text-4xl text-center text-black'>
              {dataCronologia?.id}
            </h2>
          </div>
          <Link 
            href={`/resultados/${Number(params.id) + 1}?${searchParams}`}
            className='text-black hover:text-blue-800 transition-colors'
          >
            ►
          </Link>
        </div>
      }
      <Chips chips={[{
        text: 'Estadísticas',
        href: 'estadisticas'
      }, {
        text: 'Individuales',
        href: 'individuales'
      }, {
        text: 'Por país',
        href: 'por-pais'
      }]}/>
      {searchParams.get('section') === 'estadisticas' && <Estadisticas id={Number(params.id)}/>}
      {searchParams.get('section') === 'individuales' && <>
        <div className='hidden md:block'>
          <IndividualesTable id={Number(params.id)}/>
        </div>
        <div className='block md:hidden'>
          <MobileInvidividualesTable id={Number(params.id)}/>
        </div>
      </>}
      {searchParams.get('section') === 'por-pais' && <>
        <PorPaisTable id={Number(params.id)}/>
      </>}
    </>
  )
}

function Estadisticas({ id }: {
  id: number
}) {
  return (
    <>
      <h3 className='text-xl font-semibold text-black'>
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
      <h3 className='text-xl font-semibold my-5 text-black'>
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
    <ul className='list-disc pl-6 text-black'>
      <li>Sede: {data?.ciudad}, {data?.pais} ({data?.fecha})</li>
      <li>Países participantes: {data?.paises}</li>
      <li>Concursantes: {data?.concursantes}</li>
    </ul>
  )
}