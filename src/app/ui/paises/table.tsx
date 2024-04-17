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
  return (
    <Table
      headers={['Código', 'Concursante', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'Total', 'Ranking', 'Premio']}
      data={
        dataResultados ? (new Array).concat(...dataResultados.map((res) =>
          res.equipo.map((item) => [
            item.pais + item.num,
            item.nombreCompleto,
            item.prob1.toString(),
            item.prob2.toString(),
            item.prob3.toString(),
            item.prob4.toString(),
            item.prob5.toString(),
            item.prob6.toString(),
            item.total.toString(),
            item.ranking.toString(),
            formatPremio(item.premio),
          ])
        )) : []
      }
      isLoading={isLoadingResultados}
    />
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

