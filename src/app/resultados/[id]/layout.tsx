'use client'

import { trpc } from "@/app/_trpc/client";
import Chips from "@/app/ui/resultados/chips";

export default function Layout({ params, children }: {
  params: {
    id: number
  },
  children: React.ReactNode
}) {
  const { data, isLoading } = trpc.cronologia.getByID.useQuery(Number(params.id))
  return (
    <>
      <h1 className='text-4xl text-center'>
        <span className='font-semibold'>{data?.ciudad}</span>, {data?.pais}
      </h1>
      <h2 className='text-4xl text-center'>
        {params.id}
      </h2>
      <Chips id={params.id}/>
      {children}
    </>
  )
}