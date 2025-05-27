'use client';

import { trpc } from "../../_trpc/client";
import Link from "next/link";

export default function CarouselEdiciones() {
  const [data, dataQuery] = trpc.cronologia.getAll.useSuspenseQuery()
  return (
    <div className='flex flex-col md:flex-row w-full gap-6 max-w-6xl mx-auto'>
      {data?.slice(0, 3).map(cronologia => (<YearCard id={cronologia.id} key={cronologia.id}/>))}
      <VerMasCard/>
    </div>
  )
}

export function YearCard({ id }: {
  id: number
}) {
  return (
    <div className='flex flex-col justify-center items-center bg-blue-50 hover:bg-blue-100 transition-colors h-40 md:w-1/4 p-6 rounded-3xl border border-blue-200 shadow-sm'>
      <h1 className='text-4xl font-semibold font-sans text-blue-500 mb-3'>{id}</h1>
      <Link
        className='text-gray-700 hover:text-blue-600 text-sm mb-1 transition-colors'
        href={`/resultados/${id}`}
      >
        Ver Resultados
      </Link>
      <Link
        className='text-gray-700 hover:text-blue-600 text-sm transition-colors'
        href={`/pruebas`}
      >
        Ver Pruebas
      </Link>
    </div>
  )
}

export function VerMasCard() {
  return (
    <div className='flex flex-col justify-center items-center bg-blue-50 hover:bg-blue-100 transition-colors h-40 md:w-1/4 p-6 rounded-3xl border border-blue-300 shadow-sm'>
      <Link 
        className='text-gray-700 hover:text-blue-600 hover:text-blue-800 text-lg transition-colors'
        href='/cronologia'
      >
        Ver más
      </Link>
    </div>
  )
}
