'use client';

import { trpc } from "@/app/_trpc/client";
import { useState } from "react";
import Chips from "@/ui/components/Chips";
import StatisticsSection from "@/ui/resultados/StatisticsSection";
import IndividualResultsSection from "@/ui/resultados/IndividualResultsSection";
import TeamResultsSection from "./TeamResultsSection";

export default function IndividualResultsCardGrid({ id }: { id: number }) {
  const [view, setView] = useState<'stats' | 'individual' | 'countries'>('stats');

  const { data: cronologiaData, isLoading: cronologiaLoading } = trpc.cronologia.getByID.useQuery(id);
  const { data: generalInfoData, isLoading: generalInfoLoading } = trpc.cronologia.getGeneralInfoByID.useQuery(id);
  const { data: individualResultsData, isLoading: individualResultsLoading } = trpc.resultados.getByFecha.useQuery(id);
  const { data: teamResultsData, isLoading: teamResultsLoading } = trpc.participaciones.getByFecha.useQuery(id);

  const isLoading = cronologiaLoading || generalInfoLoading || individualResultsLoading || teamResultsLoading;

  const chipOptions = [
    { id: 'stats', label: 'Estadísticas', value: 'stats' },
    { id: 'individual', label: 'Individuales', value: 'individual' },
    { id: 'countries', label: 'Países', value: 'countries' }
  ];

  const handleViewChange = (value: string) => {
    setView(value as 'stats' | 'individual');
  };

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
      <Chips
        options={chipOptions}
        defaultValue={view}
        onChange={handleViewChange}
        className="flex justify-center"
      />

      {view === 'stats' && (
        <StatisticsSection id={id} generalInfoData={generalInfoData} />
      )}

      {view === 'individual' && (
        <IndividualResultsSection individualResultsData={individualResultsData || []} />
      )}
      
      {view === 'countries' && (
        <TeamResultsSection teamResultsData={teamResultsData || []} /> 
      )}
    </div>
  );
} 