'use client';

import { trpc } from "@/app/_trpc/client";
import { useState } from "react";

export default function CountryDetailsCardGrid({ id }: { id: string }) {
  const [view, setView] = useState<'stats' | 'individual' | 'team'>('stats');
  
  const { data: countryData, isLoading: countryLoading } = trpc.paises.getByID.useQuery(id);
  const { data: resultsData, isLoading: resultsLoading } = trpc.participaciones.getByPais.useQuery(id);
  const { data: acumuladoData, isLoading: acumuladoLoading } = trpc.participaciones.getAcumuladoByPais.useQuery(id);

  const isLoading = countryLoading || resultsLoading || acumuladoLoading;

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
          onClick={() => setView('team')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            view === 'team'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Por Equipo
        </button>
      </div>

      {/* Content */}
      {view === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {/* General Information Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="bg-blue-500 text-white p-4 rounded-t-lg">
              <h3 className="text-lg font-bold text-center">Información General</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Nombre:</span>
                <span className="font-semibold">{countryData?.nombre}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Contacto:</span>
                <span className="font-semibold text-sm">{countryData?.contacto}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Sitio OM:</span>
                <span className="font-semibold text-sm">{countryData?.sitio}</span>
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="bg-green-500 text-white p-4 rounded-t-lg">
              <h3 className="text-lg font-bold text-center">Resultados</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Participaciones:</span>
                <span className="font-semibold">{acumuladoData?.participaciones}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">1ra participación:</span>
                <span className="font-semibold">{acumuladoData?.primera}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Concursantes:</span>
                <span className="font-semibold">{acumuladoData?.concursantes}</span>
              </div>
            </div>
          </div>

          {/* Awards Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="bg-yellow-500 text-white p-4 rounded-t-lg">
              <h3 className="text-lg font-bold text-center">Premios</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">🥇 Oro:</span>
                <span className="font-semibold text-yellow-600">{acumuladoData?.premios[0]}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">🥈 Plata:</span>
                <span className="font-semibold text-gray-600">{acumuladoData?.premios[1]}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">🥉 Bronce:</span>
                <span className="font-semibold text-orange-600">{acumuladoData?.premios[2]}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">MH:</span>
                <span className="font-semibold text-blue-600">{acumuladoData?.premios[3]}</span>
              </div>
            </div>
          </div>

          {/* Copa PR Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="bg-green-600 text-white p-4 rounded-t-lg">
              <h3 className="text-lg font-bold text-center">🏆 Copa Puerto Rico</h3>
            </div>
            <div className="p-4">
              <div className="text-center">
                {acumuladoData?.copas_pr && acumuladoData.copas_pr.length > 0 ? (
                  <div className="space-y-2">
                    {acumuladoData.copas_pr.map((year, index) => (
                      <span key={index} className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                        {year}
                      </span>
                    ))}
                    <p className="text-xs text-gray-500 mt-2">
                      Total: {acumuladoData.copas_pr.length}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500">Ninguna</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'individual' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          { /* resultsData?.map((resultado) => (
            <div key={resultado.id} className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="bg-purple-500 text-white p-4 rounded-t-lg">
                <h3 className="text-lg font-bold text-center">{resultado}</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Año:</span>
                  <span className="font-semibold">{resultado.fecha}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Ranking:</span>
                  <span className="font-semibold">#{resultado.ranking}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total:</span>
                  <span className="font-semibold">{resultado.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Premio:</span>
                  <span className="font-semibold">{resultado.premio}</span>
                </div>
              </div>
            </div>
          )) */ }
        </div>
      )}

      {view === 'team' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          { /* resultsData?.map((resultado) => (
            <div key={resultado.id} className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="bg-indigo-500 text-white p-4 rounded-t-lg">
                <h3 className="text-lg font-bold text-center">{resultado.equipo}</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Año:</span>
                  <span className="font-semibold">{resultado.fecha}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total:</span>
                  <span className="font-semibold">{resultado.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Premio:</span>
                  <span className="font-semibold">{resultado.premio}</span>
                </div>
              </div>
            </div>
          )) */ }
        </div>
      )}
    </div>
  );
} 