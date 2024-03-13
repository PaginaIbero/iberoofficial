'use client';

import { trpc } from "../_trpc/client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AcumuladoAnoTable, AcumuladoPaisTable } from "@/app/ui/resultados/table";
import Chips from "@/app/ui/resultados/chips";

export default function Page() {
  //trpc.cargaDatos.cargaResultadosPorFecha.useQuery(2023)
  return (
    <div className="flex flex-col text-black">
      <h1 className='text-4xl font-semibold text-center'>
        Resultados
      </h1>
      <p className='text-center mb-5'>
        Resultados de las instancias de la Olimpiada Iberoamericana de Matemática
      </p>
      <Chips chips={[{
        text: 'Por año',
        href: 'por-año'
      }, {
        text: 'Por país',
        href: 'por-pais'
      }]}/>
      <Suspense fallback={'Loading...'}>
        <ResultadosContent/>
      </Suspense>
    </div>
  )
}

function ResultadosContent() {
  const searchParams = new URLSearchParams(useSearchParams());
  return (
    <>
      {searchParams.get('section') === 'por-año' && <AcumuladoAnoTable/>}
      {searchParams.get('section') === 'por-pais' && <AcumuladoPaisTable/>}
    </>
  )
}