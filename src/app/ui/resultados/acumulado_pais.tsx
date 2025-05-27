import { trpc } from "@/app/_trpc/client"
import Table from "@/app/ui/components/Table"

export function AcumuladoPaisTable() {
  const { data, isLoading } = trpc.participaciones.getAcumuladoPais.useQuery()
  return (
    <Table 
      headers={['País', 'Part.', '1ra part.', '# concurs.', 'O', 'P', 'B', 'MH', 'Copas PR']}
      data={data?.map((item) => [
        item.pais,
        item.participaciones.toString(),
        item.primera.toString(),
        item.concursantes.toString(),
        item.premios[0].toString(),
        item.premios[1].toString(),
        item.premios[2].toString(),
        item.premios[3].toString(),
        item.copas_pr.toString()
      ]) || [[]]}
      href={data?.map((item) => `/paises/${item.codigo}?section=equipo`) || []}
      isLoading={isLoading}
    />
  )
}