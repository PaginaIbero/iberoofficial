'use client';

import { trpc } from "@/app/_trpc/client";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Page({ params }: {
  params: {
    id: string
  }
}) {
  const COLORS = ['#ffd000', '#c0c0c0', '#c74900', '#ff00dd', '#009dff']
  const { data, isLoading } = trpc.cronologia.getByID.useQuery(2023)
  const { data: ProblemasPuntaje , isLoading: ProblemasPuntajeLoad} = trpc.resultados.getProblemByFecha.useQuery(2022)
  // Esta query tarda como 10 segundos en cargar
  console.log(ProblemasPuntaje)
  const dataCortes = [{ 
    nada: 5,
    bronce: 10,
    plata: 15,
    oro: 20
  }]
  const dataPremios = [
    { name: 'Oro', value: 20 },
    { name: 'Plata', value: 15 },
    { name: 'Bronce', value: 10 },
    { name: 'Mención', value: 5 },
    { name: 'Nada', value: 5 }
  ]
  return (
    <>
      <h3 className='text-xl font-semibold mt-2 text-black'>
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
            Array.from({ length: 43 }, (_, i) => i * props.width / 42)
          )} />
          <XAxis hide type='number' domain={[0, 42]} />
          <YAxis hide type='category' />
          <Bar dataKey="nada" stackId="a" fill="#009dff" barSize={20} />
          <Bar dataKey="bronce" stackId="a" fill="#c74900" barSize={20} />
          <Bar dataKey="plata" stackId="a" fill="#c0c0c0" barSize={20} />
          <Bar dataKey="oro" stackId="a" fill="#ffd000" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
      <h3 className='text-xl font-semibold mt-2 text-black'>
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