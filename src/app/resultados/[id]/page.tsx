'use client'

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { trpc } from "@/app/_trpc/client"
import Chips from "@/app/ui/resultados/chips";
import { IndividualesMobileTable }from "@/app/ui/resultados/individuales_mobile";
import { IndividualesTable } from "@/app/ui/resultados/individuales";
import { DistribucionProblemas, DistribucionPuntajes } from "@/app/ui/resultados/charts";
import { DistribucionProblemasSkeleton, DistribucionPuntajesSkeleton, InformacionGeneralSkeleton, TitleSkeleton } from "@/app/ui/skeletons";
import { PorPaisTable } from "@/app/ui/resultados/por_pais";
import PorPaisMobileTable from "@/app/ui/resultados/por_pais_mobile";
import CarrouselFotos from "@/app/ui/resultados/carrouselFotos";
import LogoEdicion from "@/app/ui/resultados/logoEdicion";

export default function Page({ params }: {
  params: {
    id: number
  }
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [primerAnio, setPrimerAnio] = useState<number>(2023)
  const [ultimoAnio, setUltimoAnio] = useState<number>(2023)
  if (!['estadisticas', 'individuales', 'por-pais'].includes(searchParams.get('section') || '')) {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('section', 'estadisticas')
    router.push(`${pathname}?${newSearchParams.toString()}`)
  }
  const {
    data: dataCronologia,
    isLoading: isLoadingCronologia
  } = trpc.cronologia.getByID.useQuery(Number(params.id))
  const { data: cronologiaAnios } = trpc.cronologia.getAll.useQuery()
  cronologiaAnios?.forEach((cronologiaAnio) => {
    if (cronologiaAnio.id < primerAnio) {
      setPrimerAnio(cronologiaAnio.id)
    }
    if (cronologiaAnio.id > ultimoAnio) {
      setUltimoAnio(cronologiaAnio.id)
    }
  })
  return (
    <>
      {isLoadingCronologia ? <TitleSkeleton/> :
        <div className='relative flex justify-center items-center gap-4'>
          <Link 
            href={`/resultados/${Number(params.id) - 1}?${searchParams}`}
            className={`text-black hover:text-blue-800 transition-colors ${Number(params.id) !== primerAnio ? '' : 'invisible'}`}
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
            className={`text-black hover:text-blue-800 transition-colors ${Number(params.id) !== ultimoAnio ? '' : 'invisible'}`}
          >
            ►
          </Link>
          {/* Logo en la esquina superior derecha */}
          <div className='absolute top-0 right-0'>
            <LogoEdicion id={Number(params.id)} />
          </div>
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
          <IndividualesMobileTable id={Number(params.id)}/>
        </div>
      </>}
      {searchParams.get('section') === 'por-pais' && <>
        <div className='hidden md:block'>
          <PorPaisTable id={Number(params.id)}/>
        </div>
        <div className='block md:hidden'>
          <PorPaisMobileTable id={Number(params.id)}/>
        </div>
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
      <div className="mt-12 mb-8">
        <h3 className='text-xl font-semibold text-black'>
          Galería de Fotos
        </h3>
        <p className='text-gray-600 mb-8 max-w-2xl'>
          Momentos destacados de la Olimpiada Iberoamericana de Matemática {id}
        </p>
        <CarrouselFotos id={id} />
      </div>
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
      <li>Pruebas:&nbsp; 
        <Link
          className='hover:underline pointer-cursor text-blue-500'
          href={`/pruebas/${id}-sp.pdf`}
        >
          Español
        </Link> |&nbsp;
        <Link
          className='hover:underline pointer-cursor text-blue-500'
          href={`/pruebas/${id}-pt.pdf`}
        >
          Portugués
        </Link> |&nbsp;
        <Link
          className='hover:underline pointer-cursor text-blue-500'
          href={`/pruebas/${id}-en.pdf`}
        >
          Inglés
        </Link> |&nbsp;
        <Link
          className='hover:underline pointer-cursor text-blue-500'
          href={`/sl/${id}.pdf`}
        >
          Shortlist
        </Link>
      </li>
    </ul>
  )
}
