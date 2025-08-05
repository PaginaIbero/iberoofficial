'use client';

import { trpc } from "@/app/_trpc/client";
import { useState } from "react";
import Link from "next/link";
import { DistribucionProblemas, DistribucionPuntajes } from "@/app/ui/resultados/charts";
import LogoEdicion from "@/app/ui/resultados/logoEdicion";

export default function IndividualResultsCardGrid({ id }: { id: number }) {
  const [view, setView] = useState<'stats' | 'individual' | 'countries'>('stats');
  
  const { data: cronologiaData, isLoading: cronologiaLoading } = trpc.cronologia.getByID.useQuery(id);
  const { data: generalInfoData, isLoading: generalInfoLoading } = trpc.cronologia.getGeneralInfoByID.useQuery(id);
  const { data: individualResultsData, isLoading: individualResultsLoading } = trpc.resultados.getByFecha.useQuery(id);
  // const { data: countryResultsData, isLoading: countryResultsLoading } = trpc.resultados.getPorPais.useQuery(id);

  const isLoading = cronologiaLoading || generalInfoLoading || individualResultsLoading; // || countryResultsLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center space-x-4">
          <div className="h-10 w-24 bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md animate-pulse">
              <div className="bg-gray-300 h-16 rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="flex justify-between">
                      <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setView('stats')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            view === 'stats'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Estadísticas
        </button>
        <button
          onClick={() => setView('individual')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            view === 'individual'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Individuales
        </button>
        <button
          onClick={() => setView('countries')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            view === 'countries'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Por País
        </button>
      </div>

      {/* Content */}
      {view === 'stats' && (
        <div className="space-y-6">
          {/* General Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {/* General Info Card */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="bg-blue-500 text-white p-4 rounded-t-lg">
                <h3 className="text-lg font-bold text-center">Información General</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sede:</span>
                  <span className="font-semibold">{generalInfoData?.ciudad}, {generalInfoData?.pais}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Fecha:</span>
                  <span className="font-semibold">{generalInfoData?.fecha}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Países:</span>
                  <span className="font-semibold">{generalInfoData?.paises}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Concursantes:</span>
                  <span className="font-semibold">{generalInfoData?.concursantes}</span>
                </div>
              </div>
            </div>

            {/* Tests Card */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="bg-green-500 text-white p-4 rounded-t-lg">
                <h3 className="text-lg font-bold text-center">Pruebas</h3>
              </div>
              <div className="p-4 space-y-2">
                <div className="text-center">
                  <Link
                    className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
                    href={`/pruebas/${id}-sp.pdf`}
                  >
                    Español
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm hover:bg-green-200 transition-colors"
                    href={`/pruebas/${id}-pt.pdf`}
                  >
                    Portugués
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition-colors"
                    href={`/pruebas/${id}-en.pdf`}
                  >
                    Inglés
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm hover:bg-orange-200 transition-colors"
                    href={`/sl/${id}.pdf`}
                  >
                    Shortlist
                  </Link>
                </div>
              </div>
            </div>

            {/* Logo Card */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="bg-yellow-500 text-white p-4 rounded-t-lg">
                <h3 className="text-lg font-bold text-center">Logo</h3>
              </div>
              <div className="p-4">
                <div className="flex justify-center">
                  <LogoEdicion id={id} />
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="bg-purple-500 text-white p-4 rounded-t-lg">
                <h3 className="text-lg font-bold text-center">Distribución de Puntajes</h3>
              </div>
              <div className="p-4">
                <DistribucionPuntajes id={id} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="bg-indigo-500 text-white p-4 rounded-t-lg">
                <h3 className="text-lg font-bold text-center">Distribución por Problema</h3>
              </div>
              <div className="p-4">
                <DistribucionProblemas id={id} />
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="bg-pink-500 text-white p-4 rounded-t-lg">
              <h3 className="text-lg font-bold text-center">Galería de Fotos</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-4 text-center">
                Momentos destacados de la Olimpiada Iberoamericana de Matemática {id}
              </p>
              { /* <CarrouselFotos id={id} /> */ }
            </div>
          </div>
        </div>
      )}

      {view === 'individual' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {individualResultsData?.map((resultado) => (
            <div key={resultado.id} className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="bg-blue-500 text-white p-4 rounded-t-lg">
                <h3 className="text-lg font-bold text-center">#{resultado.ranking}</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-800">{resultado.nombreCompleto}</h4>
                  <p className="text-sm text-gray-600">{resultado.pais}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total:</span>
                  <span className="font-semibold">{resultado.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Premio:</span>
                  <span className="font-semibold">{resultado.premio}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div className="text-center">
                    <span className="text-gray-500">P1</span>
                    <div className="font-semibold">{resultado.prob1}</div>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-500">P2</span>
                    <div className="font-semibold">{resultado.prob2}</div>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-500">P3</span>
                    <div className="font-semibold">{resultado.prob3}</div>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-500">P4</span>
                    <div className="font-semibold">{resultado.prob4}</div>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-500">P5</span>
                    <div className="font-semibold">{resultado.prob5}</div>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-500">P6</span>
                    <div className="font-semibold">{resultado.prob6}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'countries' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          { /* countryResultsData?.map((resultado) => (
            <div key={resultado.pais} className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="bg-green-500 text-white p-4 rounded-t-lg">
                <h3 className="text-lg font-bold text-center">{resultado.pais}</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total:</span>
                  <span className="font-semibold">{resultado.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Promedio:</span>
                  <span className="font-semibold">{resultado.promedio}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Mejor:</span>
                  <span className="font-semibold">{resultado.mejor}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Peor:</span>
                  <span className="font-semibold">{resultado.peor}</span>
                </div>
              </div>
            </div>
          )) */ }
        </div>
      )}
    </div>
  );
} 