'use client'
import { trpc } from "@/app/_trpc/client";


export default function Page({ params }: { params: { año: number } }) {
  const año = Number(params.año)
  const { data, isLoading } = trpc.resultados.getByFecha.useQuery(año);
  return (
    <>
      {isLoading ? <p className="text-black">Loading...</p> : data?.map((result) => (
        <div className="text-black" key={result.id}>
          <h1>{result.puntaje[0]} - {result.puntaje[1]} - {result.puntaje[2]} - {result.puntaje[3]} - {result.puntaje[4]} - {result.puntaje[5]}</h1>
          <p>{result.ranking}</p>
        </div>
      ))}
    </>
  )
}