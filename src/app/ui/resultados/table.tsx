'use client';

import { trpc } from "@/app/_trpc/client";
import { cronologia, resultado } from "@/lib/types";
import { useRouter } from "next/navigation";
import { TableBodySkeleton } from "../skeletons";

// Resultados individuales única vez

export function IndividualesTable({ id }: {
  id: number
}) {
  const { data, isLoading } = trpc.resultados.getByFecha.useQuery(Number(id))
  return (
    <table className='text-center text-black table-fixed'>
      <thead className='font-semibold'>
        <tr className='bg-blue-200'>
          <th className='w-[5%] p-1'>#</th>
          <th className='w-[50%] p-1'>Concursante</th>
          <th className='w-[20%] p-1'>País</th>
          <th className='w-[3%] p-1'>P1</th>
          <th className='w-[3%] p-1'>P2</th>
          <th className='w-[3%] p-1'>P3</th>
          <th className='w-[3%] p-1'>P4</th>
          <th className='w-[3%] p-1'>P5</th>
          <th className='w-[3%] p-1'>P6</th>
          <th className='w-[10%] p-1'>Total</th>
          <th className='w-[10%] p-1'>Premio</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? <TableBodySkeleton/> : <IndividualesTableBody content={data}/>}
      </tbody>
    </table>
  );
}

function IndividualesTableBody({ content }: {
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
          <td className='py-3'>{item.ranking}</td>
          <td className='py-3'>{item.nombreCompleto}</td>
          <td className='py-3'>{item.pais}</td>
          <td className='py-3'>{item.P1}</td>
          <td className='py-3'>{item.P2}</td>
          <td className='py-3'>{item.P3}</td>
          <td className='py-3'>{item.P4}</td>
          <td className='py-3'>{item.P5}</td>
          <td className='py-3'>{item.P6}</td>
          <td className='py-3'>{item.P1 + item.P2 + item.P3 + item.P4 + item.P5 + item.P6}</td>
          <td className='py-3'>{item.medalla}</td>
        </tr>
      ))}
    </>
  )
}

// Resultados por país única vez

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
        {isLoading ? <TableBodySkeleton/> : <div>To be implemented</div>}
      </tbody>
    </table>
  );
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
          <td className='py-3 border-l-2 border-white'>0</td>
          <td className='py-3'>0</td>
          <td className='py-3'>0</td>
          <td className='py-3'>0</td>
          <td className='py-3'>0</td>
          <td className='py-3'>0</td>
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