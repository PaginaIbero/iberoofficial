'use client';
import { trpc } from "@/app/_trpc/client";
import { cronologia } from "@/lib/types";
import { MobileTableSkeleton } from "@/app/ui/skeletons";
import Link from "next/link";

export default function MobileTable() {
  const { data, isLoading } = trpc.cronologia.getAll.useQuery()
  return (
    <div>
      {isLoading ? <MobileTableSkeleton/> :
        data?.map((cronologia: cronologia) => (
          <div 
            key={cronologia.id}
            className='my-4'
          >
            <Link 
              href={`/resultados/${cronologia.id}?section=estadisticas`}
              className='text-black'
            >
              <h1 className='text-4xl font-semibold text-center'>{cronologia.id}</h1>
              <p className='text-center'>{cronologia.ciudad}</p>
            </Link>
          </div>
        ))
      }
    </div>
  )
}