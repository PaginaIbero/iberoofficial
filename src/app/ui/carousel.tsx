'use client';

import { trpc } from "../_trpc/client";
import Link from "next/link";

export default function Carousel() {
  const [data, dataQuery] = trpc.cronologia.getAll.useSuspenseQuery()
  return (
    <div className='flex flex-col md:flex-row w-full gap-5'>
      {data?.slice(0, 2).map(cronologia => (<YearCard id={cronologia.id} key={cronologia.id}/>))}
      <VerMasCard/>
    </div>
  )
}

export function YearCard({ id }: {
  id: number
}) {
  return (
    <div className='flex flex-col justify-center items-center bg-white h-36 md:h-48 md:w-1/4 p-5 md:gap-3 shadow'>
      <h1 className='text-4xl font-semibold'>{id}</h1>
      <Link
        className='text-gray-800 hover:text-blue-500 rounded-md'
        href={`/resultados/${id}`}
      >
        Ver Resultados
      </Link>
      <Link
        className='text-gray-800 hover:text-blue-500 rounded-md'
        href={`/pruebas/${id}`}
      >
        Ver Pruebas
      </Link>
    </div>
  )
}

export function VerMasCard() {
  return (
    <div className='flex flex-col justify-center items-center bg-white h-36 md:h-48 md:w-1/4 p-5 md:gap-3 shadow'>
      <h1 className='text-4xl font-semibold'>
        <Link 
          className='text-gray-800 hover:text-blue-500 rounded-md'
          href='/cronologia'
        >
          Ver más
        </Link>
      </h1>
    </div>
  )
}