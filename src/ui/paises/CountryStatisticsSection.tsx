'use client';

interface CountryStatisticsSectionProps {
  countryData: any;
  acumuladoData: any;
}

export default function CountryStatisticsSection({ countryData, acumuladoData }: CountryStatisticsSectionProps) {
  return (
    <div>
      <h3 className="text-xl font-bold">Información General</h3>
      <p className="mt-1">
        <span className="text-gray-600">Contacto:&nbsp;</span>
        <span className="font-semibold">{countryData?.contacto || 'N/A'}</span>
      </p>
      <p className="mt-1">
        <span className="text-gray-600">Sitio OM:&nbsp;</span>
        <span className="font-semibold">{countryData?.sitio || 'N/A'}</span>
      </p>
      <p className="mt-1">
        <span className="text-gray-600">Participaciones:&nbsp;</span>
        <span className="font-semibold">
          {acumuladoData?.participaciones}
        </span>&nbsp;
        <span className="text-gray-600">(primera participación:&nbsp;</span>
        <span className="font-semibold">{acumuladoData?.primera}</span>
        <span className="text-gray-600">)</span>  
      </p>
      <p className="mt-1">
        <span className="text-gray-600">Concursantes:&nbsp;</span>
        <span className="font-semibold">{acumuladoData?.concursantes}</span>
      </p>
      <p className="mt-1">
        <span className="text-gray-600">Premios:&nbsp;</span>
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">{acumuladoData?.premios[0]} 🥇 </span>&nbsp;|&nbsp;
        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">{acumuladoData?.premios[1]} 🥈 </span>&nbsp;|&nbsp;
        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">{acumuladoData?.premios[2]} 🥉 </span>&nbsp;|&nbsp;
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{acumuladoData?.premios[3]} MH</span>
      </p>
      <p>
        <span className="text-gray-600">Copas Puerto Rico:&nbsp;</span>
        {acumuladoData?.copas_pr.map((year: any, index: number) => (
          <span key={index} className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
            {year}
          </span>
        ))}&nbsp;
        <span className="text-xs text-gray-600">
          Total: {acumuladoData?.copas_pr.length}&nbsp;
        </span>
      </p>
    </div>
  );
} 