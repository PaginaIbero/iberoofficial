'use client';

import { trpc } from "../_trpc/client";
import Table from "../ui/table";

export default function Page() {
  // trpc.cargaDatos.cargaPaises.useQuery()
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
            'tbd',
            'tbd',
          ]) || []}
          href={data?.map((pais) => `/paises/${pais.id}?section=estadisticas`) || []}
          isLoading={isLoading}
        />
      </div>
      <div className='block md:hidden'>
        {isLoading ? 'Cargando...' : data?.map((pais) => (
          <div key={pais.id} className='flex flex-col gap-1 p-2 border-b'>
            <div className='flex justify-between'>
              <p className='font-semibold'>{pais.nombre}</p>
              <p className='text-gray-400'>{pais.id}</p>
            </div>
            <p>{pais.contacto}</p>
            <p>{pais.sitio}</p>
            <p>to compute</p>
            <p>to compute</p>
          </div>
        ))}
      </div>
    </div>
    )
}