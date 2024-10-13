'use client';

import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import { formatPremio } from "@/lib/formatStrings";
import { cronologia, resultado } from "@/lib/types";
import { TableBodySkeleton } from "@/app/ui/skeletons";
import Table from "@/app/ui/table";

export function IndividualesTable({ id }: {
  id: number
}) {
  const { data, isLoading } = trpc.resultados.getByFecha.useQuery(Number(id))
  return (
    <Table
      headers={['#', 'Código', 'Concursante', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'Total', 'Premio']}
      data={data ? data.map((item: resultado) => [
        item.ranking.toString(),
        item.pais + item.num,
        item.nombreCompleto,
        item.prob1.toString(),
        item.prob2.toString(),
        item.prob3.toString(),
        item.prob4.toString(),
        item.prob5.toString(),
        item.prob6.toString(),
        item.total.toString(),
        formatPremio(item.premio)
      ]) : []}
      isLoading={isLoading}
    />
  )
}