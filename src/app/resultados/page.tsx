'use client';

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AcumuladoAnoTable, AcumuladoPaisTable } from "@/app/ui/resultados/table";
import { AcumuladoAnoMobileTable, AcumuladoPaisMobileTable } from "@/app/ui/resultados/mobile";
import Chips from "@/app/ui/resultados/chips";

export default function Page() {
  return (
    <Suspense fallback={'Loading...'}>
      <Content/>
    </Suspense>
  )
}

function Content() {
  const searchParams = new URLSearchParams(useSearchParams());
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
      {searchParams?.get('section') === 'por-año' && <>
        <div className='hidden md:block'>
          <br/>
          <AcumuladoAnoTable/>
        </div>
        <div className='block md:hidden'>
          <AcumuladoAnoMobileTable/>
        </div>
      </>}
      {searchParams?.get('section') === 'por-pais' && <>
        <div className='hidden md:block'>
          <br/>
          <AcumuladoPaisTable/>
        </div>
        <div className='block md:hidden'>
          <AcumuladoPaisMobileTable/>
        </div>
      </>}
    </div>
  )
}