import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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

export function DistribucionPuntajes({ puntajes, cortes }: {
  puntajes: number[][],
  cortes: {
    b: number,
    s: number,
    g: number
  }
}) {
  var chartData = [...Array(43)].map((_, index) => ({
    name: index,
    no: 0, hm: 0, b: 0, s: 0, g: 0
  }))
  for (let p of puntajes) {
    const suma = p.reduce((a, b) => a + b, 0)
    if (suma < cortes.b && !p.includes(7))
      chartData[suma].no += 1
    else if (suma < cortes.b && p.includes(7))
      chartData[suma].hm += 1
    else if (suma < cortes.s)
      chartData[suma].b += 1
    else if (suma < cortes.g)
      chartData[suma].s += 1
    else chartData[suma].g += 1
  }
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        width={20}
        height={300}
        data={chartData}
      >
        <XAxis
          dataKey='name'
          type='number'
          domain={[0, 42]}
          ticks={[7, cortes.b, cortes.s, cortes.g, 42]}
        />
        <YAxis type='number' />
        <Bar dataKey="hm" stackId="a" fill="#ff00b7" barSize={10} />
        <Bar dataKey="no" stackId="a" fill="#009dff" barSize={10} />
        <Bar dataKey="b" stackId="a" fill="#c74900" barSize={10} />
        <Bar dataKey="s" stackId="a" fill="#c0c0c0" barSize={10} />
        <Bar dataKey="g" stackId="a" fill="#ffd000" barSize={10} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function DistribucionProblemas({ puntajes }: {
  puntajes: number[][]
}) {
  return (
    <div className='flex justify-between'>
      {[...Array(6)].map((_, probno) => {
        const chartData = [...Array(8)].map((_, index) => ({
          name: index,
          c: 0
        }))
        for (let p of puntajes) {
          chartData[p[probno]].c += 1
        }
        return (
          <div key={probno} className='flex flex-col w-full'>
            <h1 className='text-lg text-center'>
              Problema {probno+1}
            </h1>
            { /*Por algún motivo los gráficos no se ven centrados*/ }
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey='name' type='number' domain={[0, 7]} ticks={[0, 1, 2, 3, 4, 5, 6, 7]} />
                <YAxis type='number' domain={[0, puntajes.length]} />
                <Bar dataKey="c" fill="#009dff" barSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
      })}
    </div>
  )
}