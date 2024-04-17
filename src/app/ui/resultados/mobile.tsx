'use client';
import { trpc } from "@/app/_trpc/client";
import { participacion, resultado, cronologia } from "@/lib/types";
import { CronologiaMobileTableSkeleton, InvidividualesMobileTableSkeleton, MobileTableSkeleton } from "@/app/ui/skeletons";
import { formatPremio } from "@/lib/formatStrings";
import Link from "next/link";

export function IndividualesMobileTable({ id }: {
  id: number
}) {
  const { data, isLoading } = trpc.resultados.getByFecha.useQuery(id)
  return (
    <div>
      {isLoading ? <InvidividualesMobileTableSkeleton/> :
        data?.map((resultado: resultado) => (
          <div 
            key={resultado.id}
            className='my-4 text-black'
          >
            <h2 className='text-xl font-semibold'>
              {formatPremio(resultado.premio)}
            </h2>
            <h1 className='text-lg'>
              <span className='font-bold'>
                (#{resultado.ranking}) {resultado.nombreCompleto}
              </span> ({resultado.pais}{resultado.num})
            </h1>
            <p>
              Puntaje: {resultado.prob1} + {resultado.prob2} + {resultado.prob3} + {resultado.prob4} + {resultado.prob5} + {resultado.prob6} = {resultado.total}
            </p>
          </div>
        ))
      }
    </div>
  )
}

export function PorPaisMobileTable({ id }: {
  id: number
}) {
  const { data, isLoading } = trpc.participaciones.getByFecha.useQuery(Number(id))
  return (
    <div>
      {isLoading ? <MobileTableSkeleton/> :
        data?.map((participacion) => (
          <div 
            key={participacion.id}
            className='my-4 text-black'
          >
            <h1 className='text-lg'>
              <span className='font-bold'>
                (#{participacion.ranking}) {participacion.pais.nombre}
              </span>
            </h1>
            <p>
              Puntaje: {participacion.prob1} + {participacion.prob2} + {participacion.prob3} + {participacion.prob4} + {participacion.prob5} + {participacion.prob6} = {participacion.total}
            </p>
            <p>
              Premios: {participacion.premios[0]} 🥇 | {participacion.premios[1]} 🥈 | {participacion.premios[2]} 🥉 | {participacion.premios[3]} MH
            </p>
            <p>
              Líder: {participacion.nombreLider}
            </p>
            <p>
              Tutor: {participacion.nombreTutor}
            </p>
          </div>
        ))
      }
    </div>
  )
}

export function AcumuladoAnoMobileTable() {
  const { data, isLoading } = trpc.cronologia.getAll.useQuery()
  return (
    <div className='flex flex-col items-center'>
      {isLoading ? <CronologiaMobileTableSkeleton/> :
        data?.map((cronologia: cronologia) => (
          <div 
            key={cronologia.id}
            className='my-1 py-3 px-8 rounded-md w-fit hover:bg-blue-100 transition duration-300 ease-in-out cursor-pointer'
          >
            <Link 
              href={`/resultados/${cronologia.id}?section=estadisticas`}
              className='text-black hover:text-blue-800 transition duration-300 ease-in-out cursor-pointer'
            >
              <h1 className='text-4xl font-semibold text-center'>{cronologia.id}</h1>
              <p className='text-center'>{cronologia.ciudad}</p>
              <p className='text-center'>{cronologia.fecha}</p>
              <p className='text-center'>Cortes: {cronologia.cortes[0]} | {cronologia.cortes[1]} | {cronologia.cortes[2]}</p>
              <p className='text-center'>{cronologia.premios[0]} 🥇 | {cronologia.premios[1]} 🥈 | {cronologia.premios[2]} 🥉 | {cronologia.premios[3]} MH</p>
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export function AcumuladoPaisMobileTable() {
  const { data, isLoading } = trpc.participaciones.getAcumuladoPais.useQuery()
  return (
    <div>
      {isLoading ? <MobileTableSkeleton/> :
        data?.map((item) => (
          <div 
            key={item.codigo}
            className='my-4 text-black'
          >
            <h1 className='text-lg'>
              <span className='font-bold'>
                {item.pais}
              </span>
            </h1>
            <p>
              # Part.: {item.participaciones} | 1ra part. {item.primera} | # Concurs.: {item.concursantes}
            </p>
            <p>
              Medallas: {item.premios[0]} 🥇 | {item.premios[1]} 🥈 | {item.premios[2]} 🥉 | {item.premios[3]} MH
            </p>
          </div>
        ))
      }
    </div>
  )
}
