'use client';

import ResponsiveTable from "@/app/ui/components/ResponsiveTable";
import { pais } from "@/lib/types";

interface TeamResultsSectionProps {
  teamResultsData: any[];
}

export default function TeamResultsSection({ teamResultsData: resultsData }: TeamResultsSectionProps) {
  const columns = [
    { key: 'pais', label: 'País', className: 'font-semibold', render: (value: pais) => `${value.nombre}` },
    { key: 'ranking', label: 'Ranking', className: 'font-semibold', render: (value: number) => `#${value}` },
    { key: 'prob1', label: 'P1' },
    { key: 'prob2', label: 'P2' },
    { key: 'prob3', label: 'P3' },
    { key: 'prob4', label: 'P4' },
    { key: 'prob5', label: 'P5' },
    { key: 'prob6', label: 'P6' },
    { key: 'total', label: 'Total', className: 'font-semibold' },
    { 
      key: 'premios', 
      label: 'Premios',
      render: (value: any, row: any) => `${row.premios[0]} 🥇 | ${row.premios[1]} 🥈 | ${row.premios[2]} 🥉 | ${row.premios[3]} MH`
    }
  ];

  const mobileRender = (row: any) => (
    <div className="flex flex-col text-left">
      <p className="text font-semibold">{row.pais.nombre}</p>
      <p className="text-sm">Ranking: #{row.ranking}</p>
      <p className="text-sm">
        <span>{row.prob1}</span> +&nbsp;
        <span>{row.prob2}</span> +&nbsp;
        <span>{row.prob3}</span> +&nbsp;
        <span>{row.prob4}</span> +&nbsp;
        <span>{row.prob5}</span> +&nbsp;
        <span>{row.prob6}</span> =&nbsp;
        <span className="font-semibold">{row.total}</span>
      </p>
      <p className="text-sm">
        {row.premios[0]} 🥇 | {row.premios[1]} 🥈 | {row.premios[2]} 🥉 | {row.premios[3]} MH
      </p>
    </div>
  );

  return (
    <ResponsiveTable
      columns={columns}
      data={resultsData || []}
      mobileTitle="Información del Equipo"
      headerClassName="bg-indigo-200"
      rowClassName="bg-indigo-50"
      mobileRender={mobileRender}
    />
  );
} 