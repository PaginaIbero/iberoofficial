'use client';

import { useRouter } from "next/navigation";
import { trpc } from "../_trpc/client";
import Table from "../ui/table";

export default function Page() {
  // trpc.cargaDatos.cargaPaises.useQuery()
  const router = useRouter();
  const { data, isLoading } = trpc.paises.getAll.useQuery();
  return (
    <div className="flex flex-col text-black">
      <h1 className='text-4xl font-semibold text-center'>
        Países
      </h1>
      <p className='text-center mb-5'>
        Lista de países participantes de la Olimpiada Iberoamericana de Matemática
      </p>
      <div className='hidden md:block'>
        <br/>
        <Table 
          headers={["Código", "País", "Contacto", "Sitio OM nacional", "Anfitrión", "Primera participación"]}
          data={data?.map((pais) => [
            pais.id,
            pais.nombre,
            pais.contacto,
            pais.sitio,
            pais.anfitrion.join(', ') || 'N/A',
            pais.primera?.toString() || 'N/A',
          ]) || []}
          href={data?.map((pais) => `/paises/${pais.id}?section=estadisticas`) || []}
          isLoading={isLoading}
        />
      </div>
      <div className='block md:hidden'>
        {isLoading ? 'Cargando...' : data?.map((pais, i) => (
          <>
            <div 
              key={pais.id} 
              className='p-2 rounded-md hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer hover:text-blue-800'
              onClick={() => router.push(`/paises/${pais.id}?section=estadisticas`)}
            >
              <div className='flex justify-between'>
                <p className='font-semibold'>{pais.nombre}</p>
                <p className='text-gray-400'>{pais.id}</p>
              </div>
              <p>{pais.contacto}</p>
              <p>{pais.sitio}</p>
              <p>1ra part.: {pais.primera || 'N/A'}</p>
              <p>Anfitrión {pais.anfitrion.join(', ') || 'N/A'}</p>
            </div>
            {i < data.length - 1 && <hr className='my-2'/>}
          </>
        ))}
      </div>
    </div>
    )
}