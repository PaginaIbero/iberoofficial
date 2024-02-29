'use client'

import { cronologia } from "@/lib/types"
import { trpc } from "../_trpc/client"
import Card from "./card"

export default function CardGrid() {
  const { data: cronologia, isLoading } = trpc.cronologia.getAll.useQuery()
  return (
    <>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4'>
        {cronologia ? cronologia.map((item: cronologia) => (
          <Card
            key={item.id}
            title={item.id.toString()}
            subtitle={item.ciudad + ', ' + item.pais}
          />
        )) : <p>Loading...</p>}
      </div>
    </>
  )
}