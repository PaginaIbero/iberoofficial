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
            className='my-4'
          >
            <h2 className='text-xl font-semibold'>
              {resultado.medalla}
            </h2>
            <h1 className='text-lg'>
              <span className='font-bold'>
                (#{resultado.ranking}) {resultado.nombreCompleto}
              </span> ({resultado.pais.slice(0, 3)}{resultado.numeracion})
            </h1>
            <p>
              Puntaje: {resultado.P1} + {resultado.P2} + {resultado.P3} + {resultado.P4} + {resultado.P5} + {resultado.P6} = {resultado.P1 + resultado.P2 + resultado.P3 + resultado.P4 + resultado.P5 + resultado.P6}
            </p>
          </div>
        ))
      }
    </div>
  )
}