import { Suspense } from "react"
import { CardGridSkeleton } from "@/app/ui/skeletons"
import CardGrid from "@/app/ui/pruebas/card_grid"

export default function Page() {
  return (
    <div className="flex flex-col text-black">
      <h1 className='text-4xl font-semibold text-center'>
        Pruebas
      </h1>
      <p className='text-center'>
        Archivo de pruebas de la Olimpiada Iberoamericana de Matemática
      </p>
      <br/>
      {/*
      <Suspense fallback={<CardGridSkeleton/>}>
        <CardGrid/>
      </Suspense>
      */}
    </div>
  )
}