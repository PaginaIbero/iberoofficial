'use client'
import { trpc } from "@/app/_trpc/client";


export default function Page({ params }: { params: { año: number } }) {
  const año = Number(params.año)
  const { data, isLoading } = trpc.resultados.getByFecha.useQuery(año);
  return (
    <>
      {isLoading ? <p className="text-black">Loading...</p> : data?.map((result) => (
        <div className="text-black" key={result.id}>
          <h1>{result.P1} - {result.P2} - {result.P3} - {result.P4} - {result.P5} - {result.P6}</h1>
          <p>{result.ranking}</p>
        </div>
      ))}
    </>
  )
}