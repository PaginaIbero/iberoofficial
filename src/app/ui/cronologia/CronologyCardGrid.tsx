'use client';

import { trpc } from "@/app/_trpc/client";
import { cronologia } from "@/lib/types";
import { useRouter } from "next/navigation";
import { CronologyCardGridSkeleton } from "@/app/ui/cronologia/CronologyCardGridSkeleton";

export default function CronologyCardGrid() {
  const { data, isLoading } = trpc.cronologia.getAll.useQuery();
  const router = useRouter();

  if (isLoading) {
    return <CronologyCardGridSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {data?.map((item: cronologia) => (
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
      ))}
    </div>
  );
} 