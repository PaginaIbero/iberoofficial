'use client'

import { trpc } from "@/app/_trpc/client"
import { DistribucionProblemas, DistribucionPuntajes } from "@/app/ui/resultados/charts";
import Chips from "@/app/ui/resultados/chips";
import { IndividualesTable, PorPaisTable } from "@/app/ui/resultados/table";
import { InformacionGeneralSkeleton, TitleSkeleton } from "@/app/ui/skeletons";
import { cronologia } from "@/lib/types";
import { useSearchParams } from "next/navigation";

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
      {isLoadingCronologia ? <TitleSkeleton /> :
        <>
          <h1 className='text-4xl text-center'>
            <span className='font-semibold'>{dataCronologia?.ciudad}</span>, {dataCronologia?.pais}
          </h1>
          <h2 className='text-4xl text-center'>
            {dataCronologia?.id}
          </h2>
        </>
      }
      <Chips id={params.id} />
      {searchParams.get('section') === 'estadisticas' &&
        <Estadisticas
          dataCronologia={dataCronologia}
          isLoadingCronologia={isLoadingCronologia}
          dataPuntajes={dataPuntajes}
          isLoadingPuntajes={isLoadingPuntajes}
        />
      }
      {searchParams.get('section') === 'individuales' && <IndividualesTable id={Number(params.id)}/>}
      {searchParams.get('section') === 'por-pais' && <PorPaisTable id={Number(params.id)}/>}
    </>
  )
}

function Estadisticas({
  dataCronologia,
  isLoadingCronologia,
  dataPuntajes,
  isLoadingPuntajes
}: {
  dataCronologia: cronologia | null | undefined,
  isLoadingCronologia: boolean,
  dataPuntajes: number[][] | undefined,
  isLoadingPuntajes: boolean
}) {
  const dataCortes = {
    b: 10,
    s: 20,
    g: 30
  } // dummy query
  const dataPremios = [
    { name: 'Oro', value: 20 },
    { name: 'Plata', value: 15 },
    { name: 'Bronce', value: 10 },
    { name: 'Mención', value: 5 },
    { name: 'Nada', value: 5 }
  ] // dummy query
  return (
    <>
      <h3 className='text-xl font-semibold'>
        Información general
      </h3>
      {isLoadingCronologia ? <InformacionGeneralSkeleton /> :
        <ul className='list-disc pl-6'>
          <li>Sede: {dataCronologia?.ciudad}, {dataCronologia?.pais} ({dataCronologia?.fecha})</li>
          <li>Países participantes: {dataCronologia?.paises}</li>
          <li>Concursantes: {dataCronologia?.participantes}</li>
        </ul>
      }
      <h3 className='text-xl font-semibold mt-5 text-black'>
        Distribución de puntajes
      </h3>
      {isLoadingPuntajes ? <p className="text-black">Loading...</p> :
        <DistribucionPuntajes
          puntajes={dataPuntajes || [[]]}
          cortes={dataCortes}
        />
      }
      <h3 className='text-xl font-semibold mt-5 text-black'>
        Distribución por problema
      </h3>
      {isLoadingPuntajes ? <p className="text-black">Loading...</p> :
        <DistribucionProblemas
          puntajes={dataPuntajes || [[]]}
        />
      }
    </>
  )
}