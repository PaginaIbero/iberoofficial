'use client'
import { trpc } from "@/app/_trpc/client"

export default function Page() {
  // const { data } = trpc.resultados.excelToBD.useQuery(2023)
  // console.log(data)
  return (
    <main className="flex min-h-screen flex-col text-black">
      <h1 className='text-4xl font-semibold text-center'>Historia</h1>
    </main>
  )
}