'use client';

import { trpc } from "@/app/_trpc/client";
import { resultado } from "@/lib/types";
import { useRouter } from "next/navigation";
import { TableBodySkeleton } from "../skeletons";

export function IndividualesTable({ id }: {
  id: number
}) {
  const { data, isLoading } = trpc.resultados.getByFecha.useQuery(Number(id))
  return (
    <table className='text-center text-black table-fixed'>
      <thead className='font-semibold'>
        <tr className='bg-blue-200'>
          <th className='w-1/3 p-1'>Concursante</th>
          <th className='w-1/3 p-1'>País</th>
          <th className='p-1'>P1</th>
          <th className='p-1'>P2</th>
          <th className='p-1'>P3</th>
          <th className='p-1'>P4</th>
          <th className='p-1'>P5</th>
          <th className='p-1'>P6</th>
          <th className='w-1/12 p-1'>Total</th>
          <th className='w-1/12 p-1'>Puesto</th>
          <th className='w-1/12 p-1'>Premio</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? <TableBodySkeleton/> : <TableBody content={data}/>}
      </tbody>
    </table>
  );
}

export function PorPaisTable({ id }: {
  id: number
}) {
  const { data, isLoading } = trpc.resultados.getByFecha.useQuery(Number(id))
  return (
    <table className='text-center text-black table-fixed'>
      <thead className='font-semibold'>
        <tr className='bg-blue-200'>
          <th className='p-1'></th>
          <th className='p-1' colSpan={3}>Equipo</th>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th className='p-1' colSpan={4}>Premios</th>
          <th className='p-1'></th>
          <th className='p-1'></th>
        </tr>
        <tr className='bg-blue-200'>
          <th className='w-1/2 p-1'>País</th>
          <th className='p-1'>Todos</th>
          <th className='p-1'>H</th>
          <th className='p-1'>M</th>
          <th className='p-1'>P1</th>
          <th className='p-1'>P2</th>
          <th className='p-1'>P3</th>
          <th className='p-1'>P4</th>
          <th className='p-1'>P5</th>
          <th className='p-1'>P6</th>
          <th className='p-1'>Total</th>
          <th className='p-1'>Puesto</th>
          <th className='p-1'>O</th>
          <th className='p-1'>P</th>
          <th className='p-1'>B</th>
          <th className='p-1'>MH</th>
          <th className='p-1'>Jefe</th>
          <th className='p-1'>Tutor</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? <TableBodySkeleton/> : <TableBody content={data}/>}
      </tbody>
    </table>
  );
}

export function TableBody({ content }: {
  content: resultado[] | undefined
}) {
  const router = useRouter();
  return (
    <>
      {content?.map((item: resultado, index: number) => (
        <tr
          key={item.id}
          className={`${index % 2 === 0 ? 'bg-blue-0 hover:bg-blue-100' : 'bg-blue-50 hover:bg-blue-100'} transition-colors cursor-pointer`}
          onClick={() => {}}
        >
          <td className='py-3'>{item.nombreCompleto}</td>
          <td className='py-3'>{item.pais}</td>
          <td className='py-3'>{item.P1}</td>
          <td className='py-3'>{item.P2}</td>
          <td className='py-3'>{item.P3}</td>
          <td className='py-3'>{item.P4}</td>
          <td className='py-3'>{item.P5}</td>
          <td className='py-3'>{item.P6}</td>
          <td className='py-3'>{item.P1 + item.P2 + item.P3 + item.P4 + item.P5 + item.P6}</td>
          <td className='py-3'>{item.ranking}</td>
          <td className='py-3'>{item.medalla}</td>
        </tr>
      ))}
    </>
  )
}