import { trpc } from "@/app/_trpc/client"
import Table from "../components/Table"

export function PorPaisTable({ id }: {
  id: number
}) {
  const { data, isLoading } = trpc.participaciones.getByFecha.useQuery(Number(id))
  return (
    <Table
      headers={['#', 'País', 'T', 'H', 'M', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'Total', 'O', 'P', 'B', 'MH', 'Jefe', 'Tutor']}
      data={data ? data.map((item) => [
        item.ranking.toString(),
        item.pais.nombre,
        item.equipo.length.toString(),
        '0',
        '0',
        item.prob1.toString(),
        item.prob2.toString(),
        item.prob3.toString(),
        item.prob4.toString(),
        item.prob5.toString(),
        item.prob6.toString(),
        item.total.toString(),
        item.premios[0].toString(),
        item.premios[1].toString(),
        item.premios[2].toString(),
        item.premios[3].toString(),
        item.nombreLider,
        item.nombreTutor
      ]) : []}
      href={data?.map((item) => `/paises/${item.pais.id}?section=equipo`) || []}
      isLoading={isLoading}
    />
  )
}