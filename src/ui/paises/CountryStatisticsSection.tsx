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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
        {/* Results Summary Card */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="bg-green-500 text-white p-4 rounded-t-lg">
            <h3 className="text-lg font-bold text-center">General</h3>
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
            <div className="flex gap-x-2 items-center">
              <span className="text-sm text-gray-600">🏆 Copas Puerto Rico:</span>
              {acumuladoData?.copas_pr && acumuladoData.copas_pr.length > 0 ? (
                <>
                  {acumuladoData.copas_pr.map((year: any, index: number) => (
                    <span key={index} className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                      {year}
                    </span>
                  ))}
                  <span className="text-xs text-gray-500">
                    Total: {acumuladoData.copas_pr.length}
                  </span>
                </>
              ) : (
                <p className="text-gray-500">Ninguna</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 