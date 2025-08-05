'use client';

import Link from "next/link";
import { DistribucionProblemas, DistribucionPuntajes } from "@/app/ui/resultados/Charts";
import LogoEdicion from "@/app/ui/resultados/LogoEdicion";

interface StatisticsSectionProps {
  id: number;
  generalInfoData: any;
}

export default function StatisticsSection({ id, generalInfoData }: StatisticsSectionProps) {
  return (
    <div>
      <h3 className="text-xl font-bold">Información General</h3>
      <LogoEdicion id={id} />
      <p className="mt-1">
        <span className="text-gray-600">Sede:&nbsp;</span>
        <span className="font-semibold">{generalInfoData?.ciudad}, {generalInfoData?.pais}</span>
      </p>
      <p className="mt-1">
        <span className="text-gray-600">Fecha:&nbsp;</span>
        <span className="font-semibold">{generalInfoData?.fecha}</span>
      </p>
      <p className="mt-1">
        <span className="text-gray-600">Países:&nbsp;</span>
        <span className="font-semibold">{generalInfoData?.paises}</span>
      </p>
      <p className="mt-1">
        <span className="text-gray-600">Concursantes:&nbsp;</span>
        <span className="font-semibold">{generalInfoData?.concursantes}</span>
      </p>
      <p className="mt-1">
        <span className="text-gray-600">Pruebas:&nbsp;</span>
        <Link
          className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
          href={`/pruebas/${id}-sp.pdf`}
        >
          Español
        </Link> |&nbsp;
        <Link
          className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm hover:bg-green-200 transition-colors"
          href={`/pruebas/${id}-pt.pdf`}
        >
          Portugués
        </Link> |&nbsp;
        <Link
          className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition-colors"
          href={`/pruebas/${id}-en.pdf`}
        >
          Inglés
        </Link> |&nbsp;
        <Link
          className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm hover:bg-orange-200 transition-colors"
          href={`/sl/${id}.pdf`}
        >
          Shortlist
        </Link>
      </p>
      
      <div className="p-4">
        <DistribucionPuntajes id={id} />
      </div>

      <div className="p-4">
        <DistribucionProblemas id={id} />
      </div>

      <div className="p-4">
        <p className="text-gray-600 mb-4 text-center">
          Momentos destacados de la Olimpiada Iberoamericana de Matemática {id}
        </p>
        { /* <CarrouselFotos id={id} /> */}
      </div>
    </div>
  );
} 