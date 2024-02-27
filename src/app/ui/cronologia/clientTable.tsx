"use client";

import { cronologia } from "@/lib/types";
import { redirect, useRouter } from "next/navigation";

export function ClientTable({ item, index }: {
  item: cronologia,
  index: number
}) {
  const router = useRouter();
  return (
    <tr
      key={item.id}
      className={`${index % 2 === 0 ? 'bg-blue-0 hover:bg-blue-100' : 'bg-blue-50 hover:bg-blue-100'} cursor-pointer`}
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
}