'use client';
import { trpc } from "@/app/_trpc/client";
import { resultado } from "@/lib/types";
import { MobileInvidividualesTableSkeleton } from "@/app/ui/skeletons";

export default function MobileInvidividualesTable({ id }: {
  id: number
}) {
  const { data, isLoading } = trpc.resultados.getByFecha.useQuery(id)
  return (
    <div>
      {isLoading ? <MobileInvidividualesTableSkeleton/> :
        data?.map((resultado: resultado) => (
          <div 
            key={resultado.id}
            className='my-4 text-black'
          >
            <h2 className='text-xl font-semibold'>
              {resultado.premio}
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