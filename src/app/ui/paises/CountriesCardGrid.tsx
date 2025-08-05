'use client';

import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

export default function CountriesCardGrid() {
  const router = useRouter();
  const { data, isLoading } = trpc.paises.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md animate-pulse">
            <div className="bg-gray-300 h-16 rounded-t-lg"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="space-y-2">
                {[...Array(4)].map((_, j) => (
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
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {data?.map((pais) => (
        <div
          key={pais.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300"
          onClick={() => router.push(`/paises/${pais.id}?section=estadisticas`)}
        >
          {/* Header with country code */}
          <div className="bg-blue-500 text-white p-4 rounded-t-lg">
            <h2 className="text-xl font-bold text-center">{pais.id}</h2>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Country name */}
            <div className="text-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {pais.nombre}
              </h3>
            </div>

            {/* Stats */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Contacto:</span>
                <span className="font-semibold text-sm">{pais.contacto || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Sitio OM:</span>
                <span className="font-semibold text-sm">{pais.sitio || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">1ra participación:</span>
                <span className="font-semibold">{pais.primera?.toString() || 'N/A'}</span>
              </div>
            </div>

            {/* Host information - Only show on larger screens */}
            {pais.anfitrion && pais.anfitrion.length > 0 && (
              <div className="hidden lg:block mt-4 pt-3 border-t border-gray-200">
                <div className="text-center">
                  <span className="text-gray-500 text-sm">Anfitrión:</span>
                  <div className="mt-1">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {pais.anfitrion.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 