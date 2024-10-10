'use client';

import { Cronologia } from "@prisma/client";
import { trpc } from "../_trpc/client"
import Link from "next/link";

/*
 TODO:
 1) Separar tabla en otro archivo
 2) Mostrar sólo las pruebas disponibles (con un fetch o algo así)
 */

export default function Page() {
  const { data, isLoading } = trpc.cronologia.getAll.useQuery()

  return (
    <div className='flex flex-col text-black'>
      <h1 className='text-4xl font-semibold text-center'>
        Pruebas
      </h1>
      <p className='text-center'>
        Archivo de pruebas de la Olimpiada Iberoamericana de Matemática
      </p>
      <br/>
      <div className='grid grid-cols-12 gap-y-1'>
        {!isLoading ? 
          data?.map((cronologia, i) => (
            <Row cronologia={cronologia} key={i}/>
          )) : 
          <p className='text-center'>Cargando...</p>}
      </div>
    </div>
  )
}

function Row({ cronologia }: {
  cronologia: Cronologia
}) {
  return (
    <>
      <div className='col-span-1'>
        <h2 className='font-semibold'>
          {cronologia.id}
        </h2>
      </div>
      <div className='col-span-3'>
        <p className=''>
          {cronologia.ciudad}, {cronologia.pais}
        </p>
      </div>
      <div className='col-span-2'>
        <Link 
          className='hover:underline cursor-pointer text-blue-500'
          href={`/pruebas/${cronologia.id}-sp.pdf`}
        >
          Español
        </Link>
      </div>
      <div className='col-span-2'>
        <Link
          className='hover:underline cursor-pointer text-blue-500' 
          href={`/pruebas/${cronologia.id}-pt.pdf`}
        >
          Portugués
        </Link>
      </div>
      <div className='col-span-2'>
        <Link
          className='hover:underline cursor-pointer text-blue-500'
          href={`/pruebas/${cronologia.id}-en.pdf`}
        >
          Inglés
        </Link>
      </div>
      <div className='col-span-2'>
        <Link
          className='hover:underline cursor-pointer text-blue-500'
          href={`/sl/${cronologia.id}.pdf`}
        >
          Shortlist
        </Link>
      </div>
    </>
  )
}