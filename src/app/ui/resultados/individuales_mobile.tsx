'use client';
import { trpc } from "@/app/_trpc/client";
import { resultado } from "@/lib/types";
import { InvidividualesMobileTableSkeleton } from "@/app/ui/skeletons";
import { formatPremio } from "@/lib/formatStrings";

export function IndividualesMobileTable({ id }: {
  id: number
}) {
  const { data, isLoading } = trpc.resultados.getByFecha.useQuery(id)
  return (
    <div>
      {isLoading ? <InvidividualesMobileTableSkeleton/> :
        data?.map((r: resultado, i) => (
          <div 
            key={r.id}
            className='my-4 text-black'
          >
            <h2 className='text-xl font-semibold'>
              {formatPremio(r.premio)}
            </h2>
            <h1 className='text-lg'>
              <span className='font-bold'>
                (#{r.ranking}) {r.nombreCompleto}
              </span> ({r.pais}{r.num})
            </h1>
            <p>
              Puntaje: {r.prob1} + {r.prob2} + {r.prob3} + {r.prob4} + {r.prob5} + {r.prob6} = {r.total}
            </p>
            {i < data.length - 1 && <hr className='my-4'/>}
          </div>
        ))
      }
    </div>
  )
}