'use client'

import { cronologia } from "@/lib/types"
import { trpc } from "../../_trpc/client"
import Card from "./card"

export default function CardGrid() {
  const [data, _] = trpc.cronologia.getAll.useSuspenseQuery()
  return (
    <>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
        {data.map((item: cronologia) => (
          <Card
            key={item.id}
            title={item.id.toString()}
            subtitle={item.ciudad + ', ' + item.pais}
          />
        ))}
      </div>
    </>
  )
}