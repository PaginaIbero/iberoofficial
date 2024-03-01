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
    <div className="flex flex-col text-black">
      <h1 className='text-4xl font-semibold text-center'>
        {params.id}
      </h1>
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
          <ResponsiveContainer width="100%" height={40}>
            <BarChart
              width={20}
              height={300}
              data={dataCortes}
              layout='vertical'
            >
              <CartesianGrid horizontalPoints={[]} verticalCoordinatesGenerator={(props) => (
                [...Array(43).keys()].map((i) => i * props.width / 42 )
              )} />
              <XAxis hide type='number' domain={[0, 42]}/>
              <YAxis hide type='category'/>
              <Bar dataKey="nada" stackId="a" fill="#009dff" barSize={20} />
              <Bar dataKey="bronce" stackId="a" fill="#c74900" barSize={20} />
              <Bar dataKey="plata" stackId="a" fill="#c0c0c0" barSize={20} />
              <Bar dataKey="oro" stackId="a" fill="#ffd000" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
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
        </div>
      </div>
    </>
  )
}