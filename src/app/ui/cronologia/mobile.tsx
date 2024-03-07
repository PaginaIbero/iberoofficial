'use client';
import { trpc } from "@/app/_trpc/client";
import { cronologia } from "@/lib/types";
import { MobileTableSkeleton } from "@/app/ui/skeletons";
import Link from "next/link";

export default function CronologiaMobileTable() {
  const { data, isLoading } = trpc.cronologia.getAll.useQuery()
  return (
    <div className="flex flex-col justify-center items-center">
      {isLoading ? <MobileTableSkeleton/> :
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
              <p className='text-center'>Concursantes: {cronologia.participantes}</p>
              <p className='text-center'>(H: {cronologia.hombres} | M: {cronologia.mujeres})</p>
            </Link>
          </div>
        ))
      }
    </div>
  )
}