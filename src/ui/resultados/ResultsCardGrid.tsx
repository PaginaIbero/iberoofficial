'use client';

import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ResultsCardGridSkeleton } from "@/ui/resultados/ResultsCardGridSkeleton";
import Chips from "@/ui/components/Chips";

export default function ResultsCardGrid() {
  const [view, setView] = useState<'years' | 'countries'>('years');
  const router = useRouter();

  const { data: yearsData, isLoading: yearsLoading } = trpc.cronologia.getAll.useQuery();
  const { data: countriesData, isLoading: countriesLoading } = trpc.participaciones.getAcumuladoPais.useQuery();

  const isLoading = view === 'years' ? yearsLoading : countriesLoading;

  const chipOptions = [
    { id: 'years', label: 'Por Año', value: 'years' },
    { id: 'countries', label: 'Por País', value: 'countries' }
  ];

  const handleViewChange = (value: string) => {
    setView(value as 'years' | 'countries');
  };

  if (isLoading) {
    return <ResultsCardGridSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <Chips
        options={chipOptions}
        defaultValue={view}
        onChange={handleViewChange}
        className="flex justify-center"
      />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {view === 'years' ? (
          // Years View
          yearsData?.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300"
              onClick={() => {
                router.push(`/resultados/${item.id}?section=estadisticas`);
              }}
            >
              {/* Header with year */}
              <div className="bg-blue-400 text-white p-4 rounded-t-lg">
                <h2 className="text-2xl font-bold text-center">{item.id}</h2>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Location */}
                <div className="text-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.ciudad}
                  </h3>
                  <p className="text-gray-600">{item.pais}</p>
                </div>

                {/* Date */}
                <div className="text-center mb-3">
                  <p className="text-sm text-gray-500">{item.fecha || "-"}</p>
                </div>

                {/* Stats */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Países:</span>
                    <span className="font-semibold">{item.paises}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Concursantes:</span>
                    <span className="font-semibold">{item.concursantes}</span>
                  </div>
                </div>

                {/* Awards - Only show on larger screens */}
                <div className="hidden lg:block mt-4 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Cortes:</span>
                      <div className="flex space-x-1 mt-1">
                        <span className="bg-yellow-100 text-yellow-800 px-1 rounded">O: {item.cortes?.[0] || '-'}</span>
                        <span className="bg-gray-100 text-gray-800 px-1 rounded">P: {item.cortes?.[1] || '-'}</span>
                        <span className="bg-orange-100 text-orange-800 px-1 rounded">B: {item.cortes?.[2] || '-'}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Premios:</span>
                      <div className="flex space-x-1 mt-1">
                        <span className="bg-yellow-100 text-yellow-800 px-1 rounded">O: {item.premios?.[0] || '-'}</span>
                        <span className="bg-gray-100 text-gray-800 px-1 rounded">P: {item.premios?.[1] || '-'}</span>
                        <span className="bg-orange-100 text-orange-800 px-1 rounded">B: {item.premios?.[2] || '-'}</span>
                        <span className="bg-blue-100 text-blue-800 px-1 rounded">MH: {item.premios?.[3] || '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Copa PR indicator */}
                {item.copa_pr && (
                  <div className="mt-3 pt-2 border-t border-gray-200">
                    <div className="text-center">
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        🏆 Copa PR: {item.copa_pr.nombre}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          // Countries View
          countriesData?.map((item) => (
            <div
              key={item.codigo}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300"
              onClick={() => {
                router.push(`/paises/${item.codigo}?section=equipo`);
              }}
            >
              {/* Header with country */}
              <div className="bg-blue-400 text-white p-4 rounded-t-lg">
                <h2 className="text-xl font-bold text-center">{item.pais}</h2>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Stats */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Participaciones:</span>
                    <span className="font-semibold">{item.participaciones}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">1ra participación:</span>
                    <span className="font-semibold">{item.primera}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Concursantes:</span>
                    <span className="font-semibold">{item.concursantes}</span>
                  </div>
                </div>

                {/* Awards */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Oro:</span>
                      <span className="font-semibold text-yellow-600">{item.premios[0]}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Plata:</span>
                      <span className="font-semibold text-gray-600">{item.premios[1]}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Bronce:</span>
                      <span className="font-semibold text-orange-600">{item.premios[2]}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Menciones:</span>
                      <span className="font-semibold text-blue-600">{item.premios[3]}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Copas PR:</span>
                      <span className="font-semibold text-green-600">{item.copas_pr}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 