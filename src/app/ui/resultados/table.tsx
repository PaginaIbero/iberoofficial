'use client';

import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import { cronologia, resultado } from "@/lib/types";
import { TableBodySkeleton } from "@/app/ui/skeletons";
import Table from "@/app/ui/table";

export function IndividualesTable({ id }: {
  id: number
}) {
  const { data, isLoading } = trpc.resultados.getByFecha.useQuery(Number(id))
  return (
    <Table
      headers={['#', 'Concursante', 'País', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'Total', 'Premio']}
      data={data ? data.map((item: resultado) => [
        item.ranking.toString(),
        item.nombreCompleto,
        item.pais,
        item.P1.toString(),
        item.P2.toString(),
        item.P3.toString(),
        item.P4.toString(),
        item.P5.toString(),
        item.P6.toString(),
        (item.P1 + item.P2 + item.P3 + item.P4 + item.P5 + item.P6).toString(),
        item.medalla
      ]) : []}
      isLoading={isLoading}
    />
  )
}

export function PorPaisTable({ id }: {
  id: number
}) {
  const { data, isLoading } = trpc.resultados.getByFecha.useQuery(Number(id))
  return (
    <Table
      headers={['#', 'País', 'T', 'H', 'M', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'Total', 'O', 'P', 'B', 'MH', 'Jefe', 'Tutor']}
      data={data ? data.map((item: resultado) => []) : []}
      isLoading={isLoading}
    />
  )
}

// Resultados acumulados por fecha

export function AcumuladoAnoTable() {
  const { data, isLoading } = trpc.cronologia.getAll.useQuery()
  return (
    <table className='text-center text-black table-fixed'>
      <thead className='font-semibold'>
        <tr className='bg-blue-200'>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th colSpan={3} className='p-1 border-x-2 border-white'>Concursantes</th>
          <th colSpan={3} className='p-1 border-x-2 border-white hidden lg:table-cell'>Cortes</th>
          <th colSpan={4} className='p-1 border-l-2 border-white hidden lg:table-cell'>Premios</th>
          <th colSpan={6} className='p-1 border-l-2 border-white hidden lg:table-cell'>Eficiencia</th>
        </tr>
        <tr className='bg-blue-200'>
          <th className='w-[10%] p-1'>Año</th>
          <th className='w-[10%] p-1'>País</th>
          <th className='w-[10%] p-1'>Países</th>
          <th className='w-[5%] p-1 border-l-2 border-white'>T</th>
          <th className='w-[5%] p-1'>H</th>
          <th className='w-[5%] p-1 border-r-2 border-white'>M</th>
          <th className='w-[3%] p-1 border-l-2 border-white hidden lg:table-cell'>O</th>
          <th className='w-[3%] p-1 hidden lg:table-cell'>P</th>
          <th className='w-[3%] p-1 border-r-2 border-white hidden lg:table-cell'>B</th>
          <th className='w-[3%] p-1 border-l-2 border-white hidden lg:table-cell'>O</th>
          <th className='w-[3%] p-1 hidden lg:table-cell'>P</th>
          <th className='w-[3%] p-1 hidden lg:table-cell'>B</th>
          <th className='w-[3%] p-1 border-r-2 border-white hidden lg:table-cell'>MH</th>
          <th className='w-[3%] p-1 border-l-2 border-white hidden lg:table-cell'>P1</th>
          <th className='w-[3%] p-1 hidden lg:table-cell'>P2</th>
          <th className='w-[3%] p-1 hidden lg:table-cell'>P3</th>
          <th className='w-[3%] p-1 hidden lg:table-cell'>P4</th>
          <th className='w-[3%] p-1 hidden lg:table-cell'>P5</th>
          <th className='w-[3%] p-1 hidden lg:table-cell'>P6</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? <TableBodySkeleton/> : <AcumuladoAnoTableBody content={data || []}/>}
      </tbody>
    </table>
  );
}

function AcumuladoAnoTableBody({ content }: {
  content: cronologia[]
}) {
  const router = useRouter();
  return (
    <>
      {content?.map((item: cronologia, index: number) => (
        <tr
          key={item.id}
          className={`${index % 2 === 0 ? 'bg-blue-0 hover:bg-blue-100' : 'bg-blue-50 hover:bg-blue-100'} transition-colors cursor-pointer`}
          onClick={() => { 
            router.push(`/resultados/${item.id}?section=estadisticas`) 
          }}
        >
          <td className='py-3'>{item.id}</td>
          <td className='py-3'>{item.pais}</td>
          <td className='py-3'>{item.paises}</td>
          <td className='py-3 border-l-2 border-white'>{item.participantes}</td>
          <td className='py-3'>{item.hombres}</td>
          <td className='py-3'>{item.mujeres}</td>
          <td className='py-3 border-l-2 border-white hidden lg:table-cell'>{item.cortes ? item.cortes[0] : 'n/a'}</td>
          <td className='py-3 hidden lg:table-cell'>{item.cortes ? item.cortes[1] : 'n/a'}</td>
          <td className='py-3 hidden lg:table-cell'>{item.cortes ? item.cortes[2] : 'n/a'}</td>
          <td className='py-3 border-l-2 border-white hidden lg:table-cell'>{item.premios ? item.premios[0] : 'n/a'}</td>
          <td className='py-3 hidden lg:table-cell'>{item.premios ? item.premios[1] : 'n/a'}</td>
          <td className='py-3 hidden lg:table-cell'>{item.premios ? item.premios[2] : 'n/a'}</td>
          <td className='py-3 hidden lg:table-cell'>{item.premios ? item.premios[3] : 'n/a'}</td>
          <td className='py-3 border-l-2 border-white'>0.0</td>
          <td className='py-3'>0.0</td>
          <td className='py-3'>0.0</td>
          <td className='py-3'>0.0</td>
          <td className='py-3'>0.0</td>
          <td className='py-3'>0.0</td>
        </tr>
      ))}
    </>
  )
}

// Resultados acumulados por país

export function AcumuladoPaisTable() {
  return (
    <>
    </>
  )
}