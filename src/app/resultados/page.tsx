'use client';

import { useSearchParams } from "next/navigation";
import { AcumuladoAnoTable, AcumuladoPaisTable } from "@/app/ui/resultados/table";
import Chips from "@/app/ui/resultados/chips";

export default function Page() {
  const searchParams = new URLSearchParams(useSearchParams());
  return (
    <div className="flex flex-col text-black">
      <h1 className='text-4xl font-semibold text-center'>
        Resultados
      </h1>
      <p className='text-center mb-5'>
        La OIM es una competencia matemática que se lleva a cabo anualmente en un país iberoamericano.
      </p>
      <Chips chips={[{
        text: 'Por año',
        href: 'por-año'
      }, {
        text: 'Por país',
        href: 'por-pais'
      }]}/>
      {searchParams.get('section') === 'por-año' && <AcumuladoAnoTable/>}
      {searchParams.get('section') === 'por-pais' && <AcumuladoPaisTable/>}
    </div>
  )
}