'use client'

import { trpc } from "@/app/_trpc/client"

export default function Page({ params }: {
  params: {
    id: number
  }
}) {
  const { data, isLoading } = trpc.cronologia.getByID.useQuery(Number(params.id))
  return (
    <>
      <h3 className='text-xl font-semibold mt-2'>
        Información general
      </h3>
      <ul className='list-disc pl-6'>
        <li>Sede: {data?.ciudad}, {data?.pais} ({data?.fecha})</li>
        <li>Países participantes: {data?.paises}</li>
        <li>Concursantes: {data?.participantes}</li>
      </ul>
    </>
  )
}