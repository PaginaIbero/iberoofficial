'use client';

import { trpc } from "@/app/_trpc/client";
import { useState } from "react";
import Chips from "@/app/ui/components/Chips";
import CountryStatisticsSection from "@/app/ui/paises/CountryStatisticsSection";
import CountryIndividualResultsSection from "@/app/ui/paises/CountryIndividualResultsSection";
import CountryTeamResultsSection from "@/app/ui/paises/CountryTeamResultsSection";

export default function CountryDetailsCardGrid({ id }: { id: string }) {
  const [view, setView] = useState<'stats' | 'individual' | 'team'>('stats');

  const { data: countryData, isLoading: countryLoading } = trpc.paises.getByID.useQuery(id);
  const { data: resultsData, isLoading: resultsLoading } = trpc.participaciones.getByPais.useQuery(id);
  const { data: acumuladoData, isLoading: acumuladoLoading } = trpc.participaciones.getAcumuladoByPais.useQuery(id);

  const isLoading = countryLoading || resultsLoading || acumuladoLoading;

  const chipOptions = [
    { id: 'stats', label: 'Estadísticas', value: 'stats' },
    { id: 'individual', label: 'Individuales', value: 'individual' },
    { id: 'team', label: 'Por Equipo', value: 'team' }
  ];

  const handleViewChange = (value: string) => {
    setView(value as 'stats' | 'individual' | 'team');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center space-x-4">
          <div className="h-10 w-24 bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 p-4">
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
      <h1 className='text-center font-bold text-4xl'>{countryData?.nombre}</h1>

      {/* View Toggle */}
      <Chips
        options={chipOptions}
        defaultValue={view}
        onChange={handleViewChange}
        className="flex justify-center"
      />

      {/* Content */}
      {view === 'stats' && (
        <CountryStatisticsSection 
          countryData={countryData} 
          acumuladoData={acumuladoData} 
        />
      )}

      {view === 'individual' && (
        <CountryIndividualResultsSection resultsData={resultsData || []} />
      )}

      {view === 'team' && (
        <CountryTeamResultsSection resultsData={resultsData || []} />
      )}
    </div>
  );
} 