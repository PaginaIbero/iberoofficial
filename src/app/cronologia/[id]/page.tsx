'use client'
import { trpc } from "@/app/_trpc/client";

export default function Page({ params }: { 
  params: { 
    id: number 
  } 
}) {
  // esta línea me da error y no sé cómo resolver
  const año = Number(params.id)
  const { data } = trpc.cronologia.getByID.useQuery(año)
  console.log(data?.ciudad)
  // Tira error porque está tomando params.id como string
  return (
    <div className="flex flex-col text-black">
      <h1 className='text-4xl font-semibold text-center'>
        {params.id}
      </h1>
      <h2 className='text-2xl font-semibold'>
        Información general
      </h2>

    </div>
  )
}