import { trpc } from "@/app/_trpc/client";
import useScreenSize from "@/hooks/useScreenSize";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const COLORS = ['#ffd000', '#c0c0c0', '#c74900', '#ff00dd', '#009dff']

export function CortesBarChart({ dataCortes }: {
  dataCortes: number[]
}) {
  return (
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
  )
}

export function PremiosPieChart({ dataPremios }: {
  dataPremios: number[]
}) {
  return (
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
  )
}

export function DistribucionPuntajes({ id }: {
  id: number
}) {
  const screenSize = useScreenSize()
  const [cortes, ] = trpc.cronologia.getCortesByID.useSuspenseQuery(id)
  const [chartData, _] = trpc.resultados.getDistribucionPuntajesByFecha.useSuspenseQuery(id)

  const puntajeMaximo = id < 2000 ? 60 : 42

  return (
    <ResponsiveContainer width='100%' height={250}>
      <BarChart
        width={20}
        height={300}
        data={chartData}
        margin={{right: 15, left: 30}}
        barCategoryGap={screenSize.width < 640 ? 0 : 1}
      >
        <Legend/>
        <XAxis
          dataKey='name'
          type='number'
          domain={[-0.5, puntajeMaximo]}
          interval={0}
          ticks={Array.from({ length: puntajeMaximo + 1 }, (_, i) => i)}
          tickFormatter={(value) => {
            if ([0, puntajeMaximo].includes(value) || cortes.includes(value))
              return String(value)
            else
              return ''
          }}
        />
        <YAxis 
          type='number'
          width={20}
        />
        <Bar dataKey="hm" name='Mención honorífica' stackId="a" fill="#ff00b7"/>
        <Bar dataKey="no" name='Nada' stackId="a" fill="#009dff"/>
        <Bar dataKey="b" name='Bronce' stackId="a" fill="#c74900"/>
        <Bar dataKey="s" name='Plata' stackId="a" fill="#c0c0c0"/>
        <Bar dataKey="g" name='Oro' stackId="a" fill="#ffd000"/>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function DistribucionProblemas({ id }: {
  id: number
}) {
  const screenSize = useScreenSize()
  const [data, ] = trpc.cronologia.getGeneralInfoByID.useSuspenseQuery(id)
  const [chartData, ] = trpc.resultados.getProblemStatsByFecha.useSuspenseQuery(id)

  const puntajeMaximo = id < 2000 ? 10 : 7

  return (
    <div className='grid 2xl:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-5 text-center items-center'>
      {[...Array(6)].map((_, probno) => {
        return (
          <div key={probno} className='flex flex-col w-full text-black content-center'>
            <h1 className='text-lg lg:text-center pb-2'>
              Problema {probno+1}
            </h1>
            { /*Por algún motivo los gráficos no se ven centrados*/ }
            <ResponsiveContainer width={'99%'} height={250}>
              <BarChart 
                data={chartData[probno]} 
                margin={{right: 35, left: 40}}
                barCategoryGap={screenSize.width < 640 ? 0 : 1}
              >
                <XAxis 
                  dataKey='name' 
                  type='number' 
                  domain={[-0.5, puntajeMaximo]} 
                  interval={0}
                  ticks={Array(puntajeMaximo + 1).fill(0).map((_, i) => i)}
                />
                <YAxis
                  type='number'
                  width={30}
                  domain={[0, data?.concursantes || 0]}
                />
                <Bar dataKey="c" fill="#009dff"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
      })}
    </div>
  )
}
