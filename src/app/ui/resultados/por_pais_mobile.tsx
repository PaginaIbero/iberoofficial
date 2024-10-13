import { trpc } from "@/app/_trpc/client"
import { MobileTableSkeleton } from "../skeletons"

export default function PorPaisMobileTable({ id }: {
  id: number
}) {
  const { data, isLoading } = trpc.participaciones.getByFecha.useQuery(Number(id))
  return (
    <div>
      {isLoading ? <MobileTableSkeleton/> :
        data?.map((participacion, index: number) => (
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
            {index < data.length - 1 && <hr className='my-4'/>}
          </div>
        ))
      }
    </div>
  )
}

