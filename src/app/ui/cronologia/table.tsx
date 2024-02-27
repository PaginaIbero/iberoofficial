'use client';

import { cronologia } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function Table({ data }: {
  data: cronologia[]
}) {
  const router = useRouter();
  return (
    <table className='text-center'>
      <thead className='font-semibold'>
        <tr className='bg-blue-200'>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th className='p-1'></th>
          <th colSpan={3} className='p-1 border-x-2 border-white'>Concursantes</th>
          <th colSpan={3} className='p-1 border-x-2 border-white'>Cortes</th>
          <th colSpan={4} className='p-1 border-l-2 border-white'>Premios</th>
        </tr>
        <tr className='bg-blue-200'>
          <th className='p-1'>Año</th>
          <th className='p-1'>Ciudad</th>
          <th className='p-1'>País</th>
          <th className='p-1'>Fecha</th>
          <th className='p-1'>Países</th>
          <th className='p-1 border-l-2 border-white'>T</th>
          <th className='p-1'>H</th>
          <th className='p-1 border-r-2 border-white'>M</th>
          <th className='p-1 border-l-2 border-white'>O</th>
          <th className='p-1'>P</th>
          <th className='p-1 border-r-2 border-white'>B</th>
          <th className='p-1 border-l-2 border-white'>O</th>
          <th className='p-1'>P</th>
          <th className='p-1'>B</th>
          <th className='p-1'>MH</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: cronologia, index: number) => {
          return (
            <tr
      key={item.id}
      className={`${index % 2 === 0 ? 'bg-blue-0 hover:bg-blue-100' : 'bg-blue-50 hover:bg-blue-100'} transition-colors cursor-pointer`}
      onClick={() => {router.push(`/cronologia/${item.id}`)}}
    >
      <td className='py-3'>{item.id}</td>
      <td className='py-3'>{item.ciudad}</td>
      <td className='py-3'>{item.pais}</td>
      <td className='py-3'>{item.fecha}</td>
      <td className='py-3'>{item.paises}</td>
      <td className='py-3 border-l-2 border-white'>{item.participantes}</td>
      <td className='py-3'>{item.hombres}</td>
      <td className='py-3'>{item.mujeres}</td>
      <td className='py-3 border-l-2 border-white'>{item.cortes[0]}</td>
      <td className='py-3'>{item.cortes[1]}</td>
      <td className='py-3'>{item.cortes[2]}</td>
      <td className='py-3 border-l-2 border-white'>{item.premios[0]}</td>
      <td className='py-3'>{item.premios[1]}</td>
      <td className='py-3'>{item.premios[2]}</td>
      <td className='py-3'>{item.premios[3]}</td>
    </tr>
          )
        })}
      </tbody>
    </table>
  );
}