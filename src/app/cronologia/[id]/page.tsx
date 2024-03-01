'use client'

import { trpc } from "@/app/_trpc/client";
import { Suspense } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';

export default function Page({ params }: {
  params: {
    id: number
  }
}) {
  return (
    <div className="flex flex-col">
      <Suspense fallback={
        <div>
          Loading...
        </div>
      }>
        <ResultadosData id={Number(params.id)} />
      </Suspense>
    </div>
  )
}

export function ResultadosData({ id }: {
  id: number
}) {
  const [data, dataQuery] = trpc.cronologia.getByID.useSuspenseQuery(id)
  const dataCortes = [{
    nada: data?.cortes[2],
    bronce: (data?.cortes[1] || 0) - (data?.cortes[2] || 0),
    plata: (data?.cortes[0] || 0) - (data?.cortes[1] || 0),
    oro: 42 - (data?.cortes[0] || 0)
  }]
  const dataPremios = [
    { name: 'Oro', value: data?.premios[0] },
    { name: 'Plata', value: data?.premios[1] },
    { name: 'Bronce', value: data?.premios[2] },
    { name: 'Mención', value: data?.premios[3] },
    { name: 'Nada', value: (data?.participantes || 0) - (data?.premios.reduce((a, b) => a + b, 0) || 0) }
  ];
  const COLORS = ['#ffd000', '#c0c0c0', '#c74900', '#ff009d', '#009dff'];
  return (
    <>
      <h1 className='text-4xl text-center'>
        <span className='font-semibold'>{data?.ciudad}</span>, {data?.pais}
      </h1>
      <h2 className='text-4xl text-center'>
        {data?.id}
      </h2>
      <div className='flex w-full gap-3 my-2'>
        <div className='bg-blue-200 text-black font-semibold rounded-full py-1 px-3'>
          Estadísticas
        </div>
        <div className='bg-blue-50 hover:bg-blue-100 text-black font-semibold rounded-full py-1 px-3'>
          Por concursante
        </div>
        <div className='bg-blue-50 hover:bg-blue-100 text-black font-semibold rounded-full py-1 px-3'>
          Por país
        </div>
      </div>
      <h3 className='text-xl font-semibold mt-2'>
        Información general
      </h3>
      <ul className='list-disc pl-6'>
        <li>Sede: {data?.ciudad}, {data?.pais} ({data?.fecha})</li>
        <li>Países participantes: {data?.paises}</li>
        <li>Concursantes: {data?.participantes}</li>
      </ul>
      <h3 className='text-xl font-semibold mt-2'>
        Cortes
      </h3>
      <ResponsiveContainer width="100%" height={40}>
        <BarChart
          width={20}
          height={300}
          data={dataCortes}
          layout='vertical'
        >
          <CartesianGrid horizontalPoints={[]} verticalCoordinatesGenerator={(props) => (
            [...Array(43).keys()].map((i) => i * props.width / 42)
          )} />
          <XAxis hide type='number' domain={[0, 42]} />
          <YAxis hide type='category' />
          <Bar dataKey="nada" stackId="a" fill="#009dff" barSize={20} />
          <Bar dataKey="bronce" stackId="a" fill="#c74900" barSize={20} />
          <Bar dataKey="plata" stackId="a" fill="#c0c0c0" barSize={20} />
          <Bar dataKey="oro" stackId="a" fill="#ffd000" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
      <h3 className='text-xl font-semibold mt-2'>
        Distribución de premios
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart width={600} height={600}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={dataPremios}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {dataPremios.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}