'use client'

import { trpc } from "@/app/_trpc/client";
import { Suspense } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

export default function Page({ params }: {
  params: {
    id: number
  }
}) {
  return (
    <div className="flex flex-col text-black">
      <h1 className='text-4xl font-semibold text-center'>
        {params.id}
      </h1>
      <Suspense fallback={
        <div>
          Loading...
        </div>
      }>
        <ResultadosData id={Number(params.id)}/>
      </Suspense>
    </div>
  )
}

export function ResultadosData({ id }: {
  id: number
}) {
  const [data, dataQuery] = trpc.cronologia.getByID.useSuspenseQuery(id)
  const data01 = [
    { name: 'Oro', value: 5 },
    { name: 'Plata', value: 11 },
    { name: 'Bronce', value: 23 },
    { name: 'Mención', value: 40 },
    { name: 'Nada', value: 37 }
  ];
  const COLORS = ['#FF8042', '#0088FE', '#FFBB28', '#00C49F'];
  return (
    <>
      <div className='flex '>
        <div className='w-1/2'>
          <h3 className='text-xl text-center font-semibold'>
            Información general
          </h3>
          <ul className='list-disc pl-6'>
            <li>
              <span className='font-semibold'>
                {data?.ciudad}
              </span>, {data?.pais}, {data?.fecha}</li>
            <li>Países participantes: {data?.paises}</li>
            <li>Concursantes: {data?.participantes}</li>
          </ul>
        </div>
        <div className='w-1/2'>
          <h3 className='text-xl text-center font-semibold'>
            Premios
          </h3>
          <ResponsiveContainer width="50%" height={250}>
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data01}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data01.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}