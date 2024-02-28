'use client'

import { cronologia } from "@/lib/types"
import { trpc } from "../_trpc/client"
import Card from "./card"

const CardGrid = () => {
    
    const {data: cronologia, isLoading} = trpc.cronologia.getAll.useQuery()

    return (
        <>
        <div className='grid grid-cols-4 gap-4'>
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

export default CardGrid