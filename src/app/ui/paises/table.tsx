import { trpc } from "@/app/_trpc/client";
import { formatPremio } from "@/lib/formatStrings";
import Table from "../table";

export function PaisIndividualesTable({ id }: {
  id: string
}) {
  const {
    data: dataResultados,
    isLoading: isLoadingResultados
  } = trpc.participaciones.getByPais.useQuery(id)
  let counter = 0
  return (
    <table className='text-center text-black table-auto w-full'>
      <thead>
        <tr className='bg-blue-200'>
          <th className='py-3'>Código</th>
          <th>Concursante</th>
          <th>P1</th>
          <th>P2</th>
          <th>P3</th>
          <th>P4</th>
          <th>P5</th>
          <th>P6</th>
          <th>Total</th>
          <th>Ranking</th>
          <th>Premio</th>
        </tr>
      </thead>
      <tbody>
        {dataResultados ? dataResultados.map((part) => {
            return (
              <>
                <tr
                  key={part.fecha}
                  className={'bg-blue-200'}
                >
                  <td colSpan={11} className='py-1'>
                    <span className='font-semibold'>{part.fecha}</span> 
                  </td>
                </tr>
                {part.equipo.map((item, index) => (
                  <tr
                    key={part.id}
                    className={(index % 2 === 0 ? 'bg-blue-0' : 'bg-blue-50') + 
                      ' hover:bg-blue-100 transition-colors'}
                  >
                    <td className='py-3'>{item.pais + item.num}</td>
                    <td>{item.nombreCompleto}</td>
                    <td>{item.prob1}</td>
                    <td>{item.prob2}</td>
                    <td>{item.prob3}</td>
                    <td>{item.prob4}</td>
                    <td>{item.prob5}</td>
                    <td>{item.prob6}</td>
                    <td>{item.total}</td>
                    <td>{item.ranking}</td>
                    <td>{formatPremio(item.premio)}</td>
                  </tr>
                ))}
              </>
            )
          }) : []
        }
      </tbody>
    </table>
  )
}

export function PaisPorEquipoTable({ id }: {
  id: string
}) {
  const {
    data: dataResultados,
    isLoading: isLoadingResultados
  } = trpc.participaciones.getByPais.useQuery(id)
  return (
    <Table
      headers={['Año', 'T', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'Total', 'Ranking', 'Premios', 'Líder', 'Tutor']}
      data={
        dataResultados ? dataResultados.map((item) => [
          item.fecha.toString(),
          item.equipo.length.toString(),
          item.prob1.toString(),
          item.prob2.toString(),
          item.prob3.toString(),
          item.prob4.toString(),
          item.prob5.toString(),
          item.prob6.toString(),
          item.total.toString(),
          item.ranking.toString(),
          item.premios[0] + " 🥇 | " + item.premios[1] + " 🥈 | " + item.premios[2] + " 🥉 | " + item.premios[3] + " MH",
          item.nombreLider,
          item.nombreTutor
        ]) : []
      }
      href={dataResultados ? dataResultados.map((item) => `/resultados/${item.fecha}`) : []}
      isLoading={isLoadingResultados}
    />
  )
}

