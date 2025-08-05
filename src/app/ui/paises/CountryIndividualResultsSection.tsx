'use client';

import ResponsiveTable from "@/app/ui/components/ResponsiveTable";

interface CountryIndividualResultsSectionProps {
  resultsData: any[];
}

export default function CountryIndividualResultsSection({ resultsData }: CountryIndividualResultsSectionProps) {
  // Flatten the data to get individual results
  const flattenedData = resultsData?.flatMap((participacion) =>
    participacion.equipo.map((resultado: any) => ({
      ...resultado,
      fecha: participacion.fecha,
      id: resultado.id
    }))
  ) || [];

  const columns = [
    { key: 'fecha', label: 'Año' },
    { key: 'ranking', label: 'Ranking', className: 'font-semibold', render: (value: number) => `#${value}` },
    { key: 'nombreCompleto', label: 'Nombre', className: 'font-medium' },
    { key: 'prob1', label: 'P1' },
    { key: 'prob2', label: 'P2' },
    { key: 'prob3', label: 'P3' },
    { key: 'prob4', label: 'P4' },
    { key: 'prob5', label: 'P5' },
    { key: 'prob6', label: 'P6' },
    { key: 'total', label: 'Total', className: 'font-semibold' },
    { key: 'premio', label: 'Premio' }
  ];

  const mobileRender = (row: any) => (
    <div className="flex flex-col text-left">
      <p>
        <span className="font-semibold">{row.fecha}</span>&nbsp;
      </p>
      <p>
        <span className="font-medium">{row.nombreCompleto}</span>&nbsp;
      </p>
      <p>
        <span>{row.prob1}</span> +&nbsp;
        <span>{row.prob2}</span> +&nbsp;
        <span>{row.prob3}</span> +&nbsp;
        <span>{row.prob4}</span> +&nbsp;
        <span>{row.prob5}</span> +&nbsp;
        <span>{row.prob6}</span> =&nbsp;
        <span className='font-semibold'>{row.total}</span>
      </p>
      <p>
        <span className="font-semibold">{row.premio}</span>&nbsp;
        <span className="font-semibold">(#{row.ranking})</span>&nbsp;
      </p>
    </div>
  );

  return (
    <ResponsiveTable
      columns={columns}
      data={flattenedData}
      mobileTitle="Información del Participante"
      headerClassName="bg-purple-200"
      rowClassName="bg-purple-50"
      mobileRender={mobileRender}
    />
  );
} 